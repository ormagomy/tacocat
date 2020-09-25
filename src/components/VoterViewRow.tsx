import React from 'react';
import {IconButton, TableRow, TableCell} from '@material-ui/core';
import {Delete, Edit} from '@material-ui/icons';

import {Voter} from '../models/Voters';

type VoterViewRowProps = {
    voter: Voter;
    onDeleteVoter: (id: number) => void;
    onEditVoter: (voter: Voter) => void;
};

export function VoterViewRow({voter, onDeleteVoter, onEditVoter}: VoterViewRowProps) {
    const deleteVoter = () => onDeleteVoter(voter.id);
    const editVoter = () => onEditVoter(voter);

    return (
        <TableRow>
            <TableCell>{voter.id}</TableCell>
            <TableCell>{voter.firstname}</TableCell>
            <TableCell>{voter.lastname}</TableCell>
            <TableCell>{voter.address}</TableCell>
            <TableCell>{voter.city}</TableCell>
            <TableCell>{voter.birthdate}</TableCell>
            <TableCell>{voter.email}</TableCell>
            <TableCell>{voter.phone}</TableCell>
            <TableCell>
                <IconButton onClick={editVoter}>
                    <Edit />
                </IconButton>
                <IconButton onClick={deleteVoter} color="secondary">
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
