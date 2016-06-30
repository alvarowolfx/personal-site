import React from 'react';
import Container from 'muicss/lib/react/container';
import SocialIcons from './SocialIcons';

const AVATAR_IMG_URL = "https://avatars2.githubusercontent.com/u/1615543?v=3&s=320";

export default class Headline extends React.Component {
    render() {
        return (
            <Container className='headline'>
                <div className="headline--content mui--z2">
                    <img src={AVATAR_IMG_URL} className="headline--avatar"/>
                    <div className="mui--text-display1">Hi, I'm Alvaro Viebrantz</div>
                    <div className="mui--text-subhead">IT Analyst at SEFAZ-MT</div>
                    <div className="mui--text-subhead">Fullstack and Mobile Developer</div>
                    <SocialIcons/>
                </div>
            </Container>
        );
    }
}
