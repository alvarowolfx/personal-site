import React from 'react';

import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';

import LiveList from './LiveList';

const Lives = () => {
  return (
    <div>
      <SectionContainer>
        <SectionTitle>Live Streaming (BR)</SectionTitle>
        <p>
          Em breve, toda terça-feira às 21:30h estarei transmitindo Lives sobre
          Internet das coisas e desenvolvimento em geral. Boa parte dessas
          transmissões terão temas definidos, mas outros formatos podem ocorrer,
          como por exemplo:
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
