import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {makeStyles, AppBar, Toolbar, Button} from '@material-ui/core';

import tacocat from './images/tacocat.png';

import {VoterRegsitration} from './components/VoterRegsitration';
import {Home} from './components/Home';
import {Election} from './components/Election';
import {Vote} from './components/Vote';

const useStyles = makeStyles({
    mascot: {
        width: 100,
        margin: '10px 10px 0',
    },
    appBar: {
        backgroundColor: '#ff9999',
    },
    menuButton: {
        margin: '0 15px',
    },
    menuLink: {
        textDecoration: 'none',
    },
});

export default function BasicExample() {
    const classes = useStyles();

    return (
        <Router>
            <div>
                <AppBar className={classes.appBar} position="static" color="default">
                    <Toolbar>
                        <Button className={classes.menuButton} variant="contained">
                            <Link className={classes.menuLink} to="/">
                                Home
                            </Link>
                        </Button>
                        <Button className={classes.menuButton} variant="contained">
                            <Link className={classes.menuLink} to="/VoterRegsitration">
                                Register Voter
                            </Link>
                        </Button>
                        <Button className={classes.menuButton} variant="contained">
                            <Link className={classes.menuLink} to="/Vote">
                                Vote
                            </Link>
                        </Button>
                        <Button className={classes.menuButton} variant="contained">
                            <Link className={classes.menuLink} to="/Election">
                                Election
                            </Link>
                        </Button>
                    </Toolbar>
                </AppBar>

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
