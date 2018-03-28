import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUser } from '../store/user';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

/**
 * COMPONENT
 */
class ChangeUserInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {

      }
    };
    this.checkSubmit = this.checkSubmit.bind(this);
    this.validateInfo = this.validateInfo.bind(this);
  }
  checkSubmit(e, email, password) {
    e.preventDefault()
    console.log(e)
    this.setState({
      data: {
        ...this.validateInfo(e, email, password)
      }
    }, () => {
      if (this.state.data.validateStatus === 'success') {
        console.log(this.state.data.value)
        this.props.handleSubmit(this.props.user.id, this.state.data.value, this.props.info);
      }
    });
  }

  validateInfo(e, email) {
    if (this.props.info === 'email') {
      if (email === e.target.old.value) {
        return {
          validateStatus: 'success',
          value: e.target.new.value
        }
      }
      return {
        validateStatus: 'error',
        errorMsg: 'Incorrect email!',
      }
    }
    if (e.target.new.value === e.target.old.value) {
      return {
        validateStatus: 'success',
        value: e.target.new.value
      }
    }
    return {
      validateStatus: 'error',
      errorMsg: 'Incorrect password!',
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props;
    return (
      <div className="reset-forms">
        <Form onSubmit={(e) => this.checkSubmit(e, user.email, user.password)} name={this.props.info} className="">
          <h3>{`Reset ${this.props.info}:`}</h3>
          <FormItem
            validateStatus={this.state.data.validateStatus}
            help={this.state.data.errorMsg}
          >
              <Input
                name="old"
                prefix={
              <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            type={this.props.info === 'email' ? '' : 'password'}
            placeholder={this.props.info === 'email' ? 'Current Email' : 'New Password'}
            />
          </FormItem>
          <FormItem>
            <Input
              name="new"
              prefix={
                <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type={this.props.info === 'email' ? "" : "password"}
              placeholder={this.props.info === 'email' ? "New Email" : "Re-Type New Password"}
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}


const mapProps = state => {
  return {
    name: 'login',
    user: state.user
  };
};


const mapDispatch = dispatch => {
  return {
    handleSubmit(userId, newData, type) {
    dispatch(updateUser(userId, newData, type));
    }
  };
};
const WrappedNormalInfoForm = Form.create()(ChangeUserInfoForm);

export default connect(mapProps, mapDispatch)(WrappedNormalInfoForm);


/**
 * PROP TYPES
 */
// LoginForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// };
