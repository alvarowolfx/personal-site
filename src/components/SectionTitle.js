import React from 'react';
import Typography from 'material-ui/Typography';

export default ({ children, style }) => {
  return (
    <Typography variant="title" color="inherit" style={[{ flex: 1 }, style]}>
      {children}
    </Typography>
  );
};
