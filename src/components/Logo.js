import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoLink = styled(Link)`
  display: inline;
  font-size: 32px;
  color: ${ props => props.theme.background } !important;
  text-decoration: none !important;
  padding-bottom: 5px;

  &.active,
  &:hover {
    color: { props => props.theme.secondary };
    cursor: pointer;
    text-decoration: none !important;
    border-bottom: 2px solid ${ props => props.theme.foreground } !important;
  }

  a:active,
  a:focus,
  a:visited {
    color: ${ props => props.theme.foreground } !important;
    text-decoration: none !important;
  }
`

const LogoLight = styled.span`
  font-weight: 300;
  margin-right: -5px;
`

const LogoBlack = styled.span`
  font-weight: 900;
`

const Logo = () => {
    return (
        <LogoLink className="mui--align-middle mui--appbar-height mui--appbar-line-height" to="/">
            <LogoLight>A</LogoLight>
            <LogoBlack>V</LogoBlack>
        </LogoLink>
    )
}

export default Logo;
