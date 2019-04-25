import React, { Component } from 'react';

class FileProgress extends Component {
  state = {
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
  	return (
  		<div>
        <label>
          {this.props.fileName}: {this.props.progress} %
        </label>
      </div>
  	);
  }
}

export default FileProgress;