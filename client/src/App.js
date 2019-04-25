import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import axios from 'axios';
import TopBar from './TopBar';
import SelectName from './SelectName';
import Description from './Description';
import ImageInput from './ImageInput';

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
  }

  updateData(key, value) {
    this.data[key] = value;
  }

  onSubmit() {
    let files = this.data["files"];
    let name = this.data["name"];
    this.data["numFiles"] = files.length;

    axios.post(process.env.REACT_APP_API + '/uploadData', this.data).then(function (response) {
      for (let i = 0; i < files.length; i++) {
        var fd = new FormData();
        fd.append(name + "," + response.data["id"], files[i]);
        fd.append("test", response.data["id"]);
        axios.post(process.env.REACT_APP_API + '/uploadPicture', fd);
      }
    });
  }

  render() {
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
            <Description updateData={this.updateData}/>
            <SubmitButton variant="contained" color="primary" onClick={this.onSubmit}>
              Submit
            </SubmitButton>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
