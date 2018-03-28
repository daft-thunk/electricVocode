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
      <div className="main-content" style={{height:"100vh"}}>
        <webview src={`http://` + location} style={{width: '100%', height: '100%'}} />
      </div>
    );
  }
}

