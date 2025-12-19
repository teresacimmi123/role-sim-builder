export interface UserProfile {
  background: string;
  digitalArea: string;
  interests: string;
}

export interface TaskChoice {
  id: string;
  text: string;
  isCorrect?: boolean;
  feedback: string;
}

export interface TechnicalTerm {
  term: string;
  explanation: string;
}

export interface Task {
  id: number;
  title: string;
  context: string;
  challenge: string;
  choices: TaskChoice[];
  skill: string;
  lesson: string;
  technicalTerms?: TechnicalTerm[];
}

export interface SimulationChoice {
  id: string;
  text: string;
  outcome: string;
}

export interface MasterRecommendation {
  name: string;
  description: string;
  url: string;
}

export interface SimulationScenario {
  role: string;
  roleExplanation: string;
  morningIntro: string;
  tasks: Task[];
  finalScenario: {
    context: string;
    situation: string;
    choices: SimulationChoice[];
  };
  conclusion: string;
  encouragement: string;
  masterRecommendation: MasterRecommendation;
}
