import React from 'react';
import Container from 'muicss/lib/react/container';
import Appbar from 'muicss/lib/react/appbar';
import SocialIcons from './SocialIcons';

export default class Footer extends React.Component {
    render() {
        return (
            <Appbar className="footer-appbar">
                <Container style={{ textAlign: 'center'}}>
                  <SocialIcons inverse/>
                </Container>
            </Appbar>
        )
    }
}
