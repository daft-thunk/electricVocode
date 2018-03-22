import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider, Button } from 'antd';
import { Test } from './Test';
import { fetchUserSnippets } from

export default class Snippets extends Component {
  constructor() {
    super()

    this.state = {
      snippets: {}
    }
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
        <Table dataSource={this.nothing} columns={columns} />
      </div>
    )
  }

}

