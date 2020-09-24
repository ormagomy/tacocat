import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchVoters} from '../actions/voterActions';
import {AppState} from '../models/AppState';
import {Voter} from '../models/Voters';

import {VoterForm} from './VoterForm';

export function VoterRegsitration() {
    const dispatch = useDispatch();
    const voters = useSelector<AppState, Voter[]>((state) => state.voters);

    useEffect(() => {
        dispatch(fetchVoters());
    }, [dispatch]);

    return (
        <div>
            <h2> Welcome to voter Registration</h2>

            <VoterForm />

            {/* <ViewVoter />  */}
        </div>
    );
}
