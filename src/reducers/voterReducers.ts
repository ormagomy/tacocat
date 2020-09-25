import {Reducer} from 'react';
import {
    isAddVoterDoneAction,
    isDeleteVoterDoneAction,
    isSaveVoterDoneAction,
    isFetchVotersDoneAction,
    VotersActions,
    isEditVoterAction,
    isCancelEditAction,
} from '../actions/voterActions';
import {Voter} from '../models/Voters';

export const votersReducer: Reducer<Voter[], VotersActions> = (voters = [], action) => {
    if (isDeleteVoterDoneAction(action)) {
        return voters.filter((voter) => voter.id !== action.payload.voterId);
    }

    if (isSaveVoterDoneAction(action)) {
        const index = voters.findIndex((item) => action.payload.voter.id === item.id);
        const votersUpdate = voters.concat(); // Clone the array
        votersUpdate.splice(index, 1, action.payload.voter);
        return votersUpdate;
    }

    if (isAddVoterDoneAction(action)) {
        return [...voters, {...action.payload.voter}];
    }

    if (isFetchVotersDoneAction(action)) {
        return action.payload.voters;
    }

    return voters;
};

export const voterToEditReducer: Reducer<Voter | null, VotersActions> = (voterToEdit = null, action) => {
    if (isEditVoterAction(action)) {
        return action.payload.voter;
    }

    if (isCancelEditAction(action)) {
        return null;
    }

    return voterToEdit;
};
