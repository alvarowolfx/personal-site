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
        href="mailto:alvaroviebrantz@gmail.com"
        style={{
          fontSize: '0.85em'
        }}
      >
        Me convide para seu evento
      </Button>
    </center>
  );
};

export default InviteButton;
