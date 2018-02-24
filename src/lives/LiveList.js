import React from 'react';

import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';

import Live from './Live';

const LiveList = ({ lives }) => {
  return (
    <div>
      <SectionContainer>
        <SectionTitle>Agenda em breve&nbsp;&nbsp;&nbsp;</SectionTitle>
        {/*<Badge badgeContent={lives.length || null} color="secondary"></Badge>*/}
      </SectionContainer>
      <br />
      {lives.map((live, idx) => {
        return <Live live={live} key={`live-${idx}`} />;
      })}
    </div>
  );
};

export default LiveList;
