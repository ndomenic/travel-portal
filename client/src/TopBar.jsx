import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class TopBar extends Component {
  render() {
  	return (
  		<div>
	  	  <AppBar position="static" color="primary">
	        <Toolbar style={{justifyContent: 'center'}}>
	          <Typography variant="h6" color="inherit" align="center">
	            Upload Photos
	          </Typography>
	        </Toolbar>
	      </AppBar>
      </div>
  	);
  }
}

export default withStyles(styles)(TopBar);