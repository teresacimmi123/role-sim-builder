import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  BookOpen
} from "lucide-react";

interface SimulationViewProps {
  scenario: SimulationScenario;
  onRestart: () => void;
}

type SimulationPhase = "intro" | "tasks" | "taskFeedback" | "final" | "finalOutcome" | "recap";

const SimulationView = ({ scenario, onRestart }: SimulationViewProps) => {
  const [phase, setPhase] = useState<SimulationPhase>("intro");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [selectedTaskChoice, setSelectedTaskChoice] = useState<TaskChoice | null>(null);
  const [taskResults, setTaskResults] = useState<{ task: Task; choice: TaskChoice }[]>([]);
  const [selectedFinalChoice, setSelectedFinalChoice] = useState<{ id: string; text: string; outcome: string } | null>(null);

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

  const handleFinalChoiceSelect = (choice: { id: string; text: string; outcome: string }) => {
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
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          {currentTask.title}
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-secondary/30">
            <p className="text-foreground leading-relaxed">{currentTask.context}</p>
          </div>
          
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
          <span className="font-medium">Cosa impari</span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong className="text-foreground">{currentTask.skill}</strong>: {currentTask.lesson}
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
          <button
            key={choice.id}
            onClick={() => handleFinalChoiceSelect(choice)}
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

      <Button variant="hero" size="lg" onClick={() => setPhase("recap")} className="w-full">
        Vedi il Recap Completo
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
          <Target className="w-5 h-5 text-primary" />
          I tuoi risultati
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-xl bg-primary/10 text-center">
            <div className="text-3xl font-bold text-primary">{correctAnswers}/{taskResults.length}</div>
            <div className="text-sm text-muted-foreground">Scelte ottimali</div>
          </div>
          <div className="p-4 rounded-xl bg-accent/10 text-center">
            <div className="text-3xl font-bold text-accent">{taskResults.length}</div>
            <div className="text-sm text-muted-foreground">Situazioni affrontate</div>
          </div>
        </div>
        <div className="space-y-2">
          {taskResults.map((result, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${result.choice.isCorrect ? "bg-primary/20" : "bg-accent/20"}`}>
                {result.choice.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                ) : (
                  <Lightbulb className="w-4 h-4 text-accent" />
                )}
              </div>
              <span className="text-sm flex-1">{result.task.title}</span>
              <span className="text-xs text-muted-foreground">{result.task.skill}</span>
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

      {/* Master Recommendation */}
      <Card className="p-6 bg-gradient-to-br from-primary/20 to-accent/10 border-2 border-primary/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/30 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Il Master consigliato per te</p>
            <h3 className="text-lg font-bold text-primary">{scenario.masterRecommendation.name}</h3>
          </div>
        </div>
        <p className="text-foreground leading-relaxed mb-4">
          {scenario.masterRecommendation.description}
        </p>
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
          {phase === "recap" && renderRecap()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SimulationView;
