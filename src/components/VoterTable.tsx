import React, {useState} from 'react';
import {Voter} from '../models/Voters';

import {Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel, makeStyles} from '@material-ui/core';
//Sorting Stuff
type orderType = 'asc' | 'desc' | undefined;

function descendingComparator(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order: orderType, orderBy: string) {
    return order === 'desc' ? (a: any, b: any) => descendingComparator(a, b, orderBy) : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function stableSort(voters: Voter[], comparator: (a: Voter, b: Voter) => number) {
    const stabilizedThis = voters.map((voter, index) => {
        return {voter, index};
    });
    stabilizedThis.sort((a, b) => {
        const order = comparator(a.voter, b.voter);
        if (order !== 0) return order;
        return a.index - b.index;
    });
    return stabilizedThis.map((el) => el.voter);
}
//End Sorting Stuff

export type voterProps = {
    voters: Voter[];
};
const headCells = [
    {id: 'id', label: 'VoterId'},
    {id: 'firstname', label: 'First Name'},
    {id: 'lastname', label: 'Last Name'},
    {id: 'address', label: 'Address'},
    {id: 'city', label: 'City'},
    {id: 'birthdate', label: 'Birthdate'},
    {id: 'email', label: 'Email'},
    {id: 'phone', label: 'Phone'},
];

export function VoterTable(props: voterProps) {
    const [orderBy, setOrderBy] = useState(headCells[0].id);

    const [order, setOrder] = useState<orderType>('asc');

    const handleSort = (id: string) => {
        if (id === 'actions') {
            return;
        }
        const isAsc = orderBy === id && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
    };

    const useStyles = makeStyles({
        h3: {
            'background-color': '#e6ffe6', //green
        },

        tbody: {
            'background-color': '#ffffe6', //yellow
        },
        thead: {
            // 'background-color': '#ff9999', //red
            'background-color': 'blue', //red
        },
    });

    const classes = useStyles();

    return (
        <>
            <h3 className={classes.h3}> Here is the current list of Voters</h3>

            <Table>
                <TableHead className={classes.thead}>
                    <TableRow>
                        {headCells.map((headCell) =>
                            headCell.id !== 'actions' ? (
                                <TableCell key={headCell.id}>
                                    <TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={() => handleSort(headCell.id)}>
                                        {headCell.label}
                                    </TableSortLabel>
                                </TableCell>
                            ) : (
                                <TableCell key={headCell.id}>{headCell.label}</TableCell>
                            )
                        )}
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tbody}>
                    {stableSort(props.voters, getComparator(order, orderBy)).map((voter) => (
                        <TableRow key={voter.id}>
                            <TableCell>{voter.id}</TableCell>
                            <TableCell>{voter.firstname}</TableCell>
                            <TableCell>{voter.lastname}</TableCell>
                            <TableCell>{voter.address}</TableCell>
                            <TableCell>{voter.city}</TableCell>
                            <TableCell>{voter.birthdate}</TableCell>
                            <TableCell>{voter.email}</TableCell>
                            <TableCell>{voter.phone}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}
