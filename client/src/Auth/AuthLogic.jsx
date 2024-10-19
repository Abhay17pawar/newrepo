import React, { useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react";

export default function AuthPage() {
  const navigate = useNavigate();
  const { signupWithGoogle } = useFirebase();

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    phone: "",
    address: "",
    role: "patient",
    verificationID: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });
      if (!response.ok) throw new Error("Failed to sign up");
      const data = await response.json();
      toast.success(data.msg);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Sign up failed. Please try again.");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await signupWithGoogle();
      if (result) navigate("/Home");
    } catch (err) {
      console.error("Error during Google Sign-in:", err);
      toast.error("Google Sign-in failed. Please try again.");
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // Implement actual login logic here
    navigate("/Home");
  };

  const InputField = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        {...props}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-4 py-5 bg-teal-600 sm:px-6">
          <h2 className="text-lg font-medium leading-6 text-white">
            MedConnect
          </h2>
          <p className="mt-1 text-sm text-teal-100">
            Secure Healthcare Access Portal
          </p>
        </div>
        <Tabs.Root className="w-full" defaultValue="login">
          <Tabs.List className="flex border-b border-gray-200">
            <Tabs.Trigger
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:text-teal-600 focus:border-teal-600 transition-all duration-200"
              value="login"
            >
              Login
            </Tabs.Trigger>
            <Tabs.Trigger
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:text-teal-600 focus:border-teal-600 transition-all duration-200"
              value="signup"
            >
              Sign Up
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="login" className="p-6">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <InputField
                icon={Mail}
                id="login-email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={loginData.email}
                onChange={handleLoginChange}
              />
              <InputField
                icon={Lock}
                id="login-password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
              />
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Sign In
                </button>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Forgot your password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleGoogleSignin}
                  className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                      fill="#34A853"
                    />
                    <path
                      d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                </button>
              </div>
            </motion.form>
          </Tabs.Content>

          <Tabs.Content value="signup" className="p-6">
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSignUp}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Role
                </label>
                <div className="mt-2 space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="patient"
                      checked={signupData.role === "patient"}
                      onChange={handleSignUpChange}
                      className="form-radio h-4 w-4 text-teal-600"
                    />
                    <span className="ml-2">Patient</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value="healthcare-provider"
                      checked={signupData.role === "healthcare-provider"}
                      onChange={handleSignUpChange}
                      className="form-radio h-4 w-4 text-teal-600"
                    />
                    <span className="ml-2">Healthcare Provider</span>
                  </label>
                </div>
              </div>
              <InputField
                icon={User}
                id="username"
                name="username"
                type="text"
                required
                placeholder="Full Name"
                value={signupData.username}
                onChange={handleSignUpChange}
              />
              <InputField
                icon={Mail}
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={signupData.email}
                onChange={handleSignUpChange}
              />
              <InputField
                icon={Lock}
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={signupData.password}
                onChange={handleSignUpChange}
              />
              <InputField
                icon={Calendar}
                id="age"
                name="age"
                type="number"
                required
                placeholder="Age"
                value={signupData.age}
                onChange={handleSignUpChange}
              />
              <InputField
                icon={Phone}
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="Phone Number"
                value={signupData.phone}
                onChange={handleSignUpChange}
              />
              <InputField
                icon={MapPin}
                id="address"
                name="address"
                type="text"
                required
                placeholder="Address"
                value={signupData.address}
                onChange={handleSignUpChange}
              />
              {signupData.role === "healthcare-provider" && (
                <InputField
                  icon={FileText}
                  id="verificationID"
                  name="verificationID"
                  type="text"
                  required
                  placeholder="Professional License Number"
                  value={signupData.verificationID}
                  onChange={handleSignUpChange}
                />
              )}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  Create Account
                </button>
              </div>
            </motion.form>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
