import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider } from 'antd';
import { Test } from './Test';

export default class Snippets extends Component {
  constructor() {
    super()

    this.state = {
      nothing: ''
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

