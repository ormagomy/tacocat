import {Action, Dispatch} from 'redux';
import {NewVoter, Voter} from '../models/Voters';

export const FETCH_VOTERS_BEGIN_ACTION = 'FETCH_VOTERS_BEGIN_ACTION';
export const FETCH_VOTERS_DONE_ACTION = 'FETCH_VOTERS_DONE_ACTION';
export const ADD_VOTER_BEGIN_ACTION = 'ADD_VOTER_BEGIN_ACTION';
export const ADD_VOTER_DONE_ACTION = 'ADD_VOTER_DONE_ACTION';
export const EDIT_VOTER_BEGIN_ACTION = 'EDIT_VOTER_BEGIN_ACTION';
export const EDIT_VOTER_DONE_ACTION = 'EDIT_VOTER_DONE_ACTION';
export const DELETE_VOTER_BEGIN_ACTION = 'DELETE_VOTER_BEGIN_ACTION';
export const DELETE_VOTER_DONE_ACTION = 'DELETE_VOTER_DONE_ACTION';

export type FetchVotersBeginAction = Action<string>;
export interface FetchVotersDoneAction extends Action<string> {
    payload: {voters: Voter[]};
}

export type AddVoterBeginAction = Action<string>;
export interface AddVoterDoneAction extends Action<string> {
    payload: {voter: Voter};
}

export type EditVoterBeginAction = Action<string>;
export interface EditVoterDoneAction extends Action<string> {
    payload: {voter: Voter};
}

export type DeleteVoterBeginAction = Action<string>;
export interface DeleteVoterDoneAction extends Action<string> {
    payload: {voterId: number};
}

type CreateFetchVotersBeginAction = () => FetchVotersBeginAction;
type CreateFetchVotersDoneAction = (voters: Voter[]) => FetchVotersDoneAction;
type CreateAddVoterBeginAction = () => AddVoterBeginAction;
type CreateAddVoterDoneAction = (voter: Voter) => AddVoterDoneAction;
type CreateEditVoterBeginAction = () => EditVoterBeginAction;
type CreateEditVoterDoneAction = (voter: Voter) => EditVoterDoneAction;
type CreateDeleteVoterBeginAction = () => DeleteVoterBeginAction;
type CreateDeleteVoterDoneAction = (voterId: number) => DeleteVoterDoneAction;
export type VotersActions = FetchVotersDoneAction | AddVoterDoneAction | EditVoterDoneAction | DeleteVoterDoneAction;

export const createFetchVotersBeginAction: CreateFetchVotersBeginAction = () => ({
    type: FETCH_VOTERS_BEGIN_ACTION,
});
export const createFetchVotersDoneAction: CreateFetchVotersDoneAction = (voters) => ({
    type: FETCH_VOTERS_DONE_ACTION,
    payload: {voters},
});

export const createAddVoterBeginAction: CreateAddVoterBeginAction = () => ({
    type: ADD_VOTER_BEGIN_ACTION,
});
export const createAddVoterDoneAction: CreateAddVoterDoneAction = (voter) => ({
    type: ADD_VOTER_DONE_ACTION,
    payload: {voter},
});

export const createEditVoterBeginAction: CreateEditVoterBeginAction = () => ({
    type: EDIT_VOTER_BEGIN_ACTION,
});
export const createEditVoterDoneAction: CreateEditVoterDoneAction = (voter) => ({
    type: EDIT_VOTER_DONE_ACTION,
    payload: {voter},
});

export const createDeleteVoterBeginAction: CreateDeleteVoterBeginAction = () => ({
    type: DELETE_VOTER_BEGIN_ACTION,
});
export const createDeleteVoterDoneAction: CreateDeleteVoterDoneAction = (voterId) => ({
    type: DELETE_VOTER_DONE_ACTION,
    payload: {voterId},
});

export function isFetchVotersDoneAction(action: Action<string>): action is FetchVotersDoneAction {
    return action.type === FETCH_VOTERS_DONE_ACTION;
}

export function isAddVoterDoneAction(action: Action<string>): action is AddVoterDoneAction {
    return action.type === ADD_VOTER_DONE_ACTION;
}

export function isEditVoterDoneAction(action: Action<string>): action is EditVoterDoneAction {
    return action.type === EDIT_VOTER_DONE_ACTION;
}

export function isDeleteVoterDoneAction(action: Action<string>): action is DeleteVoterDoneAction {
    return action.type === DELETE_VOTER_DONE_ACTION;
}

export const fetchVoters = () => {
    return async (dispatch: Dispatch) => {
        dispatch(createFetchVotersBeginAction());
        const voters = await fetch('http://localhost:3060/voters').then((res) => res.json());
        dispatch(createFetchVotersDoneAction(voters));
    };
};

export const addVoter = (newVoter: NewVoter) => {
    return async (dispatch: Dispatch) => {
        dispatch(createAddVoterBeginAction());
        const voter = await fetch('http://localhost:3060/voters', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newVoter),
        }).then((res) => res.json());
        dispatch(createAddVoterDoneAction(voter));
    };
};

export const editVoter = (voter: Voter) => {
    return async (dispatch: Dispatch) => {
        dispatch(createEditVoterBeginAction());
        await fetch(`http://localhost:3060/voters/${voter.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(voter),
        }).then((res) => res.json());
        dispatch(createEditVoterDoneAction(voter));
    };
};

export const deleteVoter = (voterId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(createDeleteVoterBeginAction());
        await fetch(`http://localhost:3060/voters/${voterId}`, {
            method: 'DELETE',
        });
        dispatch(createDeleteVoterDoneAction(voterId));
    };
};
