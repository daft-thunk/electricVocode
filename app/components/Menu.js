import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import { Menu, Icon } from 'antd';
import electron from 'electron';
import { setSnippet } from '../store/currSnippet';

const SubMenu = Menu.SubMenu;

class MenuBar extends Component {
  constructor(props) {
    super(props);

    this.resetCurrDiv = this.resetCurrDiv.bind(this);
  }

  resetCurrDiv(ev) {
    ev.preventDefault();
    console.log('HITTTINGGG')
    this.props.history.push('/Main')
    this.props.resetCurrSnippet();
  }

  render() {
    return (
      <div id="side-menu" style={{ width: 256 }}>
        <Menu
          className={this.props.user.id ? 'menu-bar' : 'menu-bar-hidden'}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1" >
            <Link to="/Main" onClick={this.resetCurrDiv}>
              <Icon type="desktop" />
              <span>New Snippet</span>
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
                onClick={e => {
                  e.preventDefault();
                  electron.shell.openExternal(
                    `http://github.com/daft-thunk/electricVocode#vocode`
                  );
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

const mapState = (state, ownProps) => {
  console.log('OWN PROPS',ownProps)
  return {
    user: state.user,
    history: ownProps.history
  };
};

const mapDispatch = dispatch => {
  return {
    resetCurrSnippet() {
      dispatch(setSnippet({}));
    }
  }
}

export default connect(mapState, mapDispatch)(MenuBar);
