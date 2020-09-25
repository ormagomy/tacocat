import React, {useState} from 'react';
import {Button, Checkbox, FormControlLabel, Grid, List, ListItem} from '@material-ui/core';
import {Election} from '../models/Elections';
import {Voter} from '../models/Voters';
import {NewBallot, Vote} from '../models/Ballots';

type BallotProps = {
    voter: Voter;
    election: Election;
    onCastVote: (ballot: NewBallot) => void;
};
type Answer = {
    questionId: number;
    answer: boolean;
};
export function Ballot({voter, election, onCastVote}: BallotProps) {
    const [answers, setAnswers] = useState<Vote[]>(election.questions.map((question) => ({questionId: question.id, answer: false})));

    const answerQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        const questionId = Number(e.target.value);
        const index = answers.findIndex((answer) => answer.questionId === questionId);
        const newAnswers = [...answers];
        newAnswers[index] = {questionId: questionId, answer: e.target.checked};
        setAnswers(newAnswers);
    };

    const castVote = () => {
        onCastVote({electionId: election.id, voterId: voter.id, votes: answers});
    };

    return (
        <Grid container direction="column" alignItems="flex-start" spacing={3}>
            <Grid item>
                <h4>
                    Voter: {voter.firstname} {voter.lastname}
                </h4>
                <h4>Election: {election.name}</h4>
            </Grid>
            <Grid item>
                <List dense>
                    {election.questions.map((question) => (
                        <ListItem key={question.id}>
                            <FormControlLabel control={<Checkbox color="primary" value={question.id} onChange={answerQuestion} />} label={question.text} />
                        </ListItem>
                    ))}
                </List>
            </Grid>
            <Grid item>
                <Button variant="contained" onClick={castVote}>
                    Cast Vote
                </Button>
            </Grid>
        </Grid>
    );
}
