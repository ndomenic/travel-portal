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

    this.selectName = React.createRef();
    this.imageInput = React.createRef();
    this.description = React.createRef();

    //Bind the class functions
    this.getFromDB = this.getFromDB.bind(this);
    this.updateData = this.updateData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.getFromDB();
  }

  updateData(key, value) {
    this.data[key] = value;
  }

  onSubmit() {
    axios.post(process.env.REACT_APP_API + '/uploadData', this.data);
    console.log(this.data);
  }

  getFromDB() {
    axios.get(process.env.REACT_APP_API + '/getAllFromDB')
    .then(response => console.log(response.data["rows"]))
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
            <SelectName ref={this.selectName} updateData={this.updateData}/>
            <ImageInput ref={this.imageInput} updateData={this.updateData}/>
            <Description ref={this.description} updateData={this.updateData}/>
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
