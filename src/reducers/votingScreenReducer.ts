import {Reducer} from 'react';
import {combineReducers} from 'redux';
import {isAlreadyVotedAction, isSelectedElectionAction, isVerifyVoterAction, VotingScreen, VotingScreenActions} from '../actions/votingScreenActions';
import {Election} from '../models/Elections';
import {Voter} from '../models/Voters';

export const screenReducer: Reducer<VotingScreen, VotingScreenActions> = (screen = VotingScreen.CHOOSE_ELECTION, action) => {
    if (isSelectedElectionAction(action)) {
        return VotingScreen.ENTER_VOTER_INFORMATION;
    }

    if (isAlreadyVotedAction(action)) {
        if (action.payload.value) {
            return VotingScreen.ENTER_VOTER_INFORMATION;
        }
        return VotingScreen.BALLOT;
    }

    return screen;
};

export const voterErrorReducer: Reducer<string, VotingScreenActions> = (voterError = '', action) => {
    if (isVerifyVoterAction(action)) {
        if (!action.payload.voter) {
            return 'Could not find voter with that voter ID';
        }
        return '';
    }

    if (isAlreadyVotedAction(action)) {
        return action.payload.value ? 'This voter has already cast a vote in the selected election' : '';
    }

    return voterError;
};

export const selectedElectionReducer: Reducer<Election | null, VotingScreenActions> = (election = null, action) => {
    if (isSelectedElectionAction(action)) {
        return action.payload.election;
    }

    return election;
};

export const voterReducer: Reducer<Voter | null, VotingScreenActions> = (voter = null, action) => {
    if (isVerifyVoterAction(action)) {
        return action.payload.voter || null;
    }

    return voter;
};

export const votingScreenReducer = combineReducers({
    screen: screenReducer,
    selectedElection: selectedElectionReducer,
    voterError: voterErrorReducer,
    voter: voterReducer,
});
