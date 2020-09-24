import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchVoters} from '../actions/voterActions';
import {AppState} from '../models/AppState';
import {Voter} from '../models/Voters';

import {VoterForm} from './VoterForm';
import {VoterTable} from './VoterTable';

export function VoterRegsitration() {
    const [displayVoters, setDisplay] = useState(false);

    const dispatch = useDispatch();
    const voters = useSelector<AppState, Voter[]>((state) => state.voters);

    useEffect(() => {
        dispatch(fetchVoters());
    }, [dispatch]);

    const display = () => {
        return setDisplay(!displayVoters);
    };

    return (
        <>
            <h2> Welcome to voter Registration</h2>
            <VoterForm />

            <button onClick={display}>Display Lsit of Voters</button>
            {displayVoters && <VoterTable voters={voters} />}
        </>
    );
}
