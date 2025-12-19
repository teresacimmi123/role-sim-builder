import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import ProfileForm from "@/components/ProfileForm";
import SimulationView from "@/components/SimulationView";
import { UserProfile, SimulationScenario } from "@/types/simulation";
import { generateScenario } from "@/lib/simulation-engine";

type AppPhase = "hero" | "form" | "simulation";

const Index = () => {
  const [phase, setPhase] = useState<AppPhase>("hero");
  const [scenario, setScenario] = useState<SimulationScenario | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleStartForm = () => {
    setPhase("form");
  };

  const handleProfileSubmit = (profile: UserProfile) => {
    const generatedScenario = generateScenario(profile);
    setScenario(generatedScenario);
    setUserProfile(profile);
    setPhase("simulation");
  };

  const handleRestart = () => {
    setScenario(null);
    setUserProfile(null);
    setPhase("hero");
  };

  const handleBackToHero = () => {
    setPhase("hero");
  };

  return (
    <main className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {phase === "hero" && <HeroSection key="hero" onStart={handleStartForm} />}
        {phase === "form" && (
          <ProfileForm key="form" onSubmit={handleProfileSubmit} onBack={handleBackToHero} />
        )}
        {phase === "simulation" && scenario && userProfile && (
          <SimulationView key="simulation" scenario={scenario} gender={userProfile.gender} onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
