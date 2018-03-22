import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';

export default class SnippetView extends Component {
  constructor() {
    super()

    this.state = { visible: false }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>View</Button>
        <Modal
          title={this.props.command}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>{this.props.code}</p>
        </Modal>
      </div>
    );
  }
}
