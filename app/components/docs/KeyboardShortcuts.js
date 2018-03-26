import React from 'react';
import { Table, Icon, Divider } from 'antd';
import { connect } from 'react-redux';

const columns = [
  {
    title: 'Key Combination',
    dataIndex: 'keyCombo',
    key: 'keyCombo'
  },
  {
    title: 'Function',
    dataIndex: 'func',
    key: 'func'
  }
];

const data = [
  {
    key: '1',
    keyCombo: 'Alt + Z',
    func: 'Start Listening (2.5 seconds)'
  },
  {
    key: '2',
    keyCombo: 'Alt + S',
    func: 'Open Tray Menu'
  }
];

/**
 * STATELESS COMPONENT
 */
const KeyboardShortcuts = props => {
  return <Table columns={columns} dataSource={data} pagination={false}/>;
};

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {};
};

const mapDispatch = (dispatch, ownProps) => {
  return {};
};

export default connect(mapState, mapDispatch)(KeyboardShortcuts);
