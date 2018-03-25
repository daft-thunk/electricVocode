import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider, Button, Modal, Popconfirm, message } from 'antd';
import { Test } from './Test';
import { fetchUserSnippets, removeUserSnippetConnection } from '../store/snippets';
import SnippetView from './SnippetView';
import { setSnippet } from '../store/currSnippet';
import { setMode } from '../store/mode';

class Snippets extends Component {
  constructor() {
    super();

    this.removeSnippet = this.removeSnippet.bind(this);
    this.editSnippet = this.editSnippet.bind(this);
  }

  componentDidMount() {
    this.props.fetchSnippets(this.props.userId);
  }

  removeSnippet(snippetId) {
    this.props.disconnectSnippet(this.props.userId, snippetId);
    message.info('Snippet has been removed')
  }

  forkSnippet(snippetId) {

  }

  editSnippet(snippetId) {
    this.props.history.push('/main');
    const snip = this.props.snippets.find(snippet => snippet.id === snippetId);
    this.props.editSnippet(snip);
  }

  render() {
    console.log(this.props.snippets);
    const remText = 'Remove this snippet?';
    const confirm = () => {message.info('Snippet has been removed')}
    const columns = [{
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
    },
    {
      title: 'Code',
      key: 'id',
      render: (text, record) => (
        <span>
          <SnippetView code={record.code} command={record.command} />
        </span>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          {
            this.props.userId === record.creatorId ?
            <Button icon="edit" onClick={() => this.editSnippet(record.id)} /> :
            <Button icon="fork" />
          }
          <Divider type="vertical" />
          <Popconfirm title={remText} onConfirm={() => this.removeSnippet(record.id)} okText="Yes" cancelText="No" >
            <Button type="danger" icon="close" />
          </Popconfirm>
        </span>
      )
    }];
    return (
      <div className="main-content">
        <h2>Manage Snippets</h2>
        <Table dataSource={this.props.snippets} columns={columns} />
      </div>
    );
  }

}

const mapState = (state, ownProps) => {
  return {
    snippets: state.snippets,
    userId: state.user.id,
    history: ownProps.history
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSnippets(userId) {
      dispatch(fetchUserSnippets(userId));
    },
    disconnectSnippet(userId, snippetId) {
      dispatch(removeUserSnippetConnection(userId, snippetId))
    },
    editSnippet(snippet) {
      dispatch(setSnippet(snippet));
      dispatch(setMode('edit'))
    }
  };
};

export default connect(mapState, mapDispatch)(Snippets);
