import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FileSystem from './FileSystem';
import SnippetAddEdit from './SnippetAddEdit';
import {removeUser} from '../store/user';
import { Button } from 'antd';

// these are now being imported in the global css file:
// require('codemirror/lib/codemirror.css');
// require('codemirror/theme/material.css');
// require('codemirror/theme/neat.css');

// codemirror formatting (js files)
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'I ♥ VoCode',
      newCommand: false,
      cursor: { line: 0, ch: 0, sticky: null }
    };
    this.getTextAroundCursor = this.getTextAroundCursor.bind(this);
    this.getCurrentValue = this.getCurrentValue.bind(this);
    this.getCursorPosition = this.getCursorPosition.bind(this);
    this.setCursorPosition = this.setCursorPosition.bind(this);
    this.setCursorPositionToState = this.setCursorPositionToState.bind(this);
    this.loadFile = this.loadFile.bind(this);
    this.toSignIn = this.toSignIn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.output.length < nextProps.output.length) {
      // this.setState({ newCommand: true });
      const output = nextProps.output;
      const newCommand = output[output.length - 1];
      this.setState(prevState => {
        const prevValue = this.getTextAroundCursor(prevState);
        return {
          value:
            prevValue.before.join('\n') +
            newCommand +
            prevValue.after.join('\n')
        };
      });
    }
  }

  componentDidMount() {
    if (this.props.currSnippet.code !== undefined) {this.setState({value: this.props.currSnippet.code});}
  }

  loadFile(event) {
    const loaded = evt => {
      let fileString = evt.target.result;
      this.setState({ value: fileString });
    };

    const file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = loaded;
    reader.readAsText(file, 'UTF-8');
  }

  getTextAroundCursor(state) {
    const { cursor } = state;
    const arr = state.value.split('\n');
    const targetLine = arr[cursor.line];
    const before = arr.slice(0, cursor.line);
    const after = arr.slice(cursor.line + 1);
    before.push(targetLine.slice(0, cursor.ch));
    return { before, after: [targetLine.slice(cursor.ch), ...after] };
  }

  getCursorPosition() {
    // doc.getCursor(?start: string) → {line, ch}
    return this.codemirror.editor.getCursor();
  }

  setCursorPositionToState(cursorObject) {
    this.setState({ cursor: cursorObject });
  }

  setCursorPosition() {
    //     doc.setCursor(pos: {line, ch}|number, ?ch: number, ?options: object)
    // Set the cursor position. You can either pass a single {line, ch} object, or the line and the character as two separate parameters. Will replace all selections with a single, empty selection at the given position. The supported options are the same as for setSelection.
    this.codemirror.editor.setCursor({ pos: { line: 0 } });
  }

  getCurrentValue() {
    const { output } = this.props;
    if (!output || !output.length || !this.state.newCommand) {
      return this.state.value;
    }
    // this.setState({newCommand: false})
    // const newText = this.state.value + output[output.length - 1]

    // GOAL: insert new command where the cursor is, not just appending to end of text.

    return this.state.value + output[output.length - 1];
    // Not actually sure how this^ is working at all.

    // return this.state.value
  }

  toSignIn(ev) {
    ev.preventDefault();
    this.props.history.push('/');
    this.props.resetUser();
  }

  render() {
    const options = {
      mode: 'javascript',
      theme: 'material',
      lineNumbers: true,
      indentUnit: 2,
      tabSize: 2,
      lineWrapping: true,
      autofocus: true
    };

    return (
      <div>
        {/*FORM: Name / Command / Save Button*/}
        {
          this.props.user.id === 5 ? <Button onClick={this.toSignIn} >Sign In</Button> :
          <SnippetAddEdit text={this.state.value} mode={this.props.mode} command={this.props.currSnippet.command} description={this.props.currSnippet.description} name="nameee" />
        }
        {/*TEXT EDITOR*/}
        <CodeMirror
          ref={codemirror => {
            this.codemirror = codemirror;
          }}
          value={this.getCurrentValue()}
          options={options}
          onCursorActivity={() => {
              this.setCursorPositionToState(this.getCursorPosition());

          }}
          onBeforeChange={(editor, data, value) => {
            this.setState({ value });
          }}
        />
        {/*FILE SYSTEM: filename / upload file*/}
        <FileSystem text={this.state.value} loadFile={this.loadFile} />
      </div>
    );
  }
}

const mapState = (state, ownProps) => {
  return ({
    output: state.decoder,
    mode: state.mode,
    currSnippet: state.currSnippet,
    user: state.user,
    history: ownProps.history
  });
};

const mapDispatch = dispatch => ({
  resetUser() {
    dispatch(removeUser());
  }
});

export default connect(mapState, mapDispatch)(CodeEditor);
