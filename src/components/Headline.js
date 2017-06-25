import React from 'react';
import Container from 'muicss/lib/react/container';
import styled from 'styled-components'

import SocialIcons from './SocialIcons';

const AVATAR_IMG_URL = "https://avatars2.githubusercontent.com/u/1615543?v=3&s=320";

const HeadlineContainer = styled(Container)`
  margin: 8vh 0;
  text-align: center;
`

const Content = styled.div`
  background-color: white;
  padding: 5vh 0;
`

const Avatar = styled.img`
  height: 160px;
  width: 160px;
  border-radius: 80px;
  margin-bottom: 15px;
  border: 6px solid ${ props => props.theme.background };
`

const Headline = () => {
    return (
        <HeadlineContainer>
            <Content className="mui--z2">
                <Avatar src={AVATAR_IMG_URL} alt="avatar" />
                <h1>Olá, Eu sou o Alvaro Viebrantz</h1>
                <h4>
                    <a href="https://fb.me/devmatogrosso" target="_blank"
                       rel="noopener noreferrer">DevMT</a>
                    &nbsp;e&nbsp;
                    <a href="https://gdgcuiaba.com"
                       target="_blank"
                       rel="noopener noreferrer">GDGCuiabá</a>
                    &nbsp;organizer
                </h4>
                <h4>Analista de TI na SEFAZ-MT (MTI)</h4>
                <h4>Fullstack e Mobile Developer</h4>
                <SocialIcons />
            </Content>
        </HeadlineContainer>
    );
}

export default Headline;
