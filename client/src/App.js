import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import TopBar from './TopBar';

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
        <header>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </header>
        <main>
          <TopBar/>
          <button
            onClick={this.addToDB}>
            Add To DB
          </button>
          <button
            onClick={this.deleteAllFromDB}>
            Delete All From DB
          </button>
        </main>
      </div>
    );
  }
}

export default App;
