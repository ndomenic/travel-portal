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

class Description extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    description: ""
  }

  componentDidMount() {
    const {cookies} = this.props;
    let description = cookies.get('description');
    if (description) this.setState({'description': description});
  }

  handleChange = name => event => {
    const {cookies} = this.props;
    this.setState({[name]: event.target.value});
    cookies.set('description', event.target.value);
  };

  render() {
    const {classes} = this.props;

  	return (
  		<div className={classes.textField}>
        <TextField
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

export default withCookies(withStyles(styles)(Description));