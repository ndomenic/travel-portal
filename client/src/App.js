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

axios.defaults.withCredentials = true;

const SubmitButton = withStyles({
  root: {
    marginTop: '10px'
  }
})(Button);

class App extends Component {
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
    //Set up some variables
    let files = this.data["files"];
    let name = this.data["name"];
    this.data["numFiles"] = files.length;
    let ths = this;
    let uploadProgress = [];

    //File the uploadProgress array with the names and progress of each file
    for (let i = 0; i < files.length; i++) {
      uploadProgress.push([files[i].name, 0]);
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
        fd.append(name + "," + response.data["id"], files[i]);

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
      return <FileProgress fileName={file[0]} progress={file[1]}/>;
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
            <SelectName updateData={this.updateData}/>
            <ImageInput updateData={this.updateData}/>
            <Location updateData={this.updateData}/>
            <Description updateData={this.updateData}/>
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

export default App;
