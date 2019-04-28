import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250
  }
});

class SelectName extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    name: ""
  }

   componentDidMount() {
    const {cookies} = this.props;
    let name = cookies.get('name');
    if (name) this.setState({'name': name});
  }

  handleChange(event) {
    const {cookies} = this.props;
    this.setState({ [event.target.name]: event.target.value });
    cookies.set('name', event.target.value);
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

export default withCookies(withStyles(styles)(SelectName));