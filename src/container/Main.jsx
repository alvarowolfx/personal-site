import React from 'react';
import {Appbar, Button, Divider, Container} from 'muicss/react';

import Headline from '../components/Headline';

export default class Main extends React.Component {
    render() {
        return (
            <div>
                <Headline/>
                <Divider/>
                <div className="mui--text-center">
                    <div className="mui--text-title ">
                        What I do
                    </div>
                    <ul className="main--skills">
                        <li>
                            <i className="ion-iphone"/>
                            <div>
                              <b>Mobile Development:</b>
                              <p>I’ve been developing mobile applications, using both hybrid and native technologies, since 2012.</p>
                            </div>
                        </li>
                        <li>
                          <i className="ion-mic-c"/>
                          <div>
                            <b>Conference Speaking:</b>
                            <p>Sharing knowledge it's one of my passions. I would love to speak at your conference.</p>
                          </div>
                        </li>
                        <li>
                          <i className="ion-ios-people"/>
                          <div>
                            <b>Training:</b>
                            <p>I also like prepare workshops and courses.</p>
                          </div>
                        </li>
                    </ul>
                </div>
                <Divider/>
            </div>
        );
    }
}
