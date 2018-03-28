import React from 'react';
import { Table } from 'antd';
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
  },
  {
    title: 'Global',
    dataIndex: 'global',
    key: 'global'
  }
];

const data = [
  {
    key: '1',
    keyCombo: 'Alt + Z',
    func: 'Start Listening (2.5 seconds)',
    global: 'Yes'
  },
  {
    key: '2',
    keyCombo: 'Alt + S',
    func: 'Open Tray Menu',
    global: 'Yes'
  }
];

/**
 * STATELESS COMPONENT
 */
const KeyboardShortcuts = props => {
  return <Table className='main-content' columns={columns} dataSource={data} pagination={false}/>;
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
