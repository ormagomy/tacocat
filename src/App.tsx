import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';

import tacocat from './images/tacocat.png';

import {VoterRegsitration} from './components/VoterRegsitration';
import {Home} from './components/Home';
import {Election} from './components/Election';
import {Vote} from './components/Vote';

const useStyles = makeStyles({
    mascot: {
        width: 100,
    },
});

export default function BasicExample() {
    const classes = useStyles();

    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/VoterRegsitration">Register Voter</Link>
                    </li>
                    <li>
                        <Link to="/Vote">Vote</Link>
                    </li>
                    <li>
                        <Link to="/Election">Election</Link>
                    </li>
                </ul>

                <img className={classes.mascot} src={tacocat} alt="tacocat" />
                <small>"Nothing is particularly hard if you divide it into small jobs." -Henry Ford</small>

                <hr />

                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/VoterRegsitration">
                        <VoterRegsitration />
                    </Route>
                    <Route path="/Vote">
                        <Vote />
                    </Route>
                    <Route path="/Election">
                        <Election />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
