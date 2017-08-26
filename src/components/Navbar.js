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
`;

const NavAppBar = styled(Appbar)`
  background-color: ${props => props.theme.secondary} !important;
`;

const Tabs = styled.ul`
  float: right;
  text-align: right;
  display: inline;
`;

const Tab = styled.li`color: ${props => props.theme.foreground};`;

const TabLink = styled(Link)`
  display: inline;
  font-size: 32px;
  color: ${props => props.theme.background} !important;
  text-decoration: none !important;
  padding-bottom: 5px;

  &.active,
  &:hover {
    color: { props => props.theme.secondary };
    cursor: pointer;
    text-decoration: none !important;
  }

  &:hover {
    border-bottom: 2px solid ${props => props.theme.foreground} !important;
  }

  a:active,
  a:focus,
  a:visited {
    color: ${props => props.theme.foreground} !important;
    text-decoration: none !important;
  }
`;

const ExternalLink = styled.a`
  display: inline;
  font-size: 32px;
  color: ${props => props.theme.background} !important;
  text-decoration: none !important;
  padding-bottom: 5px;

  &:hover {
    color: { props => props.theme.secondary };
    cursor: pointer;
    text-decoration: none !important;
    border-bottom: 2px solid ${props => props.theme.foreground} !important;
  }
`;

const Navbar = ({ location }) => {
  let currentPath = location.pathname;
  return (
    <Header>
      <NavAppBar className="mui--z1">
        <Container>
          <Logo />
          <Tabs className="mui-tabs__bar mui--appbar-height mui--appbar-line-height">
            {/*
                        <Tab className={currentPath.startsWith("/blog") ? "mui--is-active" : null}>
                            <TabLink to="/blog">Blog</TabLink>
                        </Tab>
                        */}
            <Tab className={currentPath === '/talks' ? 'mui--is-active' : null}>
              <TabLink to="/talks">Palestras</TabLink>
            </Tab>
            <Tab className={currentPath === '/about' ? 'mui--is-active' : null}>
              <TabLink to="/about">Sobre</TabLink>
            </Tab>
            <Tab>
              <ExternalLink
                href="https://medium.com/@alvaroviebrantz"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </ExternalLink>
            </Tab>
          </Tabs>
        </Container>
      </NavAppBar>
    </Header>
  );
};

export default Navbar;
