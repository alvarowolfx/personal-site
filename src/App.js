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
import About from './container/About';

const AppbarPlaceholder = styled.div`
  height: 60px;
  @media screen and (max-width: 400px){
    height: 72px;
    margin-bottom: 10px;
  }
`

const Body = styled.div`
  font-family: sans-serif;
  background-color: ${ props => props.theme.background };
  color: ${ props => props.theme.primary };
  -webkit-font-smoothing: antialiased;
`

const theme = {
  primary: '#4a4a4a',
  secondary: '#3a4250',
  background: '#ecf0f1',
  foreground: '#629ff1'
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
                          <Route path='/about' component={About} />
                      </Container>
                      <Footer />
                  </Body>
              )} />
          </Router>
        </ThemeProvider>
    );
}

export default App;
