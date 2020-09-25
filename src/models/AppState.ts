import {VotingScreen} from '../actions/votingScreenActions';
import {Ballot} from './Ballots';
import {Election} from './Elections';
import {Voter} from './Voters';

export type VotingScreenState = {
    screen: VotingScreen;
    selectedElection: Election;
    voterError: string;
    voter: Voter;
};

export type AppState = {
    voters: Voter[];
    elections: Election[];
    ballots: Ballot[];
    votingScreen: VotingScreenState;
};
