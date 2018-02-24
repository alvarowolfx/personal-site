import React from 'react';

import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
//import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import PublicSpeakingIcon from 'material-ui-icons/Mic';
import SeeSlidesIcon from 'material-ui-icons/OpenInBrowser';

const Live = ({ talk }) => {
  return (
    <List dense>
      <ListItem>
        <Avatar>
          <PublicSpeakingIcon />
        </Avatar>
        <ListItemText
          primary={talk.title}
          //secondary={`${place.date}, ${place.name}, ${place.local}`}
        />
        {talk.slidesUrl && (
          <ListItemSecondaryAction>
            <IconButton
              component="a"
              href={talk.slidesUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="See Slides"
            >
              <SeeSlidesIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </List>
  );
};

export default Live;
