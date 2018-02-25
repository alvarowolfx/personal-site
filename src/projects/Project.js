import React from 'react';

import { ListItem, ListItemText } from 'material-ui/List';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';

const Talk = ({ talk, place }) => {
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
        {talk.tags.map(tag => (
          <div style={{ marginRight: 4 }}>
            <Chip label={tag} key={tag} />
          </div>
        ))}
      </ListItem>
      <ListItem divider>
        {Object.keys(talk.links).map(type => {
          return (
            <Button
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

export default Talk;
