import React, { Component } from 'react';

export default class SnippetView extends Component {
  constructor() {
    super();
  }

  render() {
    // console.log('address match:', this.props);
    // this.props.match.params.address - matches one / after webView
    const webViewLen = '/webView'.length
    const location = this.props.location.pathname.slice(webViewLen + 1)
    return (
      <div>
        <webview src={`http://` + location} style={{width: '80vw', height: '100vh'}} />
      </div>
    );
  }
}

