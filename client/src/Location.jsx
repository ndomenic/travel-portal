import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: '10px',
    marginRight: '10px',
  }
});

class Location extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    location: ""
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
    this.props.updateData("location", event.target.value);
  };

  render() {
    const { classes } = this.props;

  	return (
  		<div className={classes.textField}>
        <TextField
          id="standard-multiline-flexible"
          label="Location"
          fullWidth
          value={this.state.location}
          onChange={this.handleChange('location')}
          margin="normal"
        />
      </div>
  	);
  }
}

export default withStyles(styles)(Location);