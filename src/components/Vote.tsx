import {Button} from '@material-ui/core';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchElections} from '../actions/electionActions';
import {fetchVoters} from '../actions/voterActions';
import {castVote, createReturnToMainAction, createSelectedElectionAction, verifyVoter, VotingScreen} from '../actions/votingScreenActions';
import {AppState, VotingScreenState} from '../models/AppState';
import {Election} from '../models/Elections';
import {Voter} from '../models/Voters';
import {Ballot} from './Ballot';
import {ElectionSelector} from './ElectionSelector';
import {VoterVerification} from './VoterVerification';

export function Vote() {
    const dispatch = useDispatch();
    const elections = useSelector<AppState, Election[]>((state) => state.elections);
    const voters = useSelector<AppState, Voter[]>((state) => state.voters);
    const votingScreen = useSelector<AppState, VotingScreenState>((state) => state.votingScreen);

    // Fetch the initial list of elections
    useEffect(() => {
        dispatch(fetchElections());
        dispatch(fetchVoters());
    }, [dispatch]);

    const boundActions = bindActionCreators(
        {
            onSelectedElection: createSelectedElectionAction,
            onVerifyVoter: verifyVoter,
            onCastVote: castVote,
            onReturnToMain: createReturnToMainAction,
        },
        dispatch
    );

    const selectElection = (electionId: number) => {
        const election = elections.find((election) => election.id === electionId) as Election;
        boundActions.onSelectedElection(election);
    };

    const verifyVoterId = (voterId: number) => {
        const voter = voters.find((voter) => voter.id === voterId);
        boundActions.onVerifyVoter(voter, votingScreen.selectedElection);
    };

    return (
        <div>
            <h2>VOTE</h2>
            {votingScreen.screen === VotingScreen.CHOOSE_ELECTION && <ElectionSelector elections={elections} onSelect={selectElection} />}
            {votingScreen.screen === VotingScreen.ENTER_VOTER_INFORMATION && <VoterVerification onSubmit={verifyVoterId} />}
            {votingScreen.voterError && <div>{votingScreen.voterError}</div>}
            {votingScreen.screen === VotingScreen.BALLOT && <Ballot voter={votingScreen.voter} election={votingScreen.selectedElection} {...boundActions} />}
            {votingScreen.screen === VotingScreen.SUCCESS && (
                <>
                    <h2>Success!</h2>
                    <Button variant="contained" onClick={() => boundActions.onReturnToMain()}>
                        Return
                    </Button>
                </>
            )}
        </div>
    );
}
