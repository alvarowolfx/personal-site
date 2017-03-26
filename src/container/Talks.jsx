import React from 'react';
import Divider from 'muicss/lib/react/divider';
import Panel from 'muicss/lib/react/panel';
import Container from 'muicss/lib/react/container';

import { talks } from '../data';

const Talk = ({ talk }) => {
    return (
        <Panel className="talk-panel">
            <img src={talk.imageUrl} />
            <div className="talk-panel__desc">
                <h3 className="mui--text-title">{talk.title}</h3>
                <div>
                    {talk.places.map(place => {
                        return (
                            <p key={place.name} className="mui--text-caption">
                                <i className="ion-calendar" />
                                &nbsp;{place.date}, {place.name} - {place.local}
                            </p>
                        );
                    })}
                </div>
                {talk.slidesUrl ?
                    <a className="mui-btn mui-btn--raised mui-btn--primary"
                        href={talk.slidesUrl} target="_blank"
                        style={{ maxWidth: 200 }}>
                        See slides
                                  </a>
                    :
                    <button className="mui-btn mui-btn--raised mui-btn--danger"
                        href={talk.slidesUrl} target="_blank"
                        style={{ maxWidth: 200 }}>
                        Coming soon
                    </button>
                }
            </div>
        </Panel>
    );
}

const Talks = () => {
    return (
        <Container>
            <div className="mui--text-center">
                <div className="mui--text-title">
                    <h1>Talks</h1>
                </div>
            </div>
            <center style={{
                margin: '15px auto'
            }}>
                <a className="mui-btn mui-btn--raised" href="mailto:alvaroviebrantz@gmail.com" style={{
                    fontSize: '0.85em'
                }}>
                    Invite me to your conference
                    </a>
            </center>
            {talks.map((talk, idx) => {
                return <Talk talk={talk} key={`talk-${idx}`} />
            })}
        </Container>
    );
}

export default Talks;
