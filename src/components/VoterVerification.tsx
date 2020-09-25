import React, {useState} from 'react';
import {Button} from '@material-ui/core';

type VoterVerificationProps = {
    onSubmit: (voterId: number) => void;
};
export function VoterVerification({onSubmit}: VoterVerificationProps) {
    const [voterId, setVoterId] = useState<number | null>(null);

    return (
        <>
            <span>Enter voter id: </span>
            <input type="number" value={voterId || ''} onChange={(e) => setVoterId(e.target.valueAsNumber)} />
            <Button variant="contained" onClick={() => onSubmit(voterId!)}>
                Submit
            </Button>
        </>
    );
}
