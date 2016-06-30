/**
 * Created by alvaroviebrantz on 28/06/16.
 */

import React from 'react';
import Container from 'muicss/lib/react/container';
import {
    Route,
    Router,
    hashHistory,
    IndexRoute,
    Link
} from 'react-router';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './container/Main';
import Talks from './container/Talks';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar {...this.props}/>
                <div className="mui--appbar-height"/>
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
            <Route path="blog" component={Talks}/>
        </Route>
    </Router>
);

export default routes;
