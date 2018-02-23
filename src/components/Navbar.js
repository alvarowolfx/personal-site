import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

import styled from 'styled-components';

const Header = styled.header`
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 100;
`;

const ROUTES = [
  { title: 'Home', name: '' },
  { title: 'Timeline', name: 'talks' },
  { title: 'Lives', name: 'lives' },
  { title: 'Projetos', name: 'projects' },
  { title: 'Blog', name: 'blog' }
  //{ title: 'Press', name: 'press' }
];

class Navbar extends Component {
  render() {
    let { location, history } = this.props;
    let currentPath = '/' + location.pathname.split('/')[1];
    return (
      <Header>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
              \\ Alvaro Viebrantz
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper>
          <Tabs
            value={currentPath}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            {ROUTES.map(route => {
              const path = '/' + route.name;
              return (
                <Tab
                  value={path}
                  key={route.name}
                  label={route.title}
                  onClick={() => {
                    history.push(path);
                  }}
                />
              );
            })}
          </Tabs>
        </Paper>
      </Header>
    );
  }
}

export default Navbar;
