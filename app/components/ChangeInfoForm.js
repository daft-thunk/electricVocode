import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store/user';
import { Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;

/**
 * COMPONENT
 */
class ChangeUserInfoForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { handleSubmit, name, displayName, guestSignin } = this.props;
    console.log(this.props)
    return (
      <div className="reset-forms">
        <Form onSubmit={handleSubmit} name={name} className="">
          <h3>{`Reset ${this.props.info}:`}</h3>
          <FormItem>
              <Input
                name="old"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type={this.props.info === 'email' ? "" : "password"}
                placeholder={this.props.info === 'email' ? "Current Email" : "Current Password"}
              />
          </FormItem>
          <FormItem>
              <Input
                name="new"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type={this.props.info === 'email' ? "" : "password"}
                placeholder={this.props.info === 'email' ? "New Email" : "New Password"}
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
    displayName: 'Login',
  };
};


const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      console.log('submit');
      evt.preventDefault();
      let firstName = null;
      let lastName = null;
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      if (formName === 'signup') {
        firstName = evt.target.firstName.value;
        lastName = evt.target.firstName.value;
      }
      dispatch(auth(email, password, formName, firstName, lastName));
    },
    guestSignin(evt) {
      evt.preventDefault();
      dispatch(auth('guest@guest.com', '123', 'Login'));
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
