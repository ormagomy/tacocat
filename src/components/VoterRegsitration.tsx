import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '@material-ui/core/Button';
import {addVoter, deleteVoter, editVoter, fetchVoters} from '../actions/voterActions';
import {AppState} from '../models/AppState';
import {Voter} from '../models/Voters';

import {VoterForm} from './VoterForm';
import {VoterTable} from './VoterTable';

export function VoterRegsitration() {
    const [displayVoters, setDisplay] = useState(false);

    const dispatch = useDispatch();
    const voters = useSelector<AppState, Voter[]>((state) => state.voters);

    const boundActions = bindActionCreators(
        {
            onAddVoter: addVoter,
            onEditVoter: editVoter,
            onDeleteVoter: deleteVoter,
        },
        dispatch
    );

    // Fetch the initial list of voters
    useEffect(() => {
        dispatch(fetchVoters());
    }, [dispatch]);

    const display = () => {
        return setDisplay(!displayVoters);
    };

    const divStyle = {
        backgroundColor: '#fff5d7',
    };

    return (
        <div style={divStyle}>
            <h2> Welcome to Voter Registration</h2>

            <VoterForm buttonText="Complete Registration" {...boundActions} />
            <br></br>
            <Button size="small" variant="contained" onClick={display}>
                Display List of Voters
            </Button>
            {displayVoters && <VoterTable voters={voters} />}
        </div>
    );
}
