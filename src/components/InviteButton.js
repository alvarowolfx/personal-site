import React from 'react';
import Button from 'material-ui/Button';

const InviteButton = () => {
  return (
    <center
      style={{
        margin: '15px auto'
      }}
    >
      <Button
        component="a"
        variant="raised"
        color="primary"
        large
        href="mailto:alvaroviebrantz@gmail.com"
        style={{
          fontSize: '0.85em'
        }}
      >
        Invite me to your event
      </Button>
    </center>
  );
};

export default InviteButton;
