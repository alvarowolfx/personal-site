import React from 'react';
import Container from 'muicss/lib/react/container';
import SocialIcons from './SocialIcons';

const AVATAR_IMG_URL = "https://avatars2.githubusercontent.com/u/1615543?v=3&s=320";

export default class Headline extends React.Component {
    render() {
        return (
            <Container className="headline">
                <div className="headline--content mui--z2">
                    <img src={AVATAR_IMG_URL} className="headline--avatar"/>
                    <h1>Hi, I'm Alvaro Viebrantz</h1>
                    <h4>IT Analyst at SEFAZ-MT (MTI)</h4>
                    <h4>Fullstack and Mobile Developer</h4>
                    <SocialIcons/>
                </div>
            </Container>
        );
    }
}
