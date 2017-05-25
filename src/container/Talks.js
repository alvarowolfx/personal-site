import React from 'react';
import styled from 'styled-components'
import Panel from 'muicss/lib/react/panel';
import Container from 'muicss/lib/react/container';

import { talks } from '../data';

const TalkContainer = styled(Panel)`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
  }

  .talk-panel__desc {
    flex-direction: column;
    display: flex;
  }

  @media screen and (min-width: 450px){
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    img {
      width: 100%;
      max-height: 200px;
      object-fit: cover;
    }

    .talk-panel__desc {
      margin-left: 20px;
    }
  }
`

const Talk = ({ talk }) => {
    return (
        <TalkContainer className="mui--z1">
            <img src={talk.imageUrl} alt={talk.title}/>
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
                        rel="noopener noreferrer"
                        style={{ maxWidth: 200 }}>
                        See slides
                    </a>
                    :
                    <button className="mui-btn mui-btn--raised mui-btn--danger"
                        href={talk.slidesUrl} target="_blank"
                        rel="noopener noreferrer"
                        style={{ maxWidth: 200 }}>
                        Coming soon
                    </button>
                }
            </div>
        </TalkContainer>
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
