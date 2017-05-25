import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'muicss/lib/react/container';
import Appbar from 'muicss/lib/react/appbar';
import Logo from './Logo';

import styled from 'styled-components';

const Header = styled.header`
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  z-index: 100;
`

const NavAppBar = styled(Appbar)`
  background-color: ${ props => props.theme.foreground } !important;
`

const Tabs = styled.ul`
  float: right;
  text-align: right;
  display: inline;
`

const Tab = styled.li`
  &:hover {
    border-bottom: 2px solid ${ props => props.theme.primary };
  }

  a:hover {
    color: ${ props => props.theme.secondary };
    cursor: pointer;
  }

  a:active, a:visited {
    text-decoration: none;
  }
`

const Navbar = ({ location }) => {
    let currentPath = location.pathname;
    return (
        <Header>
            <NavAppBar className="mui--z1">
                <Container>
                    <Logo />
                    <Tabs className="mui-tabs__bar mui--appbar-height mui--appbar-line-height">
                        <Tab className={currentPath === "/talks" ? "mui--is-active" : null}>
                            <Link to="talks">Talks</Link>
                        </Tab>
                        <Tab>
                            <a href="https://medium.com/iot-bootcamp" target="_blank"
                              rel="noopener noreferrer">
                                Blog
                            </a>
                        </Tab>
                    </Tabs>
                </Container>
            </NavAppBar>
        </Header>
    );
}

export default Navbar;
