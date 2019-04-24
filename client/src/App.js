import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import axios from 'axios';
import TopBar from './TopBar';
import SelectName from './SelectName';
import Description from './Description';

const styles = theme => ({
  button: {
    marginTop: 0,
  }
});

const SubmitButton = withStyles({
  root: {
    marginTop: '10px'
  }
})(Button);

class App extends Component {
  constructor (props) {
    super(props);

    //Bind the class functions
    this.getFromDB = this.getFromDB.bind(this);

    this.getFromDB();
  }

  getFromDB() {
    axios.get(process.env.REACT_APP_API + '/getAllFromDB')
    .then(response => console.log(response.data["rows"]))
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <header>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </header>
        <main>
          <TopBar/>
          <form>
            <Card className="Card">
              <CardContent>
                <SelectName/>
                <Description/>
                <SubmitButton variant="contained" color="primary">
                  Submit
                </SubmitButton>
              </CardContent>
            </Card>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
