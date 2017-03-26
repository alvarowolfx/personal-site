import React from 'react';
import Container from 'muicss/lib/react/container';
import SocialIcons from './SocialIcons';

const AVATAR_IMG_URL = "https://avatars2.githubusercontent.com/u/1615543?v=3&s=320";

const Headline = () => {
    return (
        <Container className="headline">
            <div className="headline--content mui--z2">
                <img src={AVATAR_IMG_URL} className="headline--avatar" />
                <h1>Hi, I'm Alvaro Viebrantz</h1>
                <h4>
                    <a href="https://fb.me/devmatogrosso" target="_blank">DevMT</a>
                    and <a href="https://gdgcuiaba.com">GDGCuiabá</a> organizer
                    </h4>
                <h4>
                    <a href="https://medium.com/iot-bootcamp" target="_blank">
                        IoT Bootcamp blog
                        </a>
                </h4>
                <h4>IT Analyst at SEFAZ-MT (MTI)</h4>
                <h4>Fullstack and Mobile Developer</h4>
                <SocialIcons />
            </div>
        </Container>
    );
}

export default Headline;
