import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CodeEditor, Mic, Test, SnippetAddEdit } from '.';
import { Link, withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Menu, Icon, Button } from 'antd';
import electron from 'electron';
import { setMode } from '../store/mode';

const SubMenu = Menu.SubMenu;

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleToggle: 'menu-bar-hidden'
    };
  }

  componentWillReceiveProps() {
    if (!this.props.user) {
      this.setState({ styleToggle: 'menu-bar' });
    }
  }

  render() {
    console.log(this.props.user);
    return (
      <div style={{ width: 256 }}>
        {/*<Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
    </Button>*/}
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
          className={this.state.styleToggle}
        >
          <Menu.Item key="1">
            <Link to="/Main">
              <Icon type="desktop" />
              <span>Sandbox</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/snippets">
              <Icon type="code" />
              <span style={{ color: 'white' }}>Snippets</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/discover">
              <Icon type="rocket" />
              <span>Discover</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/profile">
              <Icon type="smile-o" />
              <span>Profile</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="info-circle" />
                <span>About</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <Link to="/docs/voice-commands">Voice Commands</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/docs/keyboard-shortcuts">Keyboard Shortcuts</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <span
                onClick={(e) => {
                  e.preventDefault();
                  electron.shell.openExternal(`http://github.com/daft-thunk/electricVocode#vocode`)
                }}
              >
                Documentation
              </span>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

const mapState = state => {
  return {
    userId: state.user
  };
};

export default connect(mapState)(MenuBar);
