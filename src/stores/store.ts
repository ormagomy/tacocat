import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {votersReducer} from '../reducers/voterReducers';

export const store = createStore(
    combineReducers({
        voters: votersReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);
