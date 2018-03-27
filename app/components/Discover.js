import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider, Button, Modal, Popconfirm, message } from 'antd';
import { Test } from './Test';
import { fetchAllSnippets } from '../store/allSnippets';
import {addUserSnippetConnection} from '../store/snippets';
import SnippetView from './SnippetView';

class Discover extends Component {
  constructor() {
    super();

    this.addCode = this.addCode.bind(this);
  }

  componentDidMount() {
    this.props.fetchSnippets();
  }

  addCode(snippetId) {
    this.props.addSnippetConnection(this.props.userId, snippetId);
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
      title: 'View / Add Code',
      key: 'code',
      render: (text, record) => (
        <span className="discover-btn-row">
          <SnippetView code={record.code} command={record.command} />
          <span className="discover-add-btn" ><Button onClick={() => this.addCode(record.id)} icon="plus-circle-o" /></span>
        </span>
      )
    }];
    return (
      <div className="main-content">
        <h2 className="title">Discover</h2>
        <Table dataSource={this.props.allSnippets} columns={columns} pagination={{pageSize: 8}}/>
      </div>
    );
  }

}

const mapDispatch = (dispatch) => {
  return {
    fetchSnippets() {
      dispatch(fetchAllSnippets());
    },
    addSnippetConnection(userId, snippetId) {
      dispatch(addUserSnippetConnection(userId, snippetId));
    }
  };
};

const mapState = (state) => {
  return {
    allSnippets: state.allSnippets,
    userId: state.user.id
  };
};

export default connect(mapState, mapDispatch)(Discover);
