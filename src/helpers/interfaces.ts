export interface Ichoice {
  id: number;
  stat: string | null;
  choice: string | null;
  choiceInfo: string | null;
};

export interface IQuestion {
  title: string;
  info: string;
  detail: string;
  id: number;
  image: string | null;
  choices: Ichoice[];
};

export interface Icard {
  id: number;
  header: string;
  content: string;
};

export interface ILore {
  id: number;
  title: string;
  detail: string;
  image: string | null;
  cards: Icard[];
};

export interface IRule {
  id: number;
  title: string;
  category: string;
  detail: string;
  image: string | null;
  cards: Icard[];
};

export interface ISearch {
  link: string;
  title: string;
  detail: string;
};

export interface ITechnique {
  id: number;
  name: string;
  prerequisite: string;
  rank: string;
  type: string;
  description: string;
  activation: string;
  effect: string;
};

export interface IOpportunity {
  id: number;
  technique_id: number;
  ring: string;
  category: string;
  cost: string;
  effect: string;
  name: string;
  prerequisite: string;
  rank: string;
  type: string;
  description: string;
  activation: string;
  technique_effect: string;
};
