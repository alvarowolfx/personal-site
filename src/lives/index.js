import React from 'react';

import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';

import LiveList from './LiveList';

import { groupedLives } from './data';

const Lives = () => {
  return (
    <div>
      <SectionContainer>
        <SectionTitle>Live Streaming e Videos</SectionTitle>
        <p>
          Em breve, normalmente terça-feira às 21:30h estarei transmitindo Lives
          sobre Internet das coisas e desenvolvimento em geral. Boa parte dessas
          transmissões terão temas definidos, mas outros formatos podem ocorrer,
          como por exemplo:
        </p>
        <ul>
          <li> Palestras gravadas de eventos que participei.</li>
          <li> Sessões para tirar dúvidas.</li>
          <li> Acompanhar o desenvolvimento de algum projeto pessoal.</li>
          <li> Aberto a sugestões de vocês. </li>
        </ul>
        <p>Abaixo aqui está a agenda dos últimos e futuros eventos.</p>
      </SectionContainer>
      <br />
      <center>
        {groupedLives['due'].length > 0 && (
          <LiveList title="Próximas" lives={groupedLives['due']} />
        )}
        <br />
        <LiveList title="Passadas" lives={groupedLives['past']} />
      </center>
    </div>
  );
};

export default Lives;
