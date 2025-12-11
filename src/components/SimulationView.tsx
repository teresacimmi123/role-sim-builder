import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SimulationScenario, Task, SimulationChoice } from "@/types/simulation";
import { 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Briefcase,
  Lightbulb,
  Target,
  MessageSquare,
  RotateCcw,
  Trophy,
  Star
} from "lucide-react";

interface SimulationViewProps {
  scenario: SimulationScenario;
  onRestart: () => void;
}

type SimulationPhase = "intro" | "tasks" | "interactive" | "outcome" | "recap";

const SimulationView = ({ scenario, onRestart }: SimulationViewProps) => {
  const [phase, setPhase] = useState<SimulationPhase>("intro");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [selectedChoice, setSelectedChoice] = useState<SimulationChoice | null>(null);

  const handleCompleteTask = () => {
    setCompletedTasks([...completedTasks, currentTaskIndex]);
    if (currentTaskIndex < scenario.tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    } else {
      setPhase("interactive");
    }
  };

  const handleChoiceSelect = (choice: SimulationChoice) => {
    setSelectedChoice(choice);
    setPhase("outcome");
  };

  const renderIntro = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <Card variant="gradient" className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Il tuo ruolo</p>
            <h2 className="text-xl font-bold text-gradient-primary">{scenario.role}</h2>
          </div>
        </div>
        <p className="text-muted-foreground leading-relaxed">{scenario.roleExplanation}</p>
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

      <Button variant="hero" size="lg" onClick={() => setPhase("tasks")} className="w-full">
        Inizia i Task
        <ArrowRight className="w-5 h-5" />
      </Button>
    </motion.div>
  );

  const renderTasks = () => {
    const task = scenario.tasks[currentTaskIndex];
    return (
      <motion.div
        key={currentTaskIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="space-y-4"
      >
        {/* Progress */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-sm text-muted-foreground">
            Task {currentTaskIndex + 1} di {scenario.tasks.length}
          </span>
          <div className="flex gap-1.5">
            {scenario.tasks.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-1.5 rounded-full transition-all ${
                  completedTasks.includes(index)
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
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            {task.title}
          </h3>
          <p className="text-foreground leading-relaxed mb-6">{task.description}</p>
          
          <div className="grid gap-4">
            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Competenza</span>
              </div>
              <p className="text-sm text-foreground">{task.skill}</p>
            </div>
            
            <div className="p-4 rounded-xl bg-secondary/50">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Perché è importante</span>
              </div>
              <p className="text-sm text-muted-foreground">{task.purpose}</p>
            </div>
          </div>
        </Card>

        <Button variant="hero" size="lg" onClick={handleCompleteTask} className="w-full">
          <CheckCircle2 className="w-5 h-5" />
          Completa Task
        </Button>
      </motion.div>
    );
  };

  const renderInteractive = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium">
          <Star className="w-4 h-4" />
          Scenario Interattivo
        </span>
      </div>

      <Card variant="gradient" className="p-6">
        <p className="text-sm text-muted-foreground mb-3">{scenario.interactiveScenario.context}</p>
        <p className="text-foreground leading-relaxed font-medium">
          {scenario.interactiveScenario.situation}
        </p>
      </Card>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center mb-4">Come reagisci?</p>
        {scenario.interactiveScenario.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => handleChoiceSelect(choice)}
            className="w-full p-5 rounded-xl bg-secondary/50 border-2 border-transparent hover:border-primary/50 hover:bg-secondary transition-all text-left"
          >
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                {choice.id.toUpperCase()}
              </span>
              <p className="text-foreground leading-relaxed">{choice.text}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );

  const renderOutcome = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <Card variant="gradient" className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          <span className="font-medium">La tua scelta</span>
        </div>
        <p className="text-muted-foreground mb-4">{selectedChoice?.text}</p>
        
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <p className="text-foreground leading-relaxed">{selectedChoice?.outcome}</p>
        </div>
      </Card>

      <Button variant="hero" size="lg" onClick={() => setPhase("recap")} className="w-full">
        Vedi il Recap
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
        <h2 className="text-2xl font-bold">Simulazione Completata!</h2>
        <p className="text-muted-foreground mt-2">Hai vissuto una giornata da {scenario.role}</p>
      </div>

      <Card variant="gradient" className="p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          Task Completati
        </h3>
        <div className="space-y-2">
          {scenario.tasks.map((task, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">{task.title}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="glass" className="p-6">
        <h3 className="font-semibold mb-3">Perché questo percorso fa per te</h3>
        <p className="text-muted-foreground leading-relaxed">{scenario.conclusion}</p>
      </Card>

      <Card variant="gradient" className="p-6 border-primary/30">
        <h3 className="font-semibold mb-3 text-primary flex items-center gap-2">
          <Star className="w-5 h-5" />
          Il tuo prossimo passo
        </h3>
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {scenario.encouragement}
        </p>
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
          {phase === "tasks" && renderTasks()}
          {phase === "interactive" && renderInteractive()}
          {phase === "outcome" && renderOutcome()}
          {phase === "recap" && renderRecap()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SimulationView;
