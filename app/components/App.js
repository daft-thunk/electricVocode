import React, { Component } from 'react';
import { connect } from 'react-redux';
import {CodeEditor, Mic, SnippetAddEdit} from '.';
import { Link, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { fetchUserSnippets } from '../store/snippets';
import electron from 'electron';

/*eslint-disable react/prefer-stateless-function*/
class App extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.fetchSnippets(this.props.user.id);
  }

  render() {
    electron.remote.globalShortcut.register('Alt+q', () => {
       this.props.history.push('httpCodes');
    });
    return (
      <div className="App main-content">
        <header className="App-header">
          <h1 className="App-title">VOCODE</h1>
        </header>
        <div>
          <div style={{margin: '0 auto'}} >
            <CodeEditor history={this.props.ownProps.history}/>
            {/*
         <button>
              <Link to="/test" style={{ display: 'block', height: '100%' }}>
                test: button
              </Link>
            </button>
            */}
          </div>
        </div>
        <Mic appProps={this.props.snippets} />
      </div>
    );
  }
}

const mapState = (state, ownProps) => ({
  router: state.router,
  ownProps,
  user: state.user,
  snippets: state.snippets
});

const mapDispatch = (dispatch) => {
  return {
    fetchSnippets(userId) {
      dispatch(fetchUserSnippets(userId));
    }
  };
};

// const mapDispatch = dispatch => {
//   return {
//     pushHistory(location) {
//       return dispatch(push(location))
//     }
//   }
// }

export default withRouter(connect(mapState, mapDispatch)(App));
