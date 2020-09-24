import {Ballot} from './Ballots';
import {Election} from './Elections';
import {Voter} from './Voters';

export type AppState = {
    voters: Voter[];
    elections: Election[];
    ballots: Ballot[];
};
