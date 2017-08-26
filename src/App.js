/**
 * Created by alvaroviebrantz on 28/06/16.
 */

import React from 'react';
import Container from 'muicss/lib/react/container';
import styled, { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './container/Main';
import Talks from './container/Talks';
import About from './container/About';
import SectionContainer from './components/SectionContainer';
import SectionTitle from './components/SectionTitle';

// eslint-disable-next-line import/no-webpack-loader-syntax
const webpackRequireContext = require.context(
  '!markdown-with-front-matter-loader!./_posts',
  false,
  /.md$/
);
const blogs = webpackRequireContext.keys().reduce((memo, fileName) => {
  let blogInfo = webpackRequireContext(fileName);
  //let path = fileName.match(/.\/([^.]+).*/)[1];
  let path = `/blog/${blogInfo.category}/${blogInfo.permalink}`;
  return memo.set(path, blogInfo);
}, new Map());

const AppbarPlaceholder = styled.div`
  height: 60px;
  @media screen and (max-width: 400px) {
    height: 72px;
    margin-bottom: 10px;
  }
`;

const Body = styled.div`
  font-family: sans-serif;
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

const blogIndex = blogs => () => {
  return (
    <SectionContainer>
      <SectionTitle className="mui--text-center">Blog</SectionTitle>
      <ul>
        {[...blogs.keys()].map(path => {
          return (
            <li key={path}>
              <Link to={path}>
                {blogs.get(path).title || path}
              </Link>
            </li>
          );
        })}
      </ul>
    </SectionContainer>
  );
};
const blogWrapper = ({ title, __content, permalink, date, category }) => () => {
  return (
    <SectionContainer className="markdown-body">
      <h1>
        {title}
      </h1>
      <small>
        {new Date(date).toLocaleDateString()} in {category}
      </small>
      <br />
      <br />
      <div dangerouslySetInnerHTML={{ __html: __content }} />
      <br />
    </SectionContainer>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route
          render={({ location }) =>
            <Body>
              <Navbar location={location} />
              <AppbarPlaceholder />
              <Container>
                <Route exact path="/" component={Main} />
                <Route path="/talks" component={Talks} />
                <Route path="/about" component={About} />
                <Route path="/blog" exact component={blogIndex(blogs)} />
                {[...blogs.keys()].map(path =>
                  <Route
                    key={path}
                    path={path}
                    component={blogWrapper(blogs.get(path))}
                  />
                )}
              </Container>
              <Footer />
            </Body>}
        />
      </Router>
    </ThemeProvider>
  );
};

export default App;
