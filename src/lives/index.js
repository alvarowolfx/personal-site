import React from 'react';

import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';
import Button from 'material-ui/Button';

import LiveList from './LiveList';

import { groupedLives } from './data';

const Lives = () => {
  return (
    <div>
      <SectionContainer>
        <SectionTitle>Live Streaming e Videos</SectionTitle>
        <p>
          Toda segunda-feira tem episódio novo da série Novidade IoT onde falo
          tudo que rolou durante a semana no mundo de Internet das coisas e desenvolvimento em geral.
        </p>
        <center
          style={{
            margin: '15px auto'
          }}
        >
          <Button
            component="a"
            variant="raised"
            color="primary"
            target="_blank"
            href="https://www.youtube.com/channel/UC89Gzw1wIFXganAibMAnCOg"
            style={{
              fontSize: '0.85em'
            }}
          >
            Ver canal no Youtube
          </Button>
        </center>
        <p>
          Outros videos e formatos outros formatos também estarão listados aqui,
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
