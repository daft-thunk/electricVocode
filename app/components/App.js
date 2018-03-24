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
        <div>
          <div style={{margin: '0 auto'}} >
            <CodeEditor />
            {/*
         <button>
              <Link to="/test" style={{ display: 'block', height: '100%' }}>
                test: button
              </Link>
            </button>
            */}
          </div>
          <div style={{width: 0}}>
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
