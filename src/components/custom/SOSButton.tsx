"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

type Coords = { lat: number; lng: number };

interface SOSButtonProps {
  policeNumber?: string; 
}

export function SOSButton({ policeNumber = "999" }: SOSButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [busy, setBusy] = useState<"wa" | "loc" | null>(null);

  const { data } = useUserInfoQuery(undefined);
  const emergencyContact: string | undefined = data?.data?.emergencyContact;

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

  const mapsLink = (c?: Coords) =>
    c ? `https://www.google.com/maps?q=${c.lat},${c.lng}` : "";

  // call police directly
  const callPolice = () => {
    window.location.href = `tel:${policeNumber}`;
  };

  // notify saved emergency contact via WhatsApp
  const notifyContact = async () => {
    if (!emergencyContact) {
      alert("⚠️ No emergency contact saved.");
      return;
    }
    try {
      setBusy("wa");
      const coords = await getLocation().catch(() => undefined);
      const link = mapsLink(coords);
      const msg = `🚨 SOS! I need help.${
        link ? ` My location: ${link}` : ""
      }`;
      const waNumber = emergencyContact.replace(/[^\d]/g, "");
      window.open(
        `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`,
        "_blank"
      );
    } finally {
      setBusy(null);
    }
  };

  // copy/share live location link
  const shareLocation = async () => {
    try {
      setBusy("loc");
      const coords = await getLocation();
      const link = mapsLink(coords);
      await navigator.clipboard.writeText(link);
      alert(`📍 Location copied: ${link}`);
    } catch {
      alert("Unable to get location. Please enable Location Services.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.3 }}
      className="absolute bottom-52 md:bottom-64 right-4 z-50"
    >
      {/* Pulse ring */}
      <div className="relative w-20 h-20">
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-destructive -z-10 pointer-events-none"
        />

        {/* Main SOS button */}
        <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
          <Button
            size="lg"
            variant="destructive"
            onClick={() => setShowOptions((s) => !s)}
            className="w-20 h-20 rounded-full p-0
                       bg-destructive hover:bg-destructive/90
                       shadow-2xl border-4 border-white
                       flex flex-col items-center justify-center gap-1"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            >
              <AlertTriangle className="h-8 w-8" />
            </motion.div>
            <span className="text-xs font-bold">SOS</span>
          </Button>
        </motion.div>
      </div>

      {/* Options menu */}
      {showOptions && (
        <div className="mt-3 flex flex-col gap-2 bg-white shadow-lg rounded-xl p-3 z-50">
          <button
            onClick={callPolice}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            🚔 Call Police ({policeNumber})
          </button>

          <button
            onClick={notifyContact}
            disabled={busy === "wa"}
            className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
          >
            {busy === "wa" ? "Sending…" : "📲 Notify Contact"}
          </button>

          <button
            onClick={shareLocation}
            disabled={busy === "loc"}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-60"
          >
            {busy === "loc" ? "Fetching…" : "📍 Share Location"}
          </button>
        </div>
      )}
    </motion.div>
  );
}
