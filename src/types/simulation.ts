export interface UserProfile {
  background: string;
  digitalArea: string;
  interests: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  skill: string;
  purpose: string;
  isCompleted: boolean;
}

export interface SimulationChoice {
  id: string;
  text: string;
  outcome: string;
}

export interface SimulationScenario {
  role: string;
  roleExplanation: string;
  morningIntro: string;
  tasks: Task[];
  interactiveScenario: {
    context: string;
    situation: string;
    choices: SimulationChoice[];
  };
  conclusion: string;
  encouragement: string;
}
