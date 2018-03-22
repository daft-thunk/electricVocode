import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider, Button, Modal, Popconfirm, message } from 'antd';
import { Test } from './Test';
import { fetchUserSnippets } from '../store/snippets';
import SnippetView from './SnippetView';

class Snippets extends Component {
  constructor() {
    super();

  }

  componentDidMount() {
    this.props.fetchSnippets(this.props.userId);
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
            <Button icon="edit" /> :
            <Button icon="fork" />
          }
          <Divider type="vertical" />
          <Popconfirm title={remText} onConfirm={confirm} okText="Yes" cancelText="No" >
            <Button type="danger" icon="close" />
          </Popconfirm>
        </span>
      )
    }];
    return (
      <div>
        <h2>Manage Snippets</h2>
        <Table dataSource={this.props.snippets} columns={columns} />
      </div>
    );
  }

}

const mapDispatch = (dispatch) => {
  return {
    fetchSnippets(userId) {
      dispatch(fetchUserSnippets(userId));
    }
  };
};

const mapState = (state) => {
  return {
    snippets: state.snippets,
    userId: 2
  };
};

export default connect(mapState, mapDispatch)(Snippets);
