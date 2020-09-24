import {Action, Dispatch} from 'redux';
import {NewElection, Election} from '../models/Elections';

export const FETCH_ELECTIONS_BEGIN_ACTION = 'FETCH_ELECTIONS_BEGIN_ACTION';
export const FETCH_ELECTIONS_DONE_ACTION = 'FETCH_ELECTIONS_DONE_ACTION';
export const ADD_ELECTION_BEGIN_ACTION = 'ADD_ELECTION_BEGIN_ACTION';
export const ADD_ELECTION_DONE_ACTION = 'ADD_ELECTION_DONE_ACTION';
export const EDIT_ELECTION_BEGIN_ACTION = 'EDIT_ELECTION_BEGIN_ACTION';
export const EDIT_ELECTION_DONE_ACTION = 'EDIT_ELECTION_DONE_ACTION';
export const DELETE_ELECTION_BEGIN_ACTION = 'DELETE_ELECTION_BEGIN_ACTION';
export const DELETE_ELECTION_DONE_ACTION = 'DELETE_ELECTION_DONE_ACTION';

export type FetchElectionsBeginAction = Action<string>;
export interface FetchElectionsDoneAction extends Action<string> {
    payload: {elections: Election[]};
}

export type AddElectionBeginAction = Action<string>;
export interface AddElectionDoneAction extends Action<string> {
    payload: {election: Election};
}

export type EditElectionBeginAction = Action<string>;
export interface EditElectionDoneAction extends Action<string> {
    payload: {election: Election};
}

export type DeleteElectionBeginAction = Action<string>;
export interface DeleteElectionDoneAction extends Action<string> {
    payload: {electionId: number};
}

type CreateFetchElectionsBeginAction = () => FetchElectionsBeginAction;
type CreateFetchElectionsDoneAction = (elections: Election[]) => FetchElectionsDoneAction;
type CreateAddElectionBeginAction = () => AddElectionBeginAction;
type CreateAddElectionDoneAction = (election: Election) => AddElectionDoneAction;
type CreateEditElectionBeginAction = () => EditElectionBeginAction;
type CreateEditElectionDoneAction = (election: Election) => EditElectionDoneAction;
type CreateDeleteElectionBeginAction = () => DeleteElectionBeginAction;
type CreateDeleteElectionDoneAction = (electionId: number) => DeleteElectionDoneAction;
export type ElectionsActions = FetchElectionsDoneAction | AddElectionDoneAction;

export const createFetchElectionsBeginAction: CreateFetchElectionsBeginAction = () => ({
    type: FETCH_ELECTIONS_BEGIN_ACTION,
});
export const createFetchElectionsDoneAction: CreateFetchElectionsDoneAction = (elections) => ({
    type: FETCH_ELECTIONS_DONE_ACTION,
    payload: {elections},
});

export const createAddElectionBeginAction: CreateAddElectionBeginAction = () => ({
    type: ADD_ELECTION_BEGIN_ACTION,
});
export const createAddElectionDoneAction: CreateAddElectionDoneAction = (election) => ({
    type: ADD_ELECTION_DONE_ACTION,
    payload: {election},
});

export const createEditElectionBeginAction: CreateEditElectionBeginAction = () => ({
    type: EDIT_ELECTION_BEGIN_ACTION,
});
export const createEditElectionDoneAction: CreateEditElectionDoneAction = (election) => ({
    type: EDIT_ELECTION_DONE_ACTION,
    payload: {election},
});

export const createDeleteElectionBeginAction: CreateDeleteElectionBeginAction = () => ({
    type: DELETE_ELECTION_BEGIN_ACTION,
});
export const createDeleteElectionDoneAction: CreateDeleteElectionDoneAction = (electionId) => ({
    type: DELETE_ELECTION_DONE_ACTION,
    payload: {electionId},
});

export function isFetchElectionsDoneAction(action: Action<string>): action is FetchElectionsDoneAction {
    return action.type === FETCH_ELECTIONS_DONE_ACTION;
}

export function isAddElectionDoneAction(action: Action<string>): action is AddElectionDoneAction {
    return action.type === ADD_ELECTION_DONE_ACTION;
}

export function isEditElectionDoneAction(action: Action<string>): action is EditElectionDoneAction {
    return action.type === EDIT_ELECTION_DONE_ACTION;
}

export function isDeleteElectionDoneAction(action: Action<string>): action is DeleteElectionDoneAction {
    return action.type === DELETE_ELECTION_DONE_ACTION;
}

export const fetchElections = () => {
    return async (dispatch: Dispatch) => {
        dispatch(createFetchElectionsBeginAction());
        const elections = await fetch('http://localhost:3060/elections').then((res) => res.json());
        dispatch(createFetchElectionsDoneAction(elections));
    };
};

export const addElection = (newElection: NewElection) => {
    return async (dispatch: Dispatch) => {
        dispatch(createAddElectionBeginAction());
        const election = await fetch('http://localhost:3060/elections', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newElection),
        }).then((res) => res.json());
        dispatch(createAddElectionDoneAction(election));
    };
};

export const editElection = (election: Election) => {
    return async (dispatch: Dispatch) => {
        dispatch(createEditElectionBeginAction());
        await fetch(`http://localhost:3060/elections/${election.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(election),
        }).then((res) => res.json());
        dispatch(createEditElectionDoneAction(election));
    };
};

export const deleteElection = (electionId: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(createDeleteElectionBeginAction());
        await fetch(`http://localhost:3060/elections/${electionId}`, {
            method: 'DELETE',
        });
        dispatch(createDeleteElectionDoneAction(electionId));
    };
};
