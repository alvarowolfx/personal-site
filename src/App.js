/**
 * Created by alvaroviebrantz on 28/06/16.
 */

import React from 'react';
import Container from 'muicss/lib/react/container';
import styled, { ThemeProvider } from 'styled-components';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './container/Main';
import Talks from './container/Talks';

const AppbarPlaceholder = styled.div`
  height: 60px;
  @media screen and (max-width: 769px){
    height: 20px;
    margin-bottom: 10px;
  }
`

const Body = styled.div`
  font-family: Roboto, sans-serif;
  background-color: ${ props => props.theme.background };
`

const theme = {
  primary: '#2980b9',
  secondary: '#2c3e50',
  background: '#ecf0f1',
  foreground: 'white'
};


const App = () => {
    return (
        <ThemeProvider theme={theme}>
          <Router>
              <Route render={({ location }) => (
                  <Body>
                      <Navbar location={location} />
                      <AppbarPlaceholder />
                      <Container>
                          <Route exact path="/" component={Main} />
                          <Route path='/talks' component={Talks} />
                      </Container>
                      <Footer />
                  </Body>
              )} />
          </Router>
        </ThemeProvider>
    );
}

export default App;
