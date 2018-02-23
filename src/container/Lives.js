import React from 'react';

import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';

import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
//import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import PublicSpeakingIcon from 'material-ui-icons/Mic';
import SeeSlidesIcon from 'material-ui-icons/OpenInBrowser';

const Live = ({ talk, place }) => {
  return (
    <List dense>
      <ListItem>
        <Avatar>
          <PublicSpeakingIcon />
        </Avatar>
        <ListItemText
          primary={talk.title}
          secondary={`${place.date}, ${place.name}, ${place.local}`}
        />
        {talk.slidesUrl && (
          <ListItemSecondaryAction>
            <IconButton
              component="a"
              href={talk.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="See Slides"
            >
              <SeeSlidesIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </List>
  );
};

const LiveList = ({ lives }) => {
  return (
    <div>
      <SectionContainer>
        <SectionTitle>Agenda em breve&nbsp;&nbsp;&nbsp;</SectionTitle>
        {/*<Badge badgeContent={lives.length || null} color="secondary"></Badge>*/}
      </SectionContainer>
      <br />
      {lives.map((live, idx) => {
        return <Live live={live} place={live.place} key={`live-${idx}`} />;
      })}
    </div>
  );
};

const Lives = () => {
  return (
    <div>
      <SectionContainer>
        <SectionTitle>Live Streaming (BR)</SectionTitle>
        <p>
          Em breve, toda terça-feira às 21:30h estarei fazendo transmitindo
          Lives sobre Internet das coisas e desenvolvimento em geral. Boa parte
          dessas transmissões terão temas definidos, mas outros formatos podem
          ocorrer, como por exemplo:
          <ul>
            <li> Sessões para tirar dúvidas.</li>
            <li> Acompanhar o desenvolvimento de algum projeto pessoal.</li>
            <li> Aberto a sugestões de vocês. </li>
          </ul>
        </p>
        <p>Abaixo aqui está a agenda dos últimos eventos.</p>
      </SectionContainer>
      <br />
      <center>
        <LiveList lives={[]} />
      </center>
    </div>
  );
};

export default Lives;
