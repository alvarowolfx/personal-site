import React from 'react';

import SectionTitle from '../components/SectionTitle';

import List from 'material-ui/List';
import Badge from 'material-ui/Badge';

import Talk from './Talk';

const TalkGroup = ({ talks, groupName }) => {
  return (
    <List>
      <Badge badgeContent={talks.length} color="primary">
        <SectionTitle>{groupName}&nbsp;&nbsp;&nbsp;</SectionTitle>
      </Badge>
      {talks.map(talk => {
        return (
          <Talk
            talk={talk}
            place={talk.place}
            key={`talk-${talk.title}-${talk.place.name}`}
          />
        );
      })}
      <br />
    </List>
  );
};

export default TalkGroup;
