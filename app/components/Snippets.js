import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider, Button } from 'antd';
import { Test } from './Test';
import { fetchUserSnippets } from '../store/snippets'

class Snippets extends Component {
  constructor() {
    super()

  }

  componentDidMount() {
    this.props.fetchSnippets(3)
  }

  render() {
    const columns = [{
      title: 'Command',
      dataIndex: 'command',
      key: 'command',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Link to={`/snippet/${record.id}`} >View</Link>
          <Divider type="vertical" />
          <Button><Icon type="plus-square" /></Button>
        </span>
      )
    }]
    return (
      <div>
        <h2>Manage Snippets</h2>
        <Table dataSource={this.props.snippets} columns={columns} />
      </div>
    )
  }

}

const mapDispatch = (dispatch) => {
  return {
    fetchSnippets(userId) {
      dispatch(fetchUserSnippets(userId));
    }
  }
}

const mapState = (state) => {
  return {
    snippets: state.snippets
  }
}

export default connect(mapState, mapDispatch)(Snippets)
