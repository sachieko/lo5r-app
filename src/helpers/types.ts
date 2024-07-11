export type Tchoice = {
  id: number;
  stat: string | null;
  choice: string | null;
  choiceInfo: string | null;
}

export type TQuestion = {
  title: string;
  info: string;
  detail: string;
  id: number;
  image: string | null;
  choices: Tchoice[];
}

export type TCard = {
  id: number;
  header: string;
  content: string;
}

export type TLore = {
  id: number;
  title: string;
  detail: string;
  image: string | null;
  cards: TCard[];
}

export type TRule = {
  id: number;
  title: string;
  category: string;
  detail: string;
  image: string | null;
  cards: TCard[];
}

export type TSearch = {
  link: string;
  title: string;
  detail: string;
}

export type TOpportunity = {
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

export type TTechOpportunity = {
  id: number;
  ring: string;
  category: string;
  cost: string;
  effect: string;
}

export type TTechnique = {
  id: number;
  name: string;
  prerequisite: string;
  rank: string;
  type: string;
  description: string;
  activation: string;
  effect: string;
  opportunities: TTechOpportunity[];
}

// Extends key of T creates a link between obj[key] and the key which is useful for row[column.key] later in the IDE
export type TableColumn<T, K extends keyof T> = {
  key: K;
  header: string;
};

export type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<TableColumn<T, K>>;
  rowClick?: (row: T) => void;
  selected?: number | null;
};

export type TCondition = {
  id: number;
  title: string;
  detail: string;
}