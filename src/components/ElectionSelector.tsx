import React, {useState} from 'react';
import {Select, MenuItem, Button} from '@material-ui/core';
import {Election} from '../models/Elections';

type ElectionSelectorProps = {
    elections: Election[];
    onSelect: (electionId: number) => void;
};
export function ElectionSelector({elections, onSelect}: ElectionSelectorProps) {
    const [selectedElection, setSelectedElection] = useState<string>('1');

    return (
        <>
            <span>Select a ballot: </span>
            <Select onChange={(e) => setSelectedElection(e.target.value as string)} value={selectedElection}>
                {elections.map((election) => (
                    <MenuItem key={election.id} value={election.id}>
                        {election.name}
                    </MenuItem>
                ))}
            </Select>
            <Button variant="contained" onClick={() => onSelect(Number(selectedElection))}>
                Vote
            </Button>
        </>
    );
}
