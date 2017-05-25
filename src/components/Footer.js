import React from 'react';
import styled from 'styled-components';
import Container from 'muicss/lib/react/container';
import Appbar from 'muicss/lib/react/appbar';
import SocialIcons from './SocialIcons';

const FooterContainer = styled(Appbar)`
  background-color: ${ props => props.theme.secondary } !important;
  padding-bottom: 25px;
`

const Footer = () => {
    return (
        <FooterContainer>
            <Container style={{ textAlign: 'center' }}>
                <SocialIcons inverse />
            </Container>
        </FooterContainer>
    )
}

export default Footer;
