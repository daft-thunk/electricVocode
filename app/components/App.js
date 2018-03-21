import React, { Component } from 'react';
import { connect } from 'react-redux';
import {CodeEditor, Mic, Test} from '.';
import { Link, withRouter } from 'react-router-dom';


/*eslint-disable react/prefer-stateless-function*/
class App extends Component {
  render() {
    // console.log(this.props.output)
    return (
      <div className="App">
        <header className="App-header">
          <h1>VOCODE</h1>
          <p className="App-intro">Add code snippets with your voice</p>
        </header>
        <div className="flex">
          <div style={{flex: 3}}>
            <CodeEditor />
            <Link to="/test">Link To Test</Link>
          </div>
          <div style={{flex: 1}}>
            <Mic />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({

});

export default withRouter(connect(mapState)(App));
