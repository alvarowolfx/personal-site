import React from 'react';

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import SectionContainer from '../components/SectionContainer';
import SectionTitle from '../components/SectionTitle';

const PostsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  align-content: stretch;
  justify-content: space-around;
  flex-direction: row;
`;

const PostCard = styled.div`
  margin: 8px;
  max-width: 360px;

  @media screen and (max-width: 720px) {
    max-width: 600px;
  }
`;

// eslint-disable-next-line import/no-webpack-loader-syntax
const webpackRequireContext = require.context(
  '!markdown-with-front-matter-loader!./_content',
  false,
  /.md$/
);

let posts = webpackRequireContext
  .keys()
  .reverse() // Invert date order
  .reduce((memo, fileName) => {
    let blogInfo = webpackRequireContext(fileName);
    if (blogInfo.local) {
      return memo;
    }
    //let path = fileName.match(/.\/([^.]+).*/)[1];
    const path = `/blog/${blogInfo.category}/${blogInfo.permalink}`;
    blogInfo.path = path;
    return memo.set(path, blogInfo);
  }, new Map());

const PostLink = ({ post, button, children }) => {
  const { path } = post;
  if (post.local) {
    if (button) {
      return (
        <Button size="small" color="primary" component={Link} to={path}>
          {children || post.title}
        </Button>
      );
    } else {
      return <Link to={path}>{children || post.title}</Link>;
    }
  } else {
    if (button) {
      return (
        <Button
          size="small"
          color="primary"
          component="a"
          href={post.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="See post"
        >
          {children || post.title}
        </Button>
      );
    } else {
      return (
        <a
          href={post.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="See post"
        >
          {children || post.title}
        </a>
      );
    }
  }
};

const LocalBlogIndex = blogs => () => {
  return (
    <div>
      <SectionContainer>
        <SectionTitle className="mui--text-center">Blog Posts</SectionTitle>
        <p>
          Todos os tutorias e publicações minhas serão listadas aqui para ficar
          mais centralizado. Tem conteúdo de diversas áreas, mas o foco atual é
          mais em Internet das Coisas, Automação e Google Cloud. Estou aberto a
          sugestões de vocês também, é só entrar em contato nas redes sociais.
        </p>
        <p>Indice dos posts:</p>
        <ul>
          {[...blogs.keys()].map(path => {
            const post = blogs.get(path);
            return (
              <li key={path}>
                <PostLink post={post} />
              </li>
            );
          })}
        </ul>
      </SectionContainer>
      <br />
      <PostsContainer>
        {[...blogs.keys()].map(path => {
          const post = blogs.get(path);
          return (
            <PostCard key={path}>
              <Card>
                <CardMedia
                  image={post.thumbnail}
                  title={post.title}
                  style={{ height: 200 }}
                />
                <CardContent>
                  <Typography
                    variant="title"
                    component="h3"
                    style={{ minHeight: 80 }}
                  >
                    {post.title}
                  </Typography>
                  <Typography component="p">
                    Publicado em {new Date(post.date).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <PostLink post={post} button>
                    Ler publicação
                  </PostLink>
                </CardActions>
              </Card>
            </PostCard>
          );
        })}
      </PostsContainer>
    </div>
  );
};

export const BlogIndex = LocalBlogIndex(posts);

const localBlogWrapper = ({
  title,
  __content,
  permalink,
  date,
  category
}) => () => {
  return (
    <SectionContainer className="markdown-body">
      <h1>{title}</h1>
      <small>
        {new Date(date).toLocaleDateString()} in {category}
      </small>
      <br />
      <br />
      <div dangerouslySetInnerHTML={{ __html: __content }} />
      <br />
    </SectionContainer>
  );
};

export const BlogPostRoutes = [...posts.keys()].map(path => {
  return (
    <Route
      key={path}
      path={path}
      component={localBlogWrapper(posts.get(path))}
    />
  );
});
