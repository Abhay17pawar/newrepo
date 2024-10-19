import React, { useState, useEffect } from 'react';
import { MapPin, User, Loader2, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function NearestNurse() {
  const [nearestNurse, setNearestNurse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNearestNurse = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setNearestNurse({
        id: 'N12345',
        name: 'Sarah Johnson',
        distance: '0.5 miles',
        availableTime: '15 minutes'
      });
      setLoading(false);
    };

    fetchNearestNurse();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-lg text-primary-foreground p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-primary mr-2" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              NurseLocator
            </h1>
          </div>
          <nav>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Services</Button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl border-t-4 border-primary">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-primary">Nearest Available Nurse</CardTitle>
              <CardDescription className="text-center">Professional healthcare at your doorstep</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-48">
                  <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                  <p className="text-lg text-muted-foreground">Locating nearest nurse...</p>
                </div>
              ) : nearestNurse && (
                <>
                  <User className="h-24 w-24 text-primary mb-4" />
                  <h2 className="text-2xl font-bold text-primary mb-2">{nearestNurse.name}</h2>
                  <Badge variant="secondary" className="mb-2">ID: {nearestNurse.id}</Badge>
                  <div className="flex items-center mb-4">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">{nearestNurse.distance} away</span>
                  </div>
                  <div className="flex items-center mb-6">
                    <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-muted-foreground">Available in {nearestNurse.availableTime}</span>
                  </div>
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">
                    Request This Nurse
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm py-6 text-center text-gray-600 mt-auto">
        <div className="container mx-auto px-4">
          <p className="mb-2">&copy; {new Date().getFullYear()} NurseLocator. All rights reserved.</p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            <a href="#" className="text-primary hover:underline">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}