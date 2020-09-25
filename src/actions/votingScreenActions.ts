import {Action, Dispatch} from 'redux';
import {Election} from '../models/Elections';
import {Voter} from '../models/Voters';

export enum VotingScreen {
    CHOOSE_ELECTION,
    ENTER_VOTER_INFORMATION,
    BALLOT,
}

export const SELECTED_ELECTION_ACTION = 'SELECTED_ELECTION_ACTION';
export const VERIFY_VOTER_ACTION = 'VERIFY_VOTER_ACTION';
export const ALREADY_VOTED_ACTION = 'ALREADY_VOTED_ACTION';

export interface SelectedElectionAction extends Action<string> {
    payload: {election: Election};
}

export interface VerifyVoterAction extends Action<string> {
    payload: {voter?: Voter};
}

export interface AlreadyVotedAction extends Action<string> {
    payload: {value: boolean};
}

type CreateSelectedElectionAction = (election: Election) => SelectedElectionAction;
type CreateVerifyVoterAction = (voter?: Voter) => VerifyVoterAction;
type CreateAlreadyVotedAction = (value: boolean) => AlreadyVotedAction;
export type VotingScreenActions = SelectedElectionAction | VerifyVoterAction | AlreadyVotedAction;

export const createSelectedElectionAction: CreateSelectedElectionAction = (election) => ({
    type: SELECTED_ELECTION_ACTION,
    payload: {election},
});

export const createVerifyVoterAction: CreateVerifyVoterAction = (voter) => ({
    type: VERIFY_VOTER_ACTION,
    payload: {voter},
});

export const createAlreadyVotedAction: CreateAlreadyVotedAction = (value) => ({
    type: ALREADY_VOTED_ACTION,
    payload: {value},
});

export function isSelectedElectionAction(action: Action<string>): action is SelectedElectionAction {
    return action.type === SELECTED_ELECTION_ACTION;
}

export function isVerifyVoterAction(action: Action<string>): action is VerifyVoterAction {
    return action.type === VERIFY_VOTER_ACTION;
}

export function isAlreadyVotedAction(action: Action<string>): action is AlreadyVotedAction {
    return action.type === ALREADY_VOTED_ACTION;
}

export const verifyVoter = (voter: Voter | undefined, election: Election) => {
    return async (dispatch: Dispatch) => {
        dispatch(createVerifyVoterAction(voter));
        if (!voter) {
            return;
        }
        const existingBallots = await fetch(`http://localhost:3060/ballots?voterId=${voter.id}&electionId=${election.id}`).then((res) => res.json());
        dispatch(createAlreadyVotedAction(existingBallots.length > 0));
    };
};
