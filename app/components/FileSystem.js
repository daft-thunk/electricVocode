import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Upload, Icon, Input } from 'antd';

const FormItem = Form.Item;

class FileSystem extends Component {
  constructor() {
    super();

    this.state = {
      filename: ''
    };

    this.saveFile = this.saveFile.bind(this);
    this.editFilename = this.editFilename.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  normFile = e => {
    // ant file upload
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  editFilename(event) {
    event.preventDefault();
    let filename = event.target.value;
    console.log(filename);
    this.setState({ filename });
  }

  saveFile() {
    console.log(this.props.text);
    var pom = document.createElement('a');
    pom.setAttribute(
      'href',
      'data:text/javascript;charset=utf-8,' +
        encodeURIComponent(this.props.text)
    );
    pom.setAttribute('download', this.state.filename + '.js');

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents');
      event.initEvent('click', true, true);
      pom.dispatchEvent(event);
    } else {
      pom.click();
    }
  }

  uploadFile() {
    document.getElementById('file-load-hidden').click();
  }

  render() {
    return (
      <div className="responsive-container">
        <div className="file-input">
          <Input.Group>
            <Input
              name="filename"
              type="text"
              placeholder="Enter a filename"
              onChange={this.editFilename}
              value={this.state.filename}
              style={{maxWidth: 500}}
            />
            <Button onClick={this.saveFile}>
              Save Text to Disk
            </Button>
          </Input.Group>
        </div>
        <div className="file-input">
        <input
          type="file"
          onChange={this.props.loadFile}
          style={{ display: 'none' }}
          id="file-load-hidden"
        />
        <Button onClick={this.uploadFile}>
          <Icon type="upload" />Upload File
        </Button>
        <h4>Warning: Will overwrite current text</h4>
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return {
    text: ownProps.text,
    loadFile: ownProps.loadFile
  };
};

export default connect(mapState)(FileSystem);
