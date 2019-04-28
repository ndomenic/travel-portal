import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

const UploadButton = withStyles({
  root: {
    marginTop: '10px'
  }
})(Button);

class ImageInput extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    len: 0
  }

  handleChange(event) {
    //const { cookies } = this.props;
    this.setState({len: event.target.files.length});
    this.props.updateData("files", event.target.files);
  };

  render() {
  	return (
  		<div>
        <input
          onChange={this.handleChange}
          hidden
          accept="image/*" 
          id="raised-button-file" 
          multiple 
          type="file" 
        /> 
        <label htmlFor="raised-button-file"> 
          <UploadButton component="span" variant="contained" color="primary"> 
            Choose Photos
          </UploadButton> 
        </label>
        <br/><br/>
        <label>
          {this.state.len} files are in the queue
        </label>
      </div>
  	);
  }
}

export default withCookies(ImageInput);