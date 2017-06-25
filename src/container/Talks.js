import React from 'react';
import styled from 'styled-components'
import SectionContainer from '../components/SectionContainer'
import SectionTitle from '../components/SectionTitle'

import { years, groupedTalks } from '../data';

const TalkContainer = styled.div`
  border-top: 1px solid ${ props => props.theme.primary };
  padding: 12px;
  margin: 12px;

  flex-direction: column;
  justify-content: flex-start;
  display: flex;

  span.mui--text-subhead, i{
    color: ${ props => props.theme.secondary };
    font-weight: bold;
  }

  .talk-panel__desc {
    flex-direction: column;
    display: flex;
  }

  @media screen and (min-width: 450px){
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .talk-panel__desc {
      margin-left: 20px;
    }
  }
`

const Talk = ({ talk, place }) => {
    return (
        <TalkContainer>
            {/*<img src={talk.imageUrl} alt={talk.title}/>*/}
            <span className="talk-panel__desc">
                <span className="mui--text-subhead">{talk.title}</span>
                <span key={place.name} className="mui--text-body1">
                    <i className="ion-calendar" />
                    &nbsp;{place.date}, {place.name}, {place.local}
                </span>
            </span>
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
        </TalkContainer>
    );
}

const TalkGroup = ({ talks, groupName }) => {
  return (
    <div>
      <SectionTitle>{groupName}</SectionTitle>
      {talks.map((talk, idx) => {
          return <Talk talk={talk} place={talk.place} key={`talk-${idx}`} />;
      })}
    </div>
  )
}

const Talks = () => {
    return (
        <SectionContainer>
            <SectionTitle className="mui--text-center">Palestras</SectionTitle>
            <p>
              Compartilhar conhecimento é uma de minhas paixões.
              Aqui você pode encontrar todas as palestras e workshops que eu ministrei no decorrer do tempo. Em breve vou colocar também a agenda dos próximos eventos.
            </p>
            <p> Sinta-se a vontade de me contactar, será um prazer palestrar em algum evento que você me convidar.</p>
            <center style={{
                margin: '15px auto'
            }}>
                <a className="mui-btn mui-btn--raised mui-btn--primary" href="mailto:alvaroviebrantz@gmail.com" style={{
                    fontSize: '0.85em'
                }}>
                    Me convide para seu evento
                </a>
            </center>
            {/*<div className="mui--text-center">
                <SectionTitle>Upcoming events</SectionTitle>
                <p> Upcoming events I'll be speaking at.</p>
            </div>
            <div className="mui--text-center">
                <SectionTitle>Talks</SectionTitle>
                <p> Events that I've spoken at.</p>
            </div>*/}
            { years.map( year => {
              return <TalkGroup key={year} talks={groupedTalks[year]} groupName={year}/>
            })}
        </SectionContainer>
    );
}

export default Talks;
