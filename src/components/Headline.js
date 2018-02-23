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

import SocialIcons from './SocialIcons';

const AVATAR_IMG_URL =
  'https://avatars2.githubusercontent.com/u/1615543?v=3&s=320';

const BigAvatar = styled(Avatar)`
  width: 200px !important;
  height: 200px !important;
`;

const Headline = () => {
  return (
    <SectionContainer>
      <center>
        <BigAvatar src={AVATAR_IMG_URL} alt="avatar" />
        <br />
        <SectionTitle>Olá, seja bem vindo!</SectionTitle>
        <p>
          Aqui você vai encontrar boa parte dos meus trabalhos relacionados a
          desenvolvimento, palestras, blog psots e minhas contribuições a
          projetos open-source.
          <br />
          Sinta-se à vontade para compartilhar e dar feedback no conteúdo.
        </p>
      </center>
      <List
        component="nav"
        subheader={<ListSubheader component="div">Conteúdo</ListSubheader>}
      >
        <ListItem component={Link} button to="/talks">
          <ListItemIcon>
            <PublicSpeakingIcon />
          </ListItemIcon>
          <ListItemText inset primary="Linha do tempo e palestras" />
        </ListItem>
        <ListItem component={Link} button to="/lives">
          <ListItemIcon>
            <LivesIcon />
          </ListItemIcon>
          <ListItemText inset primary="Live Streaming (BR)" />
        </ListItem>
        <ListItem component={Link} button to="/projects">
          <ListItemIcon>
            <ProjectsIcon />
          </ListItemIcon>
          <ListItemText inset primary="Projetos" />
        </ListItem>
        <ListItem component={Link} button to="/blog">
          <ListItemIcon>
            <BlogIcon />
          </ListItemIcon>
          <ListItemText inset primary="Blog posts" />
        </ListItem>
      </List>

      <List
        component="nav"
        subheader={<ListSubheader component="div">Sobre</ListSubheader>}
      >
        <ListItem>
          <ListItemIcon>
            <CommunityIcon />
          </ListItemIcon>
          <ListItemText
            inset
            primary="Community manager no DevMT e Google Developers Group Cuiabá."
          />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CommunityIcon />
          </ListItemIcon>
          <ListItemText inset primary="Google Developer Expert for IoT" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <CommunityIcon />
          </ListItemIcon>
          <ListItemText inset primary="Analista de TI na SEFAZ-MT" />
        </ListItem>
      </List>
      <center>
        <SocialIcons />
      </center>
    </SectionContainer>
  );
};

export default Headline;
