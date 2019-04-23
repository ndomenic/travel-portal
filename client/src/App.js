import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor (props) {
    super(props);

    //Bind the class functions
    this.getFromDB = this.getFromDB.bind(this);
    this.addToDB = this.addToDB.bind(this);
    this.deleteAllFromDB = this.deleteAllFromDB.bind(this);

    console.log(process.env.REACT_APP_API);

    this.getFromDB();
  }

  getFromDB() {
    axios.get(process.env.REACT_APP_API + '/getAllFromDB')
    .then(response => console.log(response.data["rows"]))
  }

  addToDB() {
    axios.post(process.env.REACT_APP_API + '/addToDB');
    this.getFromDB();
  }

  deleteAllFromDB() {
    axios.post(process.env.REACT_APP_API + '/deleteAllFromDB');
    this.getFromDB();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Hello, world!
          </p>
          <button
            onClick={this.addToDB}>
            Add To DB
          </button>
          <button
            onClick={this.deleteAllFromDB}>
            Delete All From DB
          </button>
        </header>
      </div>
    );
  }
}

export default App;
