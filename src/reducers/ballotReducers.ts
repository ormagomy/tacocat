import {Reducer} from 'react';
import {isAddBallotDoneAction, isDeleteBallotDoneAction, isEditBallotDoneAction, isFetchBallotsDoneAction, BallotsActions} from '../actions/ballotActions';
import {Ballot} from '../models/Ballots';

export const ballotsReducer: Reducer<Ballot[], BallotsActions> = (ballots = [], action) => {
    if (isDeleteBallotDoneAction(action)) {
        return ballots.filter((ballot) => ballot.id !== action.payload.ballotId);
    }

    if (isEditBallotDoneAction(action)) {
        const index = ballots.findIndex((item) => action.payload.ballot.id === item.id);
        const ballotsUpdate = ballots.concat(); // Clone the array
        ballotsUpdate.splice(index, 1, action.payload.ballot);
        return ballotsUpdate;
    }

    if (isAddBallotDoneAction(action)) {
        return [...ballots, {...action.payload.ballot}];
    }

    if (isFetchBallotsDoneAction(action)) {
        return action.payload.ballots;
    }

    return ballots;
};
