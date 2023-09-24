export type Ichoice = {
  id: number;
  stat: string | null;
  choice: string | null;
  choiceInfo: string | null;
}

export type IQuestion = {
  title: string;
  info: string;
  detail: string;
  id: number;
  image: string | null;
  choices: Ichoice[];
}

export type Icard = {
  id: number;
  header: string;
  content: string;
}

export type ILore = {
  id: number;
  title: string;
  detail: string;
  image: string | null;
  cards: Icard[];
}

export type IRule = {
  id: number;
  title: string;
  category: string;
  detail: string;
  image: string | null;
  cards: Icard[];
}

export type ISearch = {
  link: string;
  title: string;
  detail: string;
}

export type IOpportunity = {
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
}

type ITechOpportunity = {
  id: number;
  ring: string;
  category: string;
  cost: string;
  effect: string;
}

export type ITechnique = {
  id: number;
  name: string;
  prerequisite: string;
  rank: string;
  type: string;
  description: string;
  activation: string;
  effect: string;
  opportunities: ITechOpportunity[];
}
