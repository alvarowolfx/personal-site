/**
 * Created by alvaroviebrantz on 28/06/16.
 */

import React from 'react';
import Container from 'muicss/lib/react/container';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import hashHistory from 'react-router/lib/hashHistory';
import IndexRoute from 'react-router/lib/IndexRoute';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './container/Main';
import Talks from './container/Talks';

const App = () => {
    return (
        <Router>
            <Route render={({ location }) => (
                <div>
                    <Navbar location={location} />
                    <div id="fixed-appbar-placeholder" className="mui--appbar-height" />
                    <Container>
                        <ReactCSSTransitionGroup
                            transitionName="fade"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}>
                            <Route exact path="/" component={Main} />
                            <Route path='/talks' component={Talks} />
                        </ReactCSSTransitionGroup>
                    </Container>
                    <Footer />
                </div>
            )} />
        </Router>
    );
}

export default App;
