import React, { Component } from 'react';
import { connect } from 'react-redux';
import {CodeEditor, Mic, Test, SnippetAddEdit} from '.';
import { Link, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';


/*eslint-disable react/prefer-stateless-function*/
class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props.ownProps);
    console.log(this.props);
    return (
      <div className="App">
        <header className="App-header">
        <h1>VOCODE</h1>
        <p className="App-intro">Add code snippets with your voice</p>
        </header>
        <Link to="/snippets">Link to Snippets</Link>
        <Link to="/">Link to Login</Link>
        <Link to="/signup">Link to Signup</Link>
        <div className="flex">
          <div style={{flex: 3}}>
            <CodeEditor />
            {/*
         <button>
              <Link to="/test" style={{ display: 'block', height: '100%' }}>
                test: button
              </Link>
            </button>
            */}
          </div>
          <div style={{flex: 1}}>
            <Mic />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  router: state.router,
  ownProps
});

// const mapDispatch = dispatch => {
//   return {
//     pushHistory(location) {
//       return dispatch(push(location))
//     }
//   }
// }

export default withRouter(connect(mapState)(App));
