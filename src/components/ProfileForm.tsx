import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserProfile } from "@/types/simulation";
import { ArrowRight, ArrowLeft, User, Target, Heart } from "lucide-react";

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

const digitalAreas = [
  { id: "UX/UI Design", label: "UX/UI Design", description: "Progettazione di interfacce e esperienze utente" },
  { id: "Web Development", label: "Web Development", description: "Sviluppo di siti web e applicazioni" },
  { id: "Digital Marketing", label: "Digital Marketing", description: "Marketing digitale, social media, advertising" },
  { id: "Data Analysis e Data Science", label: "Data Analysis", description: "Analisi dati e business intelligence" },
  { id: "Non lo so", label: "Non lo so ancora", description: "Voglio esplorare le possibilità" },
];

const ProfileForm = ({ onSubmit, onBack }: ProfileFormProps) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    background: "",
    digitalArea: "",
    interests: "",
  });

  const steps = [
    {
      icon: User,
      title: "Il tuo background",
      subtitle: "Qual è la tua formazione o esperienza precedente?",
      placeholder: "Es: Laurea in Comunicazione, 2 anni in un'agenzia eventi, corso di graphic design...",
      field: "background" as keyof UserProfile,
    },
    {
      icon: Heart,
      title: "I tuoi interessi",
      subtitle: "Cosa ti appassiona? (anche fuori dal lavoro)",
      placeholder: "Es: fotografia, viaggi, gaming, musica, sport, lettura...",
      field: "interests" as keyof UserProfile,
    },
    {
      icon: Target,
      title: "Area digitale",
      subtitle: "Quale area ti interessa esplorare?",
      field: "digitalArea" as keyof UserProfile,
      isSelect: true,
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;
  const canProceed = profile[currentStep.field]?.trim() !== "";

  const handleNext = () => {
    if (isLastStep) {
      onSubmit(profile);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step === 0) {
      onBack();
    } else {
      setStep(step - 1);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                index <= step ? "bg-primary" : "bg-secondary"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card variant="gradient" className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <currentStep.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{currentStep.title}</h2>
                  <p className="text-sm text-muted-foreground">{currentStep.subtitle}</p>
                </div>
              </div>

              {currentStep.isSelect ? (
                <div className="space-y-3">
                  {digitalAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => setProfile({ ...profile, digitalArea: area.id })}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                        profile.digitalArea === area.id
                          ? "bg-primary/20 border-2 border-primary"
                          : "bg-secondary/50 border-2 border-transparent hover:bg-secondary"
                      }`}
                    >
                      <div className="font-medium">{area.label}</div>
                      <div className="text-sm text-muted-foreground">{area.description}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <textarea
                  value={profile[currentStep.field]}
                  onChange={(e) =>
                    setProfile({ ...profile, [currentStep.field]: e.target.value })
                  }
                  placeholder={currentStep.placeholder}
                  className="w-full h-32 bg-secondary/50 border border-border rounded-xl p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              )}

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={handlePrev} className="flex-1">
                  <ArrowLeft className="w-4 h-4" />
                  Indietro
                </Button>
                <Button
                  variant="hero"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="flex-1"
                >
                  {isLastStep ? "Inizia" : "Avanti"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Step {step + 1} di {steps.length}
        </p>
      </motion.div>
    </section>
  );
};

export default ProfileForm;
