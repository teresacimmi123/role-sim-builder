import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Briefcase, Zap } from "lucide-react";
import start2impactLogo from "@/assets/start2impact-logo.png";
import { pushEvent } from "@/lib/gtm";

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  const handleStart = () => {
    pushEvent({
      event: 'quiz_start',
      event_category: 'engagement',
      event_label: 'Inizio simulazione dalla homepage',
    });
    onStart();
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-visible pt-8">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Logo start2impact */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img 
            src={start2impactLogo} 
            alt="start2impact" 
            className="h-10 md:h-12 mx-auto brightness-0 invert"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded glass text-sm text-primary font-medium">
            <Sparkles className="w-4 h-4" />
            Simulatore di Carriera Digitale
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-normal mb-6 leading-[1.15] overflow-visible"
        >
          Simula una
          <span className="block overflow-visible text-gradient-primary py-1">giornata di lavoro</span>
          nel digitale
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground mb-10 leading-relaxed"
        >
          Vivi un'esperienza immersiva basata sul tuo background.
          <br className="hidden md:block" />
          Niente teoria: solo pratica reale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button 
            onClick={handleStart}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-lg font-semibold h-15 px-11 py-4 transition-all duration-300 bg-transparent border-2 border-[#00e599] text-[#00e599] hover:bg-[rgba(0,229,153,0.08)] active:scale-[0.98]"
          >
            <Zap className="w-5 h-5" />
            Inizia la Simulazione
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { icon: Briefcase, label: "Scenari reali" },
            { icon: Zap, label: "Task interattivi" },
            { icon: Sparkles, label: "Personalizzato" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="w-12 h-12 rounded glass flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
