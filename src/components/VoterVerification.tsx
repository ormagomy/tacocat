import React, {useState} from 'react';

type VoterVerificationProps = {
    onSubmit: (voterId: number) => void;
};
export function VoterVerification({onSubmit}: VoterVerificationProps) {
    const [voterId, setVoterId] = useState<number | null>(null);

    return (
        <>
            <span>Enter voter id: </span>
            <input type="number" value={voterId || ''} onChange={(e) => setVoterId(e.target.valueAsNumber)} />
            <button onClick={() => onSubmit(voterId!)}>Submit</button>
        </>
    );
}
