import {Action, Dispatch} from 'redux';
import {NewVoter, Voter} from '../models/Voters';

export const FETCH_VOTERS_BEGIN_ACTION = 'FETCH_VOTERS_BEGIN_ACTION';
export const FETCH_VOTERS_DONE_ACTION = 'FETCH_VOTERS_DONE_ACTION';
export const ADD_VOTER_BEGIN_ACTION = 'ADD_VOTER_BEGIN_ACTION';
export const ADD_VOTER_DONE_ACTION = 'ADD_VOTER_DONE_ACTION';
export const SAVE_VOTER_BEGIN_ACTION = 'SAVE_VOTER_BEGIN_ACTION';
export const SAVE_VOTER_DONE_ACTION = 'SAVE_VOTER_DONE_ACTION';
export const DELETE_VOTER_BEGIN_ACTION = 'DELETE_VOTER_BEGIN_ACTION';
export const DELETE_VOTER_DONE_ACTION = 'DELETE_VOTER_DONE_ACTION';
export const EDIT_VOTER_ACTION = 'EDIT_VOTER_ACTION';
export const CANCEL_EDIT_ACTION = 'CANCEL_EDIT_ACTION';

export type FetchVotersBeginAction = Action<string>;
export interface FetchVotersDoneAction extends Action<string> {
    payload: {voters: Voter[]};
}

export type AddVoterBeginAction = Action<string>;
export interface AddVoterDoneAction extends Action<string> {
    payload: {voter: Voter};
}

export type SaveVoterBeginAction = Action<string>;
export interface SaveVoterDoneAction extends Action<string> {
    payload: {voter: Voter};
}

export type DeleteVoterBeginAction = Action<string>;
export interface DeleteVoterDoneAction extends Action<string> {
    payload: {voterId: number};
}

export interface EditVoterAction extends Action<string> {
    payload: {voter: Voter};
}
export type CancelEditAction = Action<string>;

type CreateFetchVotersBeginAction = () => FetchVotersBeginAction;
type CreateFetchVotersDoneAction = (voters: Voter[]) => FetchVotersDoneAction;
type CreateAddVoterBeginAction = () => AddVoterBeginAction;
type CreateAddVoterDoneAction = (voter: Voter) => AddVoterDoneAction;
type CreateSaveVoterBeginAction = () => SaveVoterBeginAction;
type CreateSaveVoterDoneAction = (voter: Voter) => SaveVoterDoneAction;
type CreateDeleteVoterBeginAction = () => DeleteVoterBeginAction;
type CreateDeleteVoterDoneAction = (voterId: number) => DeleteVoterDoneAction;
type CreateEditVoterAction = (voter: Voter) => EditVoterAction;
type CreateCancelEditAction = () => CancelEditAction;
export type VotersActions = FetchVotersDoneAction | AddVoterDoneAction | SaveVoterDoneAction | DeleteVoterDoneAction | EditVoterAction | CancelEditAction;

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

export const createSaveVoterBeginAction: CreateSaveVoterBeginAction = () => ({
    type: SAVE_VOTER_BEGIN_ACTION,
});
export const createSaveVoterDoneAction: CreateSaveVoterDoneAction = (voter) => ({
    type: SAVE_VOTER_DONE_ACTION,
    payload: {voter},
});

export const createDeleteVoterBeginAction: CreateDeleteVoterBeginAction = () => ({
    type: DELETE_VOTER_BEGIN_ACTION,
});
export const createDeleteVoterDoneAction: CreateDeleteVoterDoneAction = (voterId) => ({
    type: DELETE_VOTER_DONE_ACTION,
    payload: {voterId},
});

export const createEditVoterAction: CreateEditVoterAction = (voter) => ({
    type: EDIT_VOTER_ACTION,
    payload: {voter},
});
export const createCancelEditAction: CreateCancelEditAction = () => ({
    type: CANCEL_EDIT_ACTION,
});

export function isFetchVotersDoneAction(action: Action<string>): action is FetchVotersDoneAction {
    return action.type === FETCH_VOTERS_DONE_ACTION;
}

export function isAddVoterDoneAction(action: Action<string>): action is AddVoterDoneAction {
    return action.type === ADD_VOTER_DONE_ACTION;
}

export function isSaveVoterDoneAction(action: Action<string>): action is SaveVoterDoneAction {
    return action.type === SAVE_VOTER_DONE_ACTION;
}

export function isDeleteVoterDoneAction(action: Action<string>): action is DeleteVoterDoneAction {
    return action.type === DELETE_VOTER_DONE_ACTION;
}

export function isEditVoterAction(action: Action<string>): action is EditVoterAction {
    return action.type === EDIT_VOTER_ACTION;
}
export function isCancelEditAction(action: Action<string>): action is CancelEditAction {
    return action.type === CANCEL_EDIT_ACTION;
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

export const saveVoter = (voter: Voter) => {
    return async (dispatch: Dispatch) => {
        dispatch(createSaveVoterBeginAction());
        await fetch(`http://localhost:3060/voters/${voter.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(voter),
        }).then((res) => res.json());
        dispatch(createSaveVoterDoneAction(voter));
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
