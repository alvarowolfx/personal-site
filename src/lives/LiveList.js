import React from 'react';

import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';

import Badge from 'material-ui/Badge';
import List from 'material-ui/List';

import Live from './Live';

const LiveList = ({ lives, title }) => {
  return (
    <SectionContainer>
      <Badge badgeContent={lives.length} color="secondary">
        <SectionTitle>{title}&nbsp;&nbsp;&nbsp;</SectionTitle>
      </Badge>
      <br />
      <List>
        {lives.map(live => {
          return <Live live={live} key={`live-${live.title}`} />;
        })}
      </List>
    </SectionContainer>
  );
};

export default LiveList;
