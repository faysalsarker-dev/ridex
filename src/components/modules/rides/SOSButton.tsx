
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Phone, Send, MapPin, X, Loader2 } from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

type Coords = { lat: number; lng: number };

interface SOSButtonProps {
  policeNumber?: string;
}

export function SOSButton({ policeNumber = "999" }: SOSButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [sending, setSending] = useState(false);
  
  const watchIdRef = useRef<number | null>(null);
  const locationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const updateCountRef = useRef(0);

  const { data } = useUserInfoQuery(undefined);
  const emergencyContact: string | undefined = '01884570877';

  // Get current location
  const getLocation = (): Promise<Coords> =>
    new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation not supported"));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        reject,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
      );
    });

  // Generate Google Maps link
  const mapsLink = (c?: Coords) =>
    c ? `https://www.google.com/maps?q=${c.lat},${c.lng}` : "";

  // Send location via WhatsApp API (Backend)
  const sendWhatsAppLocation = async (coords: Coords, isUpdate: boolean = false) => {
    if (!emergencyContact) return;

    try {
      const link = mapsLink(coords);
      const message = isUpdate 
        ? `🚨 LIVE LOCATION UPDATE #${updateCountRef.current}\n📍 ${link}\n⏰ ${new Date().toLocaleTimeString()}`
        : `🚨 SOS ALERT! I need immediate help!\n\n📍 My location:\n${link}\n\n⏰ ${new Date().toLocaleString()}\n\n🔄 You will receive live updates every 30 seconds.`;

      // Call your backend API to send WhatsApp message
      const response = await fetch('/api/emergency/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: emergencyContact,
          message: message,
          location: coords
        })
      });

      if (!response.ok) throw new Error('Failed to send WhatsApp message');
      
      if (isUpdate) {
        updateCountRef.current++;
      }
      
      return true;
    } catch (error) {
      console.error('WhatsApp send error:', error);
      return false;
    }
  };

  // ONE-CLICK: Start automatic live location sharing
  const startAutoLiveTracking = async () => {
    if (!emergencyContact) {
      alert("⚠️ No emergency contact saved.\nPlease add one in settings.");
      return;
    }

    try {
      setSending(true);

      // Get and send initial location
      const initialCoords = await getLocation();
      const sent = await sendWhatsAppLocation(initialCoords, false);

      if (sent) {
        setIsSOSActive(true);
        updateCountRef.current = 1;
        alert("✅ SOS Activated!\nEmergency contact notified.\nSending live updates every 30 seconds.");

        // Set up automatic updates every 30 seconds
        locationIntervalRef.current = setInterval(async () => {
          try {
            const coords = await getLocation();
            await sendWhatsAppLocation(coords, true);
          } catch (error) {
            console.error("Failed to send update:", error);
          }
        }, 30000);

        // Watch position for accuracy
        watchIdRef.current = navigator.geolocation.watchPosition(
          (position) => {
            console.log("Position tracked:", position.coords);
          },
          (error) => console.error("Watch error:", error),
          { enableHighAccuracy: true, maximumAge: 10000 }
        );

        setShowOptions(false); // Auto-close menu
      } else {
        alert("❌ Failed to send alert. Please try again.");
      }
    } catch (error) {
      alert("❌ Unable to get location.\nPlease enable Location Services.");
    } finally {
      setSending(false);
    }
  };

  // Stop live tracking
  const stopLiveTracking = async () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    if (locationIntervalRef.current) {
      clearInterval(locationIntervalRef.current);
      locationIntervalRef.current = null;
    }

    // Send final "SOS Deactivated" message
    if (emergencyContact) {
      try {
        await fetch('/api/emergency/whatsapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phoneNumber: emergencyContact,
            message: `✅ SOS Deactivated\nI'm safe now. Thank you!\n⏰ ${new Date().toLocaleString()}`
          })
        });
      } catch (error) {
        console.error("Failed to send deactivation message:", error);
      }
    }

    setIsSOSActive(false);
    updateCountRef.current = 0;
    alert("🛑 SOS Deactivated\nLive tracking stopped.");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
      if (locationIntervalRef.current) {
        clearInterval(locationIntervalRef.current);
      }
    };
  }, []);

  // Quick call police
  const callPolice = () => {
    window.location.href = `tel:${policeNumber}`;
    setTimeout(() => setShowOptions(false), 500);
  };

  // Quick share location (one-time, copy to clipboard)
  const quickShareLocation = async () => {
    try {
      setSending(true);
      const coords = await getLocation();
      const link = mapsLink(coords);
      await navigator.clipboard.writeText(link);
      alert(`✅ Location copied!\n${link}\n\nYou can paste and share this link anywhere.`);
      setShowOptions(false);
    } catch {
      alert("❌ Unable to get location.\nPlease enable Location Services.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* SOS Active Status Bar */}
      <AnimatePresence>
        {isSOSActive && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-red-600 text-white px-4 py-3 shadow-lg"
          >
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <AlertTriangle className="h-5 w-5" />
                </motion.div>
                <div>
                  <p className="font-bold text-sm">🚨 SOS ACTIVE - Live Tracking</p>
                  <p className="text-xs opacity-90">
                    Updates sent: {updateCountRef.current} • Next in 30s
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={stopLiveTracking}
                className="bg-white text-red-600 hover:bg-gray-100 font-bold"
              >
                <X className="h-4 w-4 mr-1" />
                Stop
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main SOS Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.3 }}
        className="fixed bottom-24 md:bottom-32 right-4 z-40"
      >
        <div className="relative w-20 h-20">
          {/* Pulse ring */}
          <motion.div
            aria-hidden
            animate={{ 
              scale: isSOSActive ? [1, 1.4, 1] : [1, 1.2, 1], 
              opacity: [0.6, 0, 0.6] 
            }}
            transition={{ 
              duration: isSOSActive ? 0.8 : 2, 
              repeat: Infinity, 
              ease: "easeOut" 
            }}
            className="absolute inset-0 rounded-full bg-red-600 -z-10"
          />

          {/* Main button */}
          <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
            <Button
              size="lg"
              variant="destructive"
              onClick={() => setShowOptions(!showOptions)}
              className={`w-20 h-20 rounded-full p-0 shadow-2xl border-4 border-white
                         flex flex-col items-center justify-center gap-1
                         ${isSOSActive ? 'bg-red-700' : 'bg-red-600'}`}
            >
              <motion.div
                animate={{ 
                  rotate: isSOSActive ? [0, -20, 20, -20, 0] : [0, -10, 10, -10, 0] 
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: isSOSActive ? 0.5 : 2,
                }}
              >
                <AlertTriangle className="h-8 w-8" />
              </motion.div>
              <span className="text-xs font-bold">SOS</span>
            </Button>
          </motion.div>
        </div>

        {/* Simplified Options Menu */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-24 right-0 w-64"
            >
              <div className="bg-white shadow-2xl rounded-2xl p-3 space-y-2 border-2 border-red-100">
                
                {/* ONE-CLICK Live Location (Primary Action) */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={isSOSActive ? stopLiveTracking : startAutoLiveTracking}
                  disabled={sending || !emergencyContact}
                  className={`w-full px-4 py-4 rounded-xl font-bold text-base
                           flex items-center justify-center gap-2 transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed
                           ${isSOSActive 
                             ? 'bg-red-600 hover:bg-red-700 text-white' 
                             : 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                           }`}
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Activating...
                    </>
                  ) : isSOSActive ? (
                    <>
                      <X className="h-5 w-5" />
                      Stop Live Tracking
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Live Location
                    </>
                  )}
                </motion.button>

                <div className="h-px bg-gray-200 my-2" />

                {/* Quick Actions */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={callPolice}
                  className="w-full bg-black text-white px-4 py-3 rounded-xl font-medium
                           flex items-center justify-center gap-2 hover:bg-gray-800"
                >
                  <Phone className="h-4 w-4" />
                  Call Police ({policeNumber})
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={quickShareLocation}
                  disabled={sending}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl font-medium
                           flex items-center justify-center gap-2 hover:bg-blue-700
                           disabled:opacity-50"
                >
                  <MapPin className="h-4 w-4" />
                  Copy Location Link
                </motion.button>

                {/* Emergency Contact Status */}
                {!emergencyContact ? (
                  <div className="mt-2 p-2 bg-yellow-50 border border-yellow-300 rounded-lg">
                    <p className="text-xs text-yellow-800 text-center">
                      ⚠️ Set emergency contact in settings
                    </p>
                  </div>
                ) : (
                  <div className="mt-2 p-2 bg-green-50 border border-green-300 rounded-lg">
                    <p className="text-xs text-green-800 text-center font-medium">
                      ✓ Contact: {emergencyContact}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}