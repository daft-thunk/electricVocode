import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    this.forkSnippet = this.forkSnippet.bind(this);
    this.newSnippet = this.newSnippet.bind(this);
  }

  componentDidMount() {
    this.props.fetchSnippets(this.props.userId);
  }

  removeSnippet(snippetId) {
    this.props.disconnectSnippet(this.props.userId, snippetId);
    message.info('Snippet has been removed');
  }

  forkSnippet(snippetId) {
    this.props.history.push('/main');
    const snip = this.props.snippets.find(snippet => snippet.id === snippetId);
    this.props.forkSnippet(snip);
  }

  editSnippet(snippetId) {
    this.props.history.push('/main');
    const snip = this.props.snippets.find(snippet => snippet.id === snippetId);
    this.props.editSnippet(snip);
  }

  newSnippet(event) {
    event.preventDefault();
    this.props.history.push('/main');
    this.props.addSnippet()
  }

  render() {
    const remText = 'Remove this snippet?';
    const confirm = () => {message.info('Snippet has been removed');};
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
            <Button icon="fork" onClick={() => this.forkSnippet(record.id)} />
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
        <h2 className="title">Your Snippets</h2>
        <Table dataSource={this.props.snippets} columns={columns} />
        <div className="center flex">
        <Button type="primary" icon="plus" onClick={this.newSnippet} pagination={{pageSize: 8}}>Add Snippet</Button>
        </div>
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
      dispatch(removeUserSnippetConnection(userId, snippetId));
    },
    editSnippet(snippet) {
      dispatch(setSnippet(snippet));
      dispatch(setMode('edit'));
    },
    forkSnippet(snippet) {
      dispatch(setSnippet(snippet));
      dispatch(setMode('add'));
    },
    addSnippet() {
      dispatch(setMode('add'));
    }
  };
};

export default connect(mapState, mapDispatch)(Snippets);
