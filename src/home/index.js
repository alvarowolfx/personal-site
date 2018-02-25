import React from 'react';

import { Link } from 'react-router-dom';

import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';

import Avatar from 'material-ui/Avatar';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import PublicSpeakingIcon from 'material-ui-icons/Mic';
import LivesIcon from 'material-ui-icons/Videocam';
import ProjectsIcon from 'material-ui-icons/Build';
import BlogIcon from 'material-ui-icons/Pages';
import CommunityIcon from 'material-ui-icons/People';
import styled from 'styled-components';

import SocialIcons from '../components/SocialIcons';

const AVATAR_IMG_URL =
  'https://avatars2.githubusercontent.com/u/1615543?v=3&s=320';

const BigAvatar = styled(Avatar)`
  width: 200px !important;
  height: 200px !important;
`;

const GenericListItemLink = ({ icon, primary, secondary, to }) => {
  return (
    <ListItem component={Link} button to={to}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText inset primary={primary} secondary={secondary} />
    </ListItem>
  );
};

const GenericListItem = ({ icon, primary, secondary }) => {
  return (
    <ListItem>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText inset primary={primary} secondary={secondary} />
    </ListItem>
  );
};

const GenericList = ({ header, children }) => {
  return (
    <List
      component="nav"
      subheader={<ListSubheader component="div">{header}</ListSubheader>}
    >
      {children}
    </List>
  );
};

const ABOUT_LIST = [
  'Community manager no DevMT e Google Developers Group Cuiabá.',
  'Google Developer Expert for IoT',
  'Analista de TI na SEFAZ-MT'
];

const Home = () => {
  return (
    <SectionContainer>
      <center>
        <BigAvatar src={AVATAR_IMG_URL} alt="avatar" />
        <br />
        <SectionTitle>Olá, seja bem vindo!</SectionTitle>
        <p>
          Aqui você vai encontrar boa parte dos meus trabalhos relacionados a
          desenvolvimento, palestras, blog posts e minhas contribuições a
          projetos open-source.
          <br />
          Sinta-se à vontade para compartilhar e dar feedback no conteúdo.
        </p>
      </center>

      <GenericList header="Conteúdo">
        <GenericListItemLink
          icon={<PublicSpeakingIcon />}
          to="/talks"
          primary="Linha do tempo e palestras"
        />
        <GenericListItemLink
          icon={<LivesIcon />}
          to="/lives"
          primary="Live Streaming e Videos"
        />
        <GenericListItemLink
          icon={<ProjectsIcon />}
          to="/projects"
          primary="Projetos"
        />
        <GenericListItemLink
          icon={<BlogIcon />}
          to="/blog"
          primary="Blog posts"
        />
      </GenericList>

      <GenericList header="Conteúdo">
        {ABOUT_LIST.map(about => {
          return (
            <GenericListItem
              key={about}
              icon={<CommunityIcon />}
              primary={about}
            />
          );
        })}
      </GenericList>

      <center>
        <SocialIcons />
      </center>
    </SectionContainer>
  );
};

export default Home;
