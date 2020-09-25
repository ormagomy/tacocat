import React, {useState} from 'react';
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
            <select onChange={(e) => setSelectedElection(e.target.value)} value={selectedElection}>
                {elections.map((election) => (
                    <option key={election.id} value={election.id}>
                        {election.name}
                    </option>
                ))}
            </select>
            <button onClick={() => onSelect(Number(selectedElection))}>Vote</button>
        </>
    );
}
