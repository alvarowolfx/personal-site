import React from 'react';

import List from 'material-ui/List';

import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';

import Project from './Project';

const projects = require('./_content/projects.json');

const Projects = () => {
  return (
    <SectionContainer>
      <SectionTitle>Projetos pessoais e de código aberto</SectionTitle>
      <p>
        Aqui ficarão listados alguns projetos que considero mais interessantes
        que eu desenvolvi durante o tempo. Todo feedback é bem vindo.
      </p>

      <List>
        {projects.map(talk => {
          return (
            <Project
              talk={talk}
              place={talk.place}
              key={`talk-${talk.title}`}
            />
          );
        })}
        <br />
      </List>
    </SectionContainer>
  );
};

export default Projects;
