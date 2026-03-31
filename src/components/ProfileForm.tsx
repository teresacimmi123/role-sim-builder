import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserProfile } from "@/types/simulation";
import { ArrowRight, ArrowLeft, User, Target, Heart } from "lucide-react";
import { pushEvent } from "@/lib/gtm";

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
  onBack: () => void;
}

const digitalAreas = [
  { id: "UX/UI Design", label: "UX/UI Design", description: "Vuoi capire come si progettano app e siti che le persone trovano belli e facili da usare" },
  { id: "Web Development", label: "Web Development", description: "Ti incuriosisce come vengono costruiti siti web e applicazioni da zero" },
  { id: "Digital Marketing", label: "Digital Marketing", description: "Vuoi capire come i brand comunicano online e raggiungono le persone giuste" },
  { id: "Data Analysis e Data Science", label: "Data Analysis", description: "Ti affascina l'idea di trovare storie e decisioni nascoste nei numeri" },
  { id: "Non lo so", label: "Non lo so ancora", description: "Voglio esplorare il digitale senza partire da una scelta precisa" },
];

const ProfileForm = ({ onSubmit, onBack }: ProfileFormProps) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    background: "",
    digitalArea: "",
    interests: "",
  });
  const formStartTracked = useRef(false);

  const trackFormStart = () => {
    if (!formStartTracked.current) {
      pushEvent({
        event: 'form_start',
        event_category: 'lead_generation',
        event_label: 'Primo campo compilato nel form contatti',
      });
      formStartTracked.current = true;
    }
  };

  const steps = [
    {
      icon: User,
      title: "Il tuo background",
      subtitle: "Raccontaci da dove vieni — studi, lavori, corsi, esperienze. Non serve essere esperti.",
      placeholder: "Es: Sono al primo anno di università, ho lavorato in un negozio, ho fatto un corso online di fotografia, vengo da studi classici...",
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
    // onboarding_step_completed for every step
    const stepNames = ["Il tuo background", "I tuoi interessi", "Area digitale"];
    pushEvent({
      event: 'onboarding_step_completed',
      event_category: 'onboarding',
      step_number: step + 1,
      step_name: stepNames[step],
      step_value: step === 2 ? profile.digitalArea : "compilato",
    });

    if (isLastStep) {
      pushEvent({
        event: 'onboarding_completed',
        event_category: 'onboarding',
        area_selected: profile.digitalArea,
      });
      pushEvent({
        event: 'form_submit',
        event_category: 'lead_generation',
        event_label: 'Form contatti inviato con successo',
      });
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
        {/* Progress - numeric */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {steps.map((_, index) => {
            const num = String(index + 1).padStart(2, '0');
            const isCompleted = index < step;
            const isActive = index === step;
            return (
              <div key={index} className="flex items-center gap-4">
                <span
                  className={`text-sm font-medium tracking-wider ${
                    isCompleted
                      ? "text-[#00e599]"
                      : isActive
                      ? "text-foreground border-b-2 border-[#00e599] pb-0.5"
                      : "text-muted-foreground/40"
                  }`}
                >
                  {num}
                </span>
                {index < steps.length - 1 && (
                  <span className="text-muted-foreground/30">—</span>
                )}
              </div>
            );
          })}
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
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#00e599]">
                  Step {String(step + 1).padStart(2, '0')}
                </span>
                <h2 className="text-2xl font-bold mt-1">{currentStep.title}</h2>
                <p className="text-sm text-muted-foreground">{currentStep.subtitle}</p>
              </div>

              {currentStep.isSelect ? (
                <div className="space-y-3">
                  {digitalAreas.map((area) => (
                    <button
                      key={area.id}
                      onClick={() => {
                        trackFormStart();
                        setProfile({ ...profile, digitalArea: area.id });
                      }}
                      className={`w-full p-4 rounded text-left transition-all duration-200 ${
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
                  onFocus={trackFormStart}
                  placeholder={currentStep.placeholder}
                  className="w-full h-32 bg-secondary/50 border border-border rounded p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
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
