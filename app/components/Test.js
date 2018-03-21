import React, { Component } from 'react';
import { connect } from 'react-redux';
import {CodeEditor, Mic} from '.';
import { Link, withRouter } from 'react-router-dom';

class Test extends Component {
  render() {
    // console.log(this.props.output)
    return (
      <div className="App">
        <h1>You are on Test</h1>
      </div>
    );
  }
}

const mapState = state => ({

});

export default withRouter(connect(mapState)(Test));
