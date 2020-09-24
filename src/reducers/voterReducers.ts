import {Reducer} from 'react';
import {isFetchVotersDoneAction, VotersActions} from '../actions/voterActions';
import {Voter} from '../models/Voters';

export const votersReducer: Reducer<Voter[], VotersActions> = (voters = [], action) => {
    if (isFetchVotersDoneAction(action)) {
        return action.payload.voters;
    }

    return voters;
};
