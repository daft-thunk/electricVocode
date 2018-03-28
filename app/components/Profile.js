import React, { Component } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import ChangeInfoForm from './ChangeInfoForm';
const { Meta } = Card;

class Profile extends Component {
  state = {
    expand: false,
  };

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  render() {
    const { user } = this.props
    return (
      <div className="profile-page">
        <div className="profile-info-section">
          <div className="profile-card">
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src="http://1.bp.blogspot.com/-rQ1JQzDTXTU/UjZ4NQCOSXI/AAAAAAAAApg/CQQAWFN9d4w/s1600/Music_Daft_Punk-cdb13d892a544d3a8697b6ab6621b103.JPEG" />}
          >
            <Meta
              title={`${user.firstName} ${user.lastName}`}
              description={user.email}
            />
          </Card>
          </div>
          <div className="reset-section">
          <ChangeInfoForm info="email" />
          <ChangeInfoForm info="password" />
          </div>
        </div>
        <div className="flex-form">
        <h1>My Sites: </h1>
        <ProfileForm />
        </div>
      </div>
    );
  }
}

const mapProps = state => {
  return {
    user: state.user,
  };
};

export default withRouter(connect(mapProps)(Profile));
