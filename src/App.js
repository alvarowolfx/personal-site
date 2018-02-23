/**
 * Created by alvaroviebrantz on 28/06/16.
 */

import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Main from './container/Main';
import Talks from './container/Talks';
import Projects from './container/Projects';
import Lives from './container/Lives';
import { BlogIndex, BlogPostRoutes } from './container/BlogPosts';
import About from './container/About';

const Container = styled.div`
  margin: 48px 16px 48px 16px;
`;

const AppbarPlaceholder = styled.div`
  height: 80px;
  @media screen and (max-width: 400px) {
    height: 72px;
    margin-bottom: 10px;
  }
`;

const Body = styled.div`
  font-family: Roboto;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.primary};
  -webkit-font-smoothing: antialiased;
`;

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
        <Route
          render={props => (
            <Body>
              <Navbar {...props} />
              <AppbarPlaceholder />
              <Container>
                <Route exact path="/" component={Main} />
                <Route path="/talks" component={Talks} />
                <Route path="/lives" component={Lives} />
                <Route path="/projects" component={Projects} />
                <Route path="/about" component={About} />
                <Route path="/blog" exact component={BlogIndex} />
                {BlogPostRoutes}
              </Container>
            </Body>
          )}
        />
      </Router>
    </ThemeProvider>
  );
};

export default App;
