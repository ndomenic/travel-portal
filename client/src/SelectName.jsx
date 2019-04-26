import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250
  }
});

class SelectName extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    name: ""
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.updateData("name", event.target.value);
  };

  render() {
    const {classes} = this.props;

  	return (
  		<div>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="name-select">Name</InputLabel>
          <Select
            value={this.state.name}
            onChange={this.handleChange}
            inputProps={{
              name: 'name',
              id: 'name-select',
            }}
          >
            <MenuItem value="Andrew">Andrew</MenuItem>
            <MenuItem value="Dennis">Dennis</MenuItem>
            <MenuItem value="Jessica">Jessica</MenuItem>
            <MenuItem value="Nick">Nick</MenuItem>
          </Select>
        </FormControl>
      </div>
  	);
  }
}

export default withStyles(styles)(SelectName);