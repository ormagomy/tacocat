import {Action, Dispatch} from 'redux';
import {NewBallot, Ballot} from '../models/Ballots';

export const FETCH_BALLOTS_BEGIN_ACTION = 'FETCH_BALLOTS_BEGIN_ACTION';
export const FETCH_BALLOTS_DONE_ACTION = 'FETCH_BALLOTS_DONE_ACTION';
export const ADD_BALLOT_BEGIN_ACTION = 'ADD_BALLOT_BEGIN_ACTION';
export const ADD_BALLOT_DONE_ACTION = 'ADD_BALLOT_DONE_ACTION';
export const EDIT_BALLOT_BEGIN_ACTION = 'EDIT_BALLOT_BEGIN_ACTION';
export const EDIT_BALLOT_DONE_ACTION = 'EDIT_BALLOT_DONE_ACTION';
export const DELETE_BALLOT_BEGIN_ACTION = 'DELETE_BALLOT_BEGIN_ACTION';
export const DELETE_BALLOT_DONE_ACTION = 'DELETE_BALLOT_DONE_ACTION';

export type FetchBallotsBeginAction = Action<string>;
export interface FetchBallotsDoneAction extends Action<string> {
    payload: {ballots: Ballot[]};
}

export type AddBallotBeginAction = Action<string>;
export interface AddBallotDoneAction extends Action<string> {
    payload: {ballot: Ballot};
}

export type EditBallotBeginAction = Action<string>;
export interface EditBallotDoneAction extends Action<string> {
    payload: {ballot: Ballot};
}

export type DeleteBallotBeginAction = Action<string>;
export interface DeleteBallotDoneAction extends Action<string> {
    payload: {ballotId: number};
}

type CreateFetchBallotsBeginAction = () => FetchBallotsBeginAction;
type CreateFetchBallotsDoneAction = (ballots: Ballot[]) => FetchBallotsDoneAction;
type CreateAddBallotBeginAction = () => AddBallotBeginAction;
type CreateAddBallotDoneAction = (ballot: Ballot) => AddBallotDoneAction;
type CreateEditBallotBeginAction = () => EditBallotBeginAction;
type CreateEditBallotDoneAction = (ballot: Ballot) => EditBallotDoneAction;
type CreateDeleteBallotBeginAction = () => DeleteBallotBeginAction;
type CreateDeleteBallotDoneAction = (ballotId: number) => DeleteBallotDoneAction;
export type BallotsActions = FetchBallotsDoneAction | AddBallotDoneAction | EditBallotDoneAction | DeleteBallotDoneAction;

export const createFetchBallotsBeginAction: CreateFetchBallotsBeginAction = () => ({
    type: FETCH_BALLOTS_BEGIN_ACTION,
});
export const createFetchBallotsDoneAction: CreateFetchBallotsDoneAction = (ballots) => ({
    type: FETCH_BALLOTS_DONE_ACTION,
    payload: {ballots},
});

export const createAddBallotBeginAction: CreateAddBallotBeginAction = () => ({
    type: ADD_BALLOT_BEGIN_ACTION,
});
export const createAddBallotDoneAction: CreateAddBallotDoneAction = (ballot) => ({
    type: ADD_BALLOT_DONE_ACTION,
    payload: {ballot},
});

export const createEditBallotBeginAction: CreateEditBallotBeginAction = () => ({
    type: EDIT_BALLOT_BEGIN_ACTION,
});
export const createEditBallotDoneAction: CreateEditBallotDoneAction = (ballot) => ({
    type: EDIT_BALLOT_DONE_ACTION,
    payload: {ballot},
});

export const createDeleteBallotBeginAction: CreateDeleteBallotBeginAction = () => ({
    type: DELETE_BALLOT_BEGIN_ACTION,
});
export const createDeleteBallotDoneAction: CreateDeleteBallotDoneAction = (ballotId) => ({
    type: DELETE_BALLOT_DONE_ACTION,
    payload: {ballotId},
});

export function isFetchBallotsDoneAction(action: Action<string>): action is FetchBallotsDoneAction {
    return action.type === FETCH_BALLOTS_DONE_ACTION;
}

export function isAddBallotDoneAction(action: Action<string>): action is AddBallotDoneAction {
    return action.type === ADD_BALLOT_DONE_ACTION;
}

export function isEditBallotDoneAction(action: Action<string>): action is EditBallotDoneAction {
    return action.type === EDIT_BALLOT_DONE_ACTION;
}

export function isDeleteBallotDoneAction(action: Action<string>): action is DeleteBallotDoneAction {
    return action.type === DELETE_BALLOT_DONE_ACTION;
}

export const fetchBallots = () => {
    return async (dispatch: Dispatch) => {
        dispatch(createFetchBallotsBeginAction());
        const ballots = await fetch('http://localhost:3060/ballots').then((res) => res.json());
        dispatch(createFetchBallotsDoneAction(ballots));
    };
};

export const addBallot = (newBallot: NewBallot) => {
    return async (dispatch: Dispatch) => {
        dispatch(createAddBallotBeginAction());
        const ballot = await fetch('http://localhost:3060/ballots', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBallot),
        }).then((res) => res.json());
        dispatch(createAddBallotDoneAction(ballot));
    };
};

export const editBallot = (ballot: Ballot) => {
    return async (dispatch: Dispatch) => {
        dispatch(createEditBallotBeginAction());
        await fetch(`http://localhost:3060/ballots/${ballot.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(ballot),
        }).then((res) => res.json());
        dispatch(createEditBallotDoneAction(ballot));
    };
};

export const deleteBallot = (ballotId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(createDeleteBallotBeginAction());
        await fetch(`http://localhost:3060/ballots/${ballotId}`, {
            method: 'DELETE',
        });
        dispatch(createDeleteBallotDoneAction(ballotId));
    };
};
