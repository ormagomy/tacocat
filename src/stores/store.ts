import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {ballotsReducer} from '../reducers/ballotReducers';
import {electionsReducer} from '../reducers/electionReducers';
import {votersReducer, voterToEditReducer} from '../reducers/voterReducers';
import {votingScreenReducer} from '../reducers/votingScreenReducer';

export const store = createStore(
    combineReducers({
        voters: votersReducer,
        voterToEdit: voterToEditReducer,
        elections: electionsReducer,
        ballots: ballotsReducer,
        votingScreen: votingScreenReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);
