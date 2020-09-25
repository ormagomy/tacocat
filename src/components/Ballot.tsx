import React from 'react';
import {Election} from '../models/Elections';
import {Voter} from '../models/Voters';

type BallotProps = {
    voter: Voter;
    election: Election;
};
export function Ballot({voter, election}: BallotProps) {
    return (
        <>
            <div>
                Vote now {voter.firstname} {voter.lastname}
            </div>
            <h4>Election: {election.name}</h4>
            <ul>
                {election.questions.map((question) => (
                    <li>{question.text}</li>
                ))}
            </ul>
        </>
    );
}
