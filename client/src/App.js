import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import axios from 'axios';
import TopBar from './TopBar';
import SelectName from './SelectName';
import Description from './Description';
import Location from './Location';
import ImageInput from './ImageInput';
import FileProgress from './FileProgress';

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

axios.defaults.withCredentials = true;

const SubmitButton = withStyles({
  root: {
    marginTop: '10px'
  }
})(Button);

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor (props) {
    super(props);
    this.data = {}

    //Bind the class functions
    this.updateData = this.updateData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    axios.get(process.env.REACT_APP_API + '/testSession').then(function(response) {
      console.log(response.data)
    });
  }

  state = {
    done: 0,
    progress: "",
    uploadProgress: []
  }

  updateData(key, value) {
    this.data[key] = value;
  }

  onSubmit() {
    const { cookies } = this.props;

    //Get data from cookies
    this.data['name'] = cookies.get('name');
    this.data['location'] = cookies.get('location');
    this.data['description'] = cookies.get('description');
    



    //Set up some variables
    let files = this.data["files"];
    this.data["numFiles"] = files.length;
    this.data["fileNames"] = []
    let ths = this;
    let uploadProgress = [];




    
    let test = cookies.get('files');
    console.log(test);

    //File the uploadProgress and fileNames array with the names and progress of each file
    for (let i = 0; i < files.length; i++) {
      uploadProgress.push([files[i].name, 0]);
      this.data["fileNames"].push(files[i].name);
    }

    //Set the state to let the user know the state of the upload
    ths.setState({done: 0, progress: "Beginning upload..."});
    ths.setState({uploadProgress: uploadProgress});

    //Send the images metadata to the server
    axios.post(process.env.REACT_APP_API + '/uploadData', this.data).then(function (response) {
      //Provide user progress
      let progress = 0 + " of " + files.length + " files uploaded";
      ths.setState({progress: progress});

      //Upload each file individually to the server to allow poor connections a chance
      for (let i = 0; i < files.length; i++) {
        var fd = new FormData();
        fd.append("filename", files[i]);

        axios.post(process.env.REACT_APP_API + '/uploadPicture', fd, 
          {onUploadProgress: function(progressEvent) {
            //Show upload progress for each file to the user
            uploadProgress[i][1] = (progressEvent.loaded / progressEvent.total * 100).toFixed(2);;
            ths.setState({uploadProgress: uploadProgress});
          }}).then(function (response) {
            //Update the state with the new information
            ths.setState({done: ths.state.done + 1, progress: ths.state.done + " of " + files.length + " files uploaded"}, function () {
              //Ensure that the UI is populated with up to date information
              let progress = ths.state.done + " of " + files.length + " files uploaded";
              ths.setState({done: ths.state.done, progress: progress});
          });
        });
      }
    });
  }

  render() {
    //A list of the files that are in the progress of being uploaded
    var fileList = this.state.uploadProgress.map(function(file) {
      return <FileProgress key={file[0]} fileName={file[0]} progress={file[1]}/>;
    })

    return (
      <div className="App">
        <header>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </header>
        <main>
          <TopBar/>
          <form>
            <SelectName/>
            <ImageInput updateData={this.updateData}/>
            <Location/>
            <Description/>
            <SubmitButton variant="contained" color="primary" onClick={this.onSubmit}>
              Submit
            </SubmitButton>
            <br/><br/>
            {this.state.progress}
          </form>
          <br/><br/>
          <div>
            {fileList}
          </div>
        </main>
      </div>
    );
  }
}

export default withCookies(App);
