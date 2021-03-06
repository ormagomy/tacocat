import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button} from '@material-ui/core';
import {addVoter, deleteVoter, saveVoter, fetchVoters, createCancelEditAction, createEditVoterAction} from '../actions/voterActions';
import {AppState} from '../models/AppState';
import {NewVoter, Voter} from '../models/Voters';

import {VoterForm} from './VoterForm';
import {VoterTable} from './VoterTable';

export function VoterRegsitration() {
    const [displayVoters, setDisplayVoters] = useState(false);
    const [displayRegistration, setDisplayRegistration] = useState(false);

    const dispatch = useDispatch();
    const voters = useSelector<AppState, Voter[]>((state) => state.voters);
    const voterToEdit = useSelector<AppState, Voter>((state) => state.voterToEdit);

    const boundActions = bindActionCreators(
        {
            onAddVoter: addVoter,
            onSaveVoter: saveVoter,
            onEditVoter: createEditVoterAction,
            onCancelEdit: createCancelEditAction,
            onDeleteVoter: deleteVoter,
        },
        dispatch
    );

    const onAddVoter = (voter: NewVoter) => {
        boundActions.onAddVoter(voter);
        setDisplayRegistration(false);
    };

    // Fetch the initial list of voters
    useEffect(() => {
        dispatch(fetchVoters());
    }, [dispatch]);

    return (
        <div>
            <h2>Voter Registration</h2>

            <Button
                variant="contained"
                onClick={() => {
                    setDisplayRegistration(!displayRegistration);
                    setDisplayVoters(false);
                }}
            >
                {displayRegistration ? 'Close Registration' : 'Register Voter'}
            </Button>
            {displayRegistration && <VoterForm buttonText="Complete Registration" {...boundActions} onAddVoter={onAddVoter} />}

            <br />
            <br />

            {!displayRegistration && (
                <Button variant="contained" onClick={() => setDisplayVoters(!displayVoters)}>
                    {displayVoters ? 'Hide' : 'Display'} Voters
                </Button>
            )}
            {displayVoters && <VoterTable voters={voters} voterToEdit={voterToEdit} {...boundActions} />}
        </div>
    );
}
