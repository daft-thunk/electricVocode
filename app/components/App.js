import React, { Component } from 'react';
import { connect } from 'react-redux';
import {CodeEditor, Mic, Test, SnippetAddEdit} from '.';
import { Link, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import electron from 'electron';

/*eslint-disable react/prefer-stateless-function*/
class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    electron.remote.globalShortcut.register('Alt+q', () => {
       this.props.history.push('httpCodes');
    });
    console.log(this.props.ownProps);
    console.log(this.props);
    return (
      <div className="App main-content">
        <header className="App-header">
          <h1 id="home-title">VOCODE</h1>
        </header>
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
  ownProps,
  user: state.user
});

// const mapDispatch = dispatch => {
//   return {
//     pushHistory(location) {
//       return dispatch(push(location))
//     }
//   }
// }

export default withRouter(connect(mapState)(App));
