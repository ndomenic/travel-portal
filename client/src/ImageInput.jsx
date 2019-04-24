import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ImageUploader from 'react-images-upload';
import './App.css';

const styles = theme => ({
});

class ImageInput extends Component {
  constructor(props) {
    super(props);
     this.state = { pictures: [] };
     this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({pictures: this.state.pictures.concat(pictureFiles),});
    console.log(this.state);
  }

  render() {
  	return (
  		<div>
        <ImageUploader
          className="ImageDiv"
          withIcon={false}
          withLabel={false}
          withPreview={true}
          buttonText='Choose Images'
          onChange={this.onDrop}
          imgExtension={['.jpg', '.jpeg', '.gif', '.png', '.gif']}
          maxFileSize={10485760}
        />
      </div>
  	);
  }
}

export default withStyles(styles)(ImageInput);