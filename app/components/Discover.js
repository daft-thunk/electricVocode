import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider, Button, Modal, Popconfirm, message } from 'antd';
import { Test } from './Test';
import { fetchUserSnippets, removeUserSnippetConnection } from '../store/snippets';
import SnippetView from './SnippetView';

class Discover extends Component {
  constructor() {
    super();

    this.removeSnippet = this.removeSnippet.bind(this)
  }

  componentDidMount() {
    this.props.fetchSnippets(this.props.userId);
  }

  removeSnippet(snippetId) {
    this.props.disconnectSnippet(this.props.userId, snippetId);
    message.info('Snippet has been removed')
  }

  render() {
    const remText = 'Remove this snippet?';
    const confirm = () => {message.info('Snippet has been removed')}
    const columns = [{
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Code',
      key: 'code',
      render: (text, record) => (
        <span className="discover-btn-row">
          <SnippetView code={record.code} command={record.command} />
          <span className="discover-add-btn" ><Button icon="plus-circle-o" /></span>
        </span>
      )
    }];
    return (
      <div className="main-content">
        <h2>Discover New Snippets</h2>
        <Table dataSource={this.props.snippets} columns={columns} />
      </div>
    );
  }

}

const mapDispatch = (dispatch) => {
  return {
    fetchSnippets(userId) {
      dispatch(fetchUserSnippets(userId));
    },
    disconnectSnippet(userId, snippetId) {
      dispatch(removeUserSnippetConnection(userId, snippetId))
    }
  };
};

const mapState = (state) => {
  return {
    snippets: state.snippets,
    userId: 2
  };
};

export default connect(mapState, mapDispatch)(Discover);
