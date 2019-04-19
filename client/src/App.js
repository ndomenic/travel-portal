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

    this.getFromDB();
  }

  getFromDB() {
    axios.get('http://localhost:8080/getAllFromDB')
    .then(response => console.log(response.data["rows"]))
  }

  addToDB() {
    axios.post('http://localhost:8080/addToDB');
    this.getFromDB();
  }

  deleteAllFromDB() {
    axios.post('http://localhost:8080/deleteAllFromDB');
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
