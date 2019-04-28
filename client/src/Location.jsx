import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

const styles = theme => ({
  textField: {
    marginLeft: '10px',
    marginRight: '10px',
  }
});

class Location extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    location: ""
  }

  componentDidMount() {
    const {cookies} = this.props;
    let location = cookies.get('location')
    if (location) this.setState({'location': location});
  }

  handleChange = name => event => {
    const {cookies} = this.props;
    this.setState({[name]: event.target.value});
    cookies.set('location', event.target.value);
  };

  render() {
    const {classes} = this.props;

  	return (
  		<div className={classes.textField}>
        <TextField
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

export default withCookies(withStyles(styles)(Location));