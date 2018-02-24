import React from 'react';

import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import PublicSpeakingIcon from 'material-ui-icons/Mic';
import SeeSlidesIcon from 'material-ui-icons/OpenInBrowser';

const Talk = ({ talk, place }) => {
  return (
    <ListItem>
      <Avatar>
        <PublicSpeakingIcon />
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
