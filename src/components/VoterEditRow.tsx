import React from 'react';
import {IconButton, TableRow, TableCell, TextField} from '@material-ui/core';
import {Save, Cancel} from '@material-ui/icons';

import {Voter} from '../models/Voters';
import {useForm} from '../hooks/useForm';

type VoterEditRowProps = {
    voter: Voter;
    onCancel: () => void;
    onSave: (voter: Voter) => void;
};

export function VoterEditRow({voter, onCancel, onSave}: VoterEditRowProps) {
    const [voterForm, updateVoterForm] = useForm(voter);

    const cancel = () => onCancel();

    const save = () => {
        onSave({
            ...voterForm,
        });
    };

    return (
        <TableRow>
            <TableCell>{voter.id}</TableCell>

            <TableCell>
                <TextField name="firstname" value={voterForm.firstname} onChange={updateVoterForm} />
            </TableCell>
            <TableCell>
                <TextField name="lastname" value={voterForm.lastname} onChange={updateVoterForm} />
            </TableCell>
            <TableCell>
                <TextField name="address" value={voterForm.address} onChange={updateVoterForm} />
            </TableCell>
            <TableCell>
                <TextField name="city" value={voterForm.city} onChange={updateVoterForm} />
            </TableCell>
            <TableCell>
                <TextField name="birthdate" value={voterForm.birthdate} onChange={updateVoterForm} />
            </TableCell>
            <TableCell>
                <TextField name="email" value={voterForm.email} onChange={updateVoterForm} />
            </TableCell>
            <TableCell>
                <TextField name="phone" value={voterForm.phone} onChange={updateVoterForm} />
            </TableCell>

            <TableCell>
                <IconButton onClick={save}>
                    <Save />
                </IconButton>
                <IconButton onClick={cancel}>
                    <Cancel />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
