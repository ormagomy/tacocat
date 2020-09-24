import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import {VoterRegsitration} from './components/VoterRegsitration';
import {Home} from './components/Home';
import {Election} from './components/Election';
import {Vote} from './components/Vote';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
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

                <hr />

                {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
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

// You can think of these components as "pages"
// in your app.

function Dashboard() {
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
}
