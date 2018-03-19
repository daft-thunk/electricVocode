import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { connect } from 'react-redux';

require('codemirror/lib/codemirror.css');
require('codemirror/theme/material.css');
require('codemirror/theme/neat.css');

require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');

export class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'I ♥ VoCode',
      newCommand: false,
      cursor: {line: 0, ch: 0, sticky: null}
    };
    this.getTextAroundCursor = this.getTextAroundCursor.bind(this);
    this.getCurrentValue = this.getCurrentValue.bind(this);
    this.getCursorPosition = this.getCursorPosition.bind(this);
    this.setCursorPosition = this.setCursorPosition.bind(this);
    this.setCursorPositionToState = this.setCursorPositionToState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props)
    if (this.props.output.length < nextProps.output.length) {
      // this.setState({ newCommand: true });
      const output = nextProps.output;
      const newCommand = output[output.length - 1];
      this.setState(prevState => {
        const prevValue = this.getTextAroundCursor(prevState);
        return {
          value: prevValue.before.join('\n') + newCommand + prevValue.after.join('\n')
        };
      });
    }
  }

  getTextAroundCursor(state) {
    console.log('props', this.props)
    console.log('state', state)
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
    this.setState({ cursor: cursorObject }, () => {
      console.log('on state:', this.state);
    });
  }

  setCursorPosition() {
    //     doc.setCursor(pos: {line, ch}|number, ?ch: number, ?options: object)
    // Set the cursor position. You can either pass a single {line, ch} object, or the line and the character as two separate parameters. Will replace all selections with a single, empty selection at the given position. The supported options are the same as for setSelection.
    this.codemirror.editor.setCursor({ pos: { line: 0 } });
  }

  getCurrentValue() {
    const { output } = this.props;
    if (!output || !output.length || !this.state.newCommand) {
      console.log('VALUE', this.state.value, output);
      return this.state.value;
    }
    console.log('VALUE / NEW COMMAND', this.state.value, output);
    // this.setState({newCommand: false})
    // const newText = this.state.value + output[output.length - 1]

    // GOAL: insert new command where the cursor is, not just appending to end of text.

    return this.state.value + output[output.length - 1];
    // Not actually sure how this^ is working at all.

    // return this.state.value
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
      <CodeMirror
        ref={codemirror => {
          this.codemirror = codemirror;
        }}
        value={this.getCurrentValue()}
        options={options}
        onCursorActivity={evt => {
          // console.log('CODEMIRROR',this.codemirror)
          console.log('CURSOR MOVED:', this.getCursorPosition());
          // console.log(evt)
          Promise.resolve(
            this.setCursorPositionToState(this.getCursorPosition())
          ).then(() => {
            // console.log(this.getTextAroundCursor(this.state));
          });
        }}
        onBlur={evt => {
          console.log('BLUR:', evt);
              }}
        onBeforeChange={(editor, data, value) => {
          this.setState({ value });
        }}
        onChange={(editor, data, value) => {
          [editor, data, value].forEach(item => {
            // console.log(item)
          });
          // console.log(this.state.value, this.props.output)
          // this.setState(prevState => {
          //   return {value: prevState.value + this.props.output}
          // })
        }}
      />
    );
  }
}

const mapState = state => ({
  output: state.arty
});

export default connect(mapState)(CodeEditor);
