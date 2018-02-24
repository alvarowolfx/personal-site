import React from 'react';

import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';
import InviteButton from '../components/InviteButton';
import TalkGroup from './TalkGroup';

import { years, groupedTalks } from './data';

export const Talks = () => {
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
