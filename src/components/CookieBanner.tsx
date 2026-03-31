import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "cookie-consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50"
        >
          <div className="bg-card border border-border rounded p-5 shadow-xl backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded p-2 mt-0.5">
                <Cookie className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-sm text-foreground leading-relaxed">
                  Questo sito utilizza cookie tecnici per garantire il corretto funzionamento. Non utilizziamo cookie di profilazione.{" "}
                  <a
                    href="https://www.iubenda.com/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </p>
                <div className="flex gap-2">
                  <Button onClick={handleAccept} size="sm" className="flex-1">
                    Accetta
                  </Button>
                  <Button onClick={handleReject} variant="outline" size="sm" className="flex-1">
                    Rifiuta
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
