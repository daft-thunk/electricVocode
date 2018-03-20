import React, { Component } from 'react';
import { connect } from 'react-redux';
// import fs from 'fs';

class FileSystem extends Component {

  constructor() {
    super()

    this.state = {
      filename: ''
    }

    this.saveFile = this.saveFile.bind(this);
    this.editFilename = this.editFilename.bind(this);
  }

  editFilename(event) {
    event.preventDefault();
    let filename = event.target.value;
    console.log(filename)
    this.setState({filename});
  }

  saveFile() {
    console.log(this.props.text)
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/javascript;charset=utf-8,' + encodeURIComponent(this.props.text));
    pom.setAttribute('download', this.state.filename + '.js');

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    }
    else {
      pom.click();
    }
  }

  render() {
    return (
      <div>
        <div>
        <input name="filename" type="text" onChange={this.editFilename} value={this.state.filename} />
        <button onClick={this.saveFile}>Save</button>
        </div>
        <input type="file" onChange={this.props.loadFile} />
      </div>
    )
  }
}

const mapState = (state, ownProps) => {
  return {
    text: ownProps.text,
    loadFile: ownProps.loadFile
  }
}

export default connect(mapState)(FileSystem);
