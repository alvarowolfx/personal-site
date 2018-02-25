import React from 'react';

import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';

import Avatar from 'material-ui/Avatar';

const Talk = ({ talk, place }) => {
  return (
    <ListItem divider>
      <Avatar>
        <i className="material-icons">mic</i>
      </Avatar>
      <ListItemText
        primary={talk.title}
        secondary={`${place.date}, ${place.name}, ${place.local}`}
      />
      {talk.slidesUrl && (
        <ListItemSecondaryAction>
          <a
            style={{ textDecoration: 'none', color: 'inherit' }}
            href={talk.slidesUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See Slides"
          >
            <i className="material-icons">open_in_browser</i>
          </a>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default Talk;
