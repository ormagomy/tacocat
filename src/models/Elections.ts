export interface Question {
    id: number;
    text: string;
}

export interface Election {
    id: number;
    name: string;
    questions: Question[];
}

export type NewElection = Omit<Election, 'id'>;
