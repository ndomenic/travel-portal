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

  state = {
    done: 0,
    progress: ""
  }

  updateData(key, value) {
    this.data[key] = value;
  }

  onSubmit() {
    let files = this.data["files"];
    let name = this.data["name"];
    this.data["numFiles"] = files.length;
    let ths = this;

    ths.setState({done: 0, progress: "Beginning upload..."});

    axios.post(process.env.REACT_APP_API + '/uploadData', this.data).then(function (response) {
      let progress = 0 + " of " + files.length + " files uploaded";
      ths.setState({done: 0, progress: progress});

      for (let i = 0; i < files.length; i++) {
        var fd = new FormData();
        fd.append(name + "," + response.data["id"], files[i]);
        fd.append("test", response.data["id"]);

        axios.post(process.env.REACT_APP_API + '/uploadPicture', fd).then(function (response) {
          ths.setState({done: ths.state.done + 1, progress: ths.state.done + " of " + files.length + " files uploaded"}, function () {
            let progress = ths.state.done + " of " + files.length + " files uploaded";

            ths.setState({done: ths.state.done, progress: progress});
          });
        });
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
            <br/><br/>
            {this.state.progress}
          </form>
        </main>
      </div>
    );
  }
}

export default App;
