import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    marginLeft: '10px',
    marginRight: '10px',
  }
});

class Description extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    description: ""
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.value});
    this.props.updateData("description", event.target.value);
  };

  render() {
    const { classes } = this.props;

  	return (
  		<div className={classes.textField}>
        <TextField
          id="standard-multiline-flexible"
          label="Description"
          multiline
          fullWidth
          rowsMax="99"
          value={this.state.description}
          onChange={this.handleChange('description')}
          margin="normal"
        />
      </div>
  	);
  }
}

export default withStyles(styles)(Description);