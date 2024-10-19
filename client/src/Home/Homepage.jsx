import React, { useState } from 'react';
import { MapPin, Clock, Shield, ArrowRight, Heart, Activity, User, Star, Search, Phone, Calendar, Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Emergency Alert */}
      {showEmergencyAlert && (
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Alert className="border-red-500 bg-red-50 mb-4 mx-4 mt-4">
            <AlertTitle className="text-red-700 flex items-center">
              <Phone className="h-4 w-4 mr-2" /> Emergency Hotline
            </AlertTitle>
            <AlertDescription className="text-red-600">
              For immediate medical emergencies, call 108. Our service is for non-emergency medical assistance.
              <Button variant="link" className="text-red-700 pl-2" onClick={() => setShowEmergencyAlert(false)}>
                Dismiss
              </Button>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Header */}
      <header className="bg-white/95 shadow-lg text-primary-foreground p-4 sticky top-0 z-10 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2 group">
            <Heart className="h-7 w-7 text-primary group-hover:scale-110 transition-transform" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              NurseLocator
            </h1>
          </a>
          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search for services..."
                className="w-64 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="/services" className="flex items-center hover:text-primary transition-colors">
                    <Activity className="h-4 w-4 mr-1" /> Services
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-primary transition-colors">About</a>
                </li>
                <li>
                  <Button variant="outline" className="flex items-center">
                    <Bell className="h-4 w-4 mr-2" /> Sign In
                  </Button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.section className="text-center mb-20" {...fadeInUp}>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Professional Healthcare at Your Doorstep
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with verified nurses in your area within minutes. 
            Get reliable, professional healthcare assistance when you need it most.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/NearNurse')} // Use navigate to redirect
            >
              Find a Nurse Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              <a href="/how-it-works" className="flex items-center">
                Learn More <Activity className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section className="grid md:grid-cols-3 gap-8 mb-20" {...fadeInUp}>
          {[ 
            { 
              icon: MapPin, 
              title: "Smart Location Matching", 
              description: "Advanced GPS tracking to find the nearest available healthcare professional",
              color: "text-blue-500"
            },
            { 
              icon: Clock, 
              title: "24/7 Availability", 
              description: "Round-the-clock access to healthcare professionals for your peace of mind",
              color: "text-green-500"
            },
            { 
              icon: Shield, 
              title: "Verified Professionals", 
              description: "All nurses are licensed, background-checked, and strictly verified",
              color: "text-purple-500"
            }
          ].map((feature, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card className="h-full group hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className={`flex items-center ${feature.color} text-xl`}>
                    <feature.icon className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Badge variant="outline" className={`${feature.color} group-hover:bg-opacity-10`}>
                    Learn more
                  </Badge>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* Steps Section */}
        <motion.section className="bg-white/80 rounded-xl p-10 mb-20 shadow-xl backdrop-blur-sm" {...fadeInUp}>
          <h3 className="text-3xl font-bold mb-8 text-center text-primary">
            Simple Process, Exceptional Care
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[ 
              {
                icon: Search,
                title: "Search",
                description: "Enter your location or enable GPS",
                step: 1
              },
              {
                icon: User,
                title: "Choose",
                description: "Select from available nurses",
                step: 2
              },
              {
                icon: Calendar,
                title: "Schedule",
                description: "Book immediate or future care",
                step: 3
              },
              {
                icon: Heart,
                title: "Receive Care",
                description: "Get professional healthcare",
                step: 4
              }
            ].map((step, index) => (
              <motion.div key={index} className="relative text-center group" whileHover={{ y: -5 }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h4 className="text-lg font-semibold">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} NurseLocator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
