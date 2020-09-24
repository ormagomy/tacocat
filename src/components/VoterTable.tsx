import React from 'react';
import {Voter} from '../models/Voters';

export type voterProps = {
    voters: Voter[];
};

export function VoterTable(props: voterProps) {
    return (
        <>
            <h3> Here is the current list of Voters</h3>

            <table>
                <thead>
                    <tr>
                        <th>VoterId</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>Birthdata</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {props.voters.map((voter) => (
                        <tr key={voter.id}>
                            <td>{voter.id}</td>
                            <td>{voter.firstname}</td>
                            <td>{voter.lastname}</td>
                            <td>{voter.address}</td>
                            <td>{voter.city}</td>
                            <td>{voter.birthdate}</td>
                            <td>{voter.email}</td>
                            <td>{voter.phone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
