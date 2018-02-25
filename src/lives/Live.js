import React from 'react';

import { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import VideoIcon from 'material-ui-icons/Videocam';

import { withStyles } from 'material-ui/styles';

const Live = ({ live, classes }) => {
  const dateDesc = `${new Date(live.start).toLocaleDateString()} - ${
    live.time
  }`;
  return (
    <ListItem divider>
      <Hidden smDown>
        <Avatar sizes="">
          <VideoIcon />
        </Avatar>
      </Hidden>
      <ListItemText primary={live.title} secondary={dateDesc} />

      {live.url && (
        <Button
          color="primary"
          variant="raised"
          component="a"
          href={live.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="See Slides"
        >
          Assistir
        </Button>
      )}

      {!live.url && (
        <Button
          className={classes.button}
          size="small"
          variant="raised"
          color="secondary"
        >
          Em breve
        </Button>
      )}
    </ListItem>
  );
};

const styles = theme => ({
  button: {
    minWidth: 'fit-content'
  }
});

export default withStyles(styles)(Live);
