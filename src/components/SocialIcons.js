import React from 'react';
import styled from 'styled-components';

const SOCIAL_LINKS = [
    {
        url: 'https://medium.com/@alvaroviebrantz',
        icon: 'ion-social-rss'
    },
    {
        url: 'https://github.com/alvarowolfx',
        icon: 'ion-social-github'
    },
    {
        url: 'https://twitter.com/alvaroviebrantz',
        icon: 'ion-social-twitter'
    },
    {
        url: 'https://facebook.com/alvarowolfx',
        icon: 'ion-social-facebook'
    },
    {
        url: 'https://br.linkedin.com/in/alvaro-viebrantz-55119048',
        icon: 'ion-social-linkedin'
    }
];

const SocialsIconsContainer = styled.ul`
  padding: 0;
  margin: 0 auto;
  margin-top: 20px;

  li {
    display: inline-block;
    margin: 0 20px;

    i {
        color: ${ props => props.theme.secondary };
        font-size: 2.5em;
    }
  }

  &.inverse li i{
    color: white !important;
  }
`

const SocialIcons = ({ inverse }) => {
    let style = '';
    if (inverse) {
        style = 'inverse';
    }
    return (
        <SocialsIconsContainer className={style}>
            {SOCIAL_LINKS.map(social => {
                return (
                    <li key={social.icon}>
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                            <i className={social.icon} />
                        </a>
                    </li>
                );
            })}
        </SocialsIconsContainer>
    );
}

export default SocialIcons;
