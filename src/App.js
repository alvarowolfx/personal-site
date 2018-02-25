/**
 * Created by alvaroviebrantz on 28/06/16.
 */

import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import styled from 'styled-components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './home';
import Talks from './talks';
import Lives from './lives';
import Projects from './projects';
import { BlogIndex, BlogPostRoutes } from './posts';

import purple from 'material-ui/colors/indigo';
import green from 'material-ui/colors/deepOrange';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  }
});

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

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route
          render={props => (
            <div>
              <Navbar {...props} />
              <AppbarPlaceholder />
              <Container>
                <Route exact path="/" component={Home} />
                <Route path="/talks" component={Talks} />
                <Route path="/lives" component={Lives} />
                <Route path="/projects" component={Projects} />
                <Route path="/blog" exact component={BlogIndex} />
                {BlogPostRoutes}
              </Container>
            </div>
          )}
        />
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
