import React from 'react';

import { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const Project = ({ talk, place }) => {
  return (
    <div>
      <ListItem>
        {talk.thumbnail !== '' && <Avatar src={talk.thumbnail} />}
        {talk.thumbnail === '' && (
          <Avatar>
            <i className="material-icons">code</i>
          </Avatar>
        )}
        <ListItemText primary={talk.title} secondary={talk.description} />
      </ListItem>
      <ListItem>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {talk.tags.map(tag => (
            <div key={tag} style={{ marginLeft: 4, marginTop: 2 }}>
              <Chip label={tag} />
            </div>
          ))}
        </div>
      </ListItem>
      <ListItem divider>
        {Object.keys(talk.links).map(type => {
          return (
            <Button
              key={type}
              component="a"
              color="primary"
              href={talk.links[type]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="See Slides"
            >
              Open {type}
            </Button>
          );
        })}
      </ListItem>
    </div>
  );
};

export default Project;
