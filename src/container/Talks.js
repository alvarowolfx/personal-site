import React from 'react';

import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';
import InviteButton from '../components/InviteButton';

import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import PublicSpeakingIcon from 'material-ui-icons/Mic';
import SeeSlidesIcon from 'material-ui-icons/OpenInBrowser';

import { years, groupedTalks } from '../data';

const Talk = ({ talk, place }) => {
  return (
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
  );
};

const TalkGroup = ({ talks, groupName }) => {
  return (
    <List dense>
      <Badge badgeContent={talks.length} color="primary">
        <SectionTitle>{groupName}&nbsp;&nbsp;&nbsp;</SectionTitle>
      </Badge>
      {talks.map((talk, idx) => {
        return <Talk talk={talk} place={talk.place} key={`talk-${idx}`} />;
      })}
      <br />
    </List>
  );
};

const Talks = () => {
  return (
    <SectionContainer>
      <SectionTitle>Timeline e Palestras</SectionTitle>
      <p>
        Compartilhar conhecimento é uma de minhas paixões. Aqui você pode
        encontrar todas as palestras e workshops que eu ministrei no decorrer do
        tempo. Em breve vou colocar também a agenda dos próximos eventos.
      </p>
      <p>
        Sinta-se a vontade de me contactar, será um prazer palestrar em algum
        evento que você me convidar.
      </p>
      <InviteButton />

      {years.map(year => {
        return (
          <TalkGroup key={year} talks={groupedTalks[year]} groupName={year} />
        );
      })}
    </SectionContainer>
  );
};

export default Talks;
