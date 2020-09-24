import {Action, Dispatch} from 'redux';
import {Voter} from '../models/Voters';

export const FETCH_VOTERS_DONE_ACTION = 'FETCH_VOTERS_DONE_ACTION';

export interface FetchVotersDoneAction extends Action<string> {
    payload: {voters: Voter[]};
}

type CreateFetchVotersDoneAction = (voters: Voter[]) => FetchVotersDoneAction;

export const createFetchVotersDoneAction: CreateFetchVotersDoneAction = (voters) => ({
    type: FETCH_VOTERS_DONE_ACTION,
    payload: {voters},
});

export function isFetchVotersDoneAction(action: Action<string>): action is FetchVotersDoneAction {
    return action.type === FETCH_VOTERS_DONE_ACTION;
}

export const fetchVoters = () => {
    return async (dispatch: Dispatch) => {
        const voters = await fetch('http://localhost:3060/voters').then((res) => res.json());
        dispatch(createFetchVotersDoneAction(voters));
    };
};

export type VotersActions = FetchVotersDoneAction;
