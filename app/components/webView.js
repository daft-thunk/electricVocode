import React, { Component } from 'react';

export default class SnippetView extends Component {
  constructor() {
    super()
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <webview src={`http://` + this.props.match.params.adress} style={{width: "80vw", height: "100vh"}}></webview>
      </div>
    );
  }
}
