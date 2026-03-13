import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SimulationScenario, Task, TaskChoice } from "@/types/simulation";
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase,
  Lightbulb,
  Target,
  AlertCircle,
  RotateCcw,
  Trophy,
  Star,
  Zap,
  BookOpen,
  Shield,
  Mail,
  Phone,
  User,
  ChevronDown
} from "lucide-react";

interface SimulationViewProps {
  scenario: SimulationScenario;
  onRestart: () => void;
}

type SimulationPhase = "intro" | "tasks" | "taskFeedback" | "final" | "finalOutcome" | "contactForm" | "recap";

const SimulationView = ({ scenario, onRestart }: SimulationViewProps) => {
  const [phase, setPhase] = useState<SimulationPhase>("intro");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedTaskChoice, setSelectedTaskChoice] = useState<TaskChoice | null>(null);
  const [taskResults, setTaskResults] = useState<{ task: Task; choice: TaskChoice }[]>([]);
  const [selectedFinalChoice, setSelectedFinalChoice] = useState<{ id: string; text: string; description: string; outcome: string } | null>(null);
  const [expandedFinalChoice, setExpandedFinalChoice] = useState<string | null>(null);
  const [contactData, setContactData] = useState({ name: "", email: "", phone: "" });
  const [expandedRecapTask, setExpandedRecapTask] = useState<number | null>(null);
  const [touchedFields, setTouchedFields] = useState({ email: false, phone: false });

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = (phone: string) => /^[\d\s+]+$/.test(phone) && phone.replace(/\D/g, "").length >= 8;

  const emailError = touchedFields.email && contactData.email && !isEmailValid(contactData.email);
  const phoneError = touchedFields.phone && contactData.phone && !isPhoneValid(contactData.phone);
  const isContactFormValid = contactData.name.trim() !== "" && isEmailValid(contactData.email) && isPhoneValid(contactData.phone);

  const currentTask = scenario.tasks[currentTaskIndex];

  const handleTaskChoiceSelect = (choice: TaskChoice) => {
    setSelectedTaskChoice(choice);
    setPhase("taskFeedback");
  };

  const handleNextTask = () => {
    if (selectedTaskChoice && currentTask) {
      setTaskResults([...taskResults, { task: currentTask, choice: selectedTaskChoice }]);
    }
    setSelectedTaskChoice(null);
    
    if (currentTaskIndex < scenario.tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
      setPhase("tasks");
    } else {
      setPhase("final");
    }
  };

  const handleFinalChoiceSelect = (choice: { id: string; text: string; description: string; outcome: string }) => {
    setSelectedFinalChoice(choice);
    setPhase("finalOutcome");
  };

  const correctAnswers = taskResults.filter(r => r.choice.isCorrect).length;

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <Card variant="gradient" className="p-6 border-l-4 border-l-[#00c896]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Il tuo ruolo</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gradient-primary">{scenario.role}</h2>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{scenario.roleExplanation}</p>
      </Card>

      <Card variant="glass" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <span className="font-medium">La tua giornata inizia...</span>
        </div>
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {scenario.morningIntro}
        </p>
      </Card>

      <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-accent" />
          <span className="font-medium text-accent">Come funziona</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Affronterai 4 situazioni reali. Per ognuna dovrai fare una scelta: non ci sono risposte sbagliate in assoluto, ma alcune sono più efficaci di altre. Riceverai feedback immediato.
        </p>
      </div>

      <Button variant="hero" size="lg" onClick={() => setPhase("tasks")} className="w-full">
        Inizia la Simulazione
        <ArrowRight className="w-5 h-5" />
      </Button>
    </motion.div>
  );

  const renderTask = () => (
    <motion.div
      key={`task-${currentTaskIndex}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground">
          Situazione {currentTaskIndex + 1} di {scenario.tasks.length}
        </span>
        <div className="flex gap-1.5">
          {scenario.tasks.map((_, index) => (
            <div
              key={index}
              className={`w-8 h-1.5 rounded-full transition-all ${
                index < currentTaskIndex
                  ? "bg-primary"
                  : index === currentTaskIndex
                  ? "bg-primary/50"
                  : "bg-secondary"
              }`}
            />
          ))}
        </div>
      </div>

      <Card variant="gradient" className="p-6">
        <h3 className="text-2xl font-extrabold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          {currentTask.title}
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-secondary/30">
            <p className="text-sm text-foreground leading-relaxed">{currentTask.context}</p>
          </div>
          
          {/* Technical Terms Explanation */}
          {currentTask.technicalTerms && currentTask.technicalTerms.length > 0 && (
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-2 mb-3">
                <BookOpen className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Glossario</span>
              </div>
              <div className="space-y-2">
                {currentTask.technicalTerms.map((term, idx) => (
                  <div key={idx} className="text-sm">
                    <span className="font-semibold text-foreground">{term.term}:</span>{" "}
                    <span className="text-muted-foreground">{term.explanation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">La sfida</span>
            </div>
            <p className="text-foreground font-medium">{currentTask.challenge}</p>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {currentTask.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleTaskChoiceSelect(choice)}
            className="w-full p-5 rounded-xl bg-secondary/50 border-2 border-transparent hover:border-primary/50 hover:bg-secondary transition-all text-left group"
          >
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                {choice.id.toUpperCase()}
              </span>
              <p className="text-foreground leading-relaxed">{choice.text}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const renderTaskFeedback = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <Card variant="gradient" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          {selectedTaskChoice?.isCorrect ? (
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-accent" />
            </div>
          )}
          <div>
            <span className="font-medium">
              {selectedTaskChoice?.isCorrect ? "Ottima scelta!" : "Interessante..."}
            </span>
          </div>
        </div>
        
        <div className="p-4 rounded-xl bg-secondary/30 mb-4">
          <p className="text-sm text-muted-foreground mb-2">La tua risposta:</p>
          <p className="text-foreground">{selectedTaskChoice?.text}</p>
        </div>
        
        <div className={`p-4 rounded-xl ${selectedTaskChoice?.isCorrect ? "bg-primary/10 border border-primary/20" : "bg-accent/10 border border-accent/20"}`}>
          <p className="text-foreground leading-relaxed">{selectedTaskChoice?.feedback}</p>
        </div>
      </Card>

      <Card variant="glass" className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="font-medium">Una cosa utile da sapere</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {currentTask.lesson}
        </p>
      </Card>

      <Button variant="hero" size="lg" onClick={handleNextTask} className="w-full">
        {currentTaskIndex < scenario.tasks.length - 1 ? "Prossima Situazione" : "Scenario Finale"}
        <ArrowRight className="w-5 h-5" />
      </Button>
    </motion.div>
  );

  const renderFinal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
          <Star className="w-4 h-4" />
          Scenario Finale
        </span>
      </div>

      <Card variant="gradient" className="p-6">
        <p className="text-muted-foreground mb-4">{scenario.finalScenario.context}</p>
        <p className="text-foreground leading-relaxed font-medium">
          {scenario.finalScenario.situation}
        </p>
      </Card>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center mb-4">Quale strada scegli?</p>
        {scenario.finalScenario.choices.map((choice) => (
          <div key={choice.id} className="rounded-xl bg-secondary/50 border-2 border-transparent hover:border-primary/50 hover:bg-secondary transition-all">
            <button
              onClick={() => setExpandedFinalChoice(expandedFinalChoice === choice.id ? null : choice.id)}
              className="w-full p-5 text-left group"
            >
              <div className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  {choice.id.toUpperCase()}
                </span>
                <p className="text-foreground leading-relaxed flex-1">{choice.text}</p>
                <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 mt-0.5 transition-transform ${expandedFinalChoice === choice.id ? "rotate-180" : ""}`} />
              </div>
            </button>
            <AnimatePresence>
              {expandedFinalChoice === choice.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pt-0 ml-11">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{choice.description}</p>
                    <Button variant="hero" size="sm" onClick={() => handleFinalChoiceSelect(choice)}>
                      Scelgo questa strada
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const renderFinalOutcome = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <Card variant="gradient" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <span className="font-medium">Il tuo futuro</span>
        </div>
        <p className="text-muted-foreground mb-4">{selectedFinalChoice?.text}</p>
        
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <p className="text-foreground leading-relaxed">{selectedFinalChoice?.outcome}</p>
        </div>
      </Card>

      <Button variant="hero" size="lg" onClick={() => setPhase("contactForm")} className="w-full">
        Vedi il Recap Completo
        <ArrowRight className="w-5 h-5" />
      </Button>
    </motion.div>
  );

  const renderContactForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
        >
          <Trophy className="w-8 h-8 text-primary" />
        </motion.div>
        <h2 className="text-3xl font-extrabold">Ottimo lavoro!</h2>
        <p className="text-muted-foreground mt-2">
          Per ricevere il tuo report personalizzato, inserisci i tuoi dati
        </p>
      </div>

      <Card variant="gradient" className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Il tuo nome"
              value={contactData.name}
              onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
              className="bg-secondary/50 border-border/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="La tua email"
              value={contactData.email}
              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
              onBlur={() => setTouchedFields(f => ({ ...f, email: true }))}
              className={`bg-secondary/50 border-border/50 ${emailError ? "border-red-500" : ""}`}
            />
            {emailError && <p className="text-sm text-red-500">Inserisci un'email valida</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Telefono
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Il tuo numero di telefono"
              value={contactData.phone}
              onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
              onBlur={() => setTouchedFields(f => ({ ...f, phone: true }))}
              className={`bg-secondary/50 border-border/50 ${phoneError ? "border-red-500" : ""}`}
            />
            {phoneError && <p className="text-sm text-red-500">Inserisci un numero di telefono valido</p>}
          </div>
        </div>
      </Card>

      <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            I tuoi dati sono protetti dalla nostra privacy policy. Li utilizzeremo solo per inviarti 
            comunicazioni utili e pertinenti al tuo percorso di crescita nel digitale. 
            Niente spam, promesso.
          </p>
        </div>
      </div>

      <Button 
        variant="hero" 
        size="lg" 
        onClick={() => setPhase("recap")} 
        className="w-full"
        disabled={!isContactFormValid}
      >
        Vedi il mio Report
        <ArrowRight className="w-5 h-5" />
      </Button>
    </motion.div>
  );

  const renderRecap = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
        >
          <Trophy className="w-10 h-10 text-primary" />
        </motion.div>
        <h2 className="text-3xl font-extrabold">Hai vissuto una giornata da {scenario.role}.</h2>
      </div>

      <Card variant="gradient" className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          I tuoi risultati
        </h3>
        <div className="space-y-2">
          {taskResults.map((result, index) => (
            <div key={index} className="rounded-lg bg-secondary/50 overflow-hidden">
              <button
                onClick={() => setExpandedRecapTask(expandedRecapTask === index ? null : index)}
                className="w-full flex items-center gap-3 p-3 text-left"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${result.choice.isCorrect ? "bg-primary/20" : "bg-accent/20"}`}>
                  {result.choice.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  ) : (
                    <Lightbulb className="w-4 h-4 text-accent" />
                  )}
                </div>
                <span className="text-sm flex-1">{result.task.title}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${expandedRecapTask === index ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {expandedRecapTask === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-3 pb-3 ml-9">
                      <p className="text-sm text-muted-foreground leading-relaxed">{result.task.lesson}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="glass" className="p-6">
        <h3 className="text-xl font-bold mb-3">Perché questo percorso fa per te</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{scenario.conclusion}</p>
      </Card>

      <Card variant="gradient" className="p-6 border-primary/30 border-l-4 border-l-[#00c896]">
        <h3 className="text-xl font-bold mb-3 text-primary flex items-center gap-2">
          <Star className="w-5 h-5" />
          Il tuo prossimo passo
        </h3>
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {scenario.encouragement}
        </p>
      </Card>

      {/* Master Recommendation */}
      <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/10 border-2 border-primary/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/30 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Il Master consigliato per te</p>
            <h3 className="text-xl font-extrabold text-primary">{scenario.masterRecommendation.name}</h3>
          </div>
        </div>
        <p className="text-sm text-foreground leading-relaxed mb-4">
          {scenario.masterRecommendation.description}
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 py-3 px-4 rounded-lg bg-primary/10">
          <span className="flex items-center gap-1.5 text-sm text-primary">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            +3.000 studenti già assunti
          </span>
          <span className="hidden sm:block w-px h-4 bg-primary/30" />
          <span className="flex items-center gap-1.5 text-sm text-primary">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            98% trova lavoro entro 6 mesi
          </span>
          <span className="hidden sm:block w-px h-4 bg-primary/30" />
          <span className="flex items-center gap-1.5 text-sm text-primary">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Garanzia Money Back Under 30*
          </span>
        </div>
        <a 
          href={scenario.masterRecommendation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 w-full"
        >
          <Button variant="hero" size="lg" className="w-full">
            Scopri il Master
            <ArrowRight className="w-5 h-5" />
          </Button>
        </a>
        <p className="text-xs text-muted-foreground mt-3">*Condizioni su start2impact.it</p>
      </Card>

      <div className="pt-4">
        <Button variant="outline" size="lg" onClick={onRestart} className="w-full">
          <RotateCcw className="w-5 h-5" />
          Vuoi provare un altro scenario?
        </Button>
      </div>
    </motion.div>
  );

  return (
    <section className="min-h-screen px-4 py-12">
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {phase === "intro" && renderIntro()}
          {phase === "tasks" && renderTask()}
          {phase === "taskFeedback" && renderTaskFeedback()}
          {phase === "final" && renderFinal()}
          {phase === "finalOutcome" && renderFinalOutcome()}
          {phase === "contactForm" && renderContactForm()}
          {phase === "recap" && renderRecap()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SimulationView;
