import React from 'react';

const SOCIAL_LINKS = [
    {
        url: 'https://github.com/alvarowolfx',
        icon: 'ion-social-github'
    }, {
        url: 'https://twitter.com/alvaroviebrantz',
        icon: 'ion-social-twitter'
    }, {
        url: 'https://facebook.com/alvarowolfx',
        icon: 'ion-social-facebook'
    },{
        url: 'https://br.linkedin.com/in/alvaro-viebrantz-55119048',
        icon: 'ion-social-linkedin'
    }
];

export default class SocialIcons extends React.Component {
    render() {
        let style = 'social--icons';
        if(this.props.inverse){
          style += ' inverse';
        }
        return (
            <ul className={style}>
                {SOCIAL_LINKS.map(social => {
                    return (
                        <li key={social.icon}>
                            <a href={social.url} target="_blank">
                                <i className={social.icon}/>
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    }
}
