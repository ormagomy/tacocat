import {Reducer} from 'react';
import {isAddElectionDoneAction, isDeleteElectionDoneAction, isEditElectionDoneAction, isFetchElectionsDoneAction, ElectionsActions} from '../actions/electionActions';
import {Election} from '../models/Elections';

export const electionsReducer: Reducer<Election[], ElectionsActions> = (elections = [], action) => {
    if (isDeleteElectionDoneAction(action)) {
        return elections.filter((election) => election.id !== action.payload.electionId);
    }

    if (isEditElectionDoneAction(action)) {
        const index = elections.findIndex((item) => action.payload.election.id === item.id);
        const electionsUpdate = elections.concat(); // Clone the array
        electionsUpdate.splice(index, 1, action.payload.election);
        return electionsUpdate;
    }

    if (isAddElectionDoneAction(action)) {
        return [...elections, {...action.payload.election}];
    }

    if (isFetchElectionsDoneAction(action)) {
        return action.payload.elections;
    }

    return elections;
};
