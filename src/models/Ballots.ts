export interface Vote {
    questionId: number;
    answer: boolean;
}

export interface Ballot {
    id: number;
    voterId: number;
    electionId: number;
    votes: Vote[];
}

export type NewBallot = Omit<Ballot, 'id'>;
