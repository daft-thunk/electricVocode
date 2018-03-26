import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import { Card } from 'antd';
const { Meta } = Card;

class Profile extends Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {

  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {
    return (
      <div>
        <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src="https://www.fillmurray.com/200/300" />}
        >
          <Meta
            title="Europe Street beat"
            description="www.instagram.com"
          />
        </Card>
        <h1>My Sites: </h1>
        <ProfileForm />
      </div>
    )
  }
}

//const WrappedAdvancedProfile = Form.create()(Profile);

export default withRouter(connect()(Profile));
