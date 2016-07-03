/**
 * Created by alvaroviebrantz on 28/06/16.
 */

import React from 'react';
import Container from 'muicss/lib/react/container';

import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import hashHistory from 'react-router/lib/hashHistory';
import IndexRoute from 'react-router/lib/IndexRoute';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './container/Main';
import Talks from './container/Talks';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar {...this.props}/>
                <div id="fixed-appbar-placeholder" className="mui--appbar-height"/>
                <Container>
                    {this.props.children}
                </Container>
                <Footer/>
            </div>
        );
    }
}

let routes = () => (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Main}/>
            <Route path="talks" component={Talks}/>
        </Route>
    </Router>
);

export default routes;
