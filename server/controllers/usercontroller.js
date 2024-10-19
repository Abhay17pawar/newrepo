const bcrypt = require('bcryptjs');
const axios = require('axios');
const User = require('../models/User'); // Import User model

// User registration controller
const registerUser = async (req, res) => {
    const {
        username,
        email,
        password,
        age,
        phone,
        address,
        role,
        verificationID,
    } = req.body;

    // Basic validation
    if (!username || !email || !password || !age || !phone || !address || !role) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Create new user
        user = new User({
            username,
            email,
            password,
            age,
            phone,
            address,
            role,
            verificationID: role === "nurse" ? verificationID : undefined,
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to the database
        await user.save();
        res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server error" });
    }
};

// Find nearest nurse function
const findNearestNurse = async (req, res) => {
    const patientAddress = "mumbai"; // Hardcoded patient address for now

    try {
        // Fetch all users with the role of 'nurse'
        const nurses = await User.find({ role: 'nurse' });

        if (nurses.length === 0) {
            return res.status(404).json({ msg: "No nurses found" });
        }

        // Prepare the request for Distance Matrix API
        const origins = encodeURIComponent(patientAddress);
        const destinations = nurses.map(nurse => encodeURIComponent(nurse.address)).join('|');

        const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Use your API key from .env
        const distanceMatrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${apiKey}`;

        // Call the Google Distance Matrix API
        const response = await axios.get(distanceMatrixUrl);
        
        // Log the API response for debugging
        console.log("API Response:", JSON.stringify(response.data, null, 2));

        const { rows, status } = response.data;

        if (status !== 'OK' || !rows || rows.length === 0 || !rows[0].elements) {
            console.error("Invalid response from Distance Matrix API:", response.data);
            return res.status(500).json({ msg: "Invalid response from Distance Matrix API" });
        }

        // Find the nearest nurse based on distance
        let nearestNurse = null;
        let minDistance = Infinity;

        rows[0].elements.forEach((element, index) => {
            if (element.status === 'OK') { // Ensure distance data is valid
                const distance = element.distance.value; // Distance in meters
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestNurse = nurses[index];
                }
            }
        });

        if (nearestNurse) {
            return res.status(200).json(nearestNurse);
        } else {
            return res.status(404).json({ msg: "No nurse found" });
        }
    } catch (error) {
        // Log the exact error for debugging
        console.error("Error occurred:", error); // Log the full error object
        return res.status(500).json({ msg: `Error: ${error.message}` }); // Return the error message in the response
    }
};



// Export the controller functions
module.exports = { registerUser, findNearestNurse };
