import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store/user';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;

/**
 * COMPONENT
 */
class LoginForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { handleSubmit, name, displayName, guestSignin } = this.props;
    console.log(this.props.history);
    return (
      <div className="login-container">
        <Form onSubmit={handleSubmit} name={name} className="login-form">
          {name === 'signup' ?
          <div>
          <FormItem>
            {getFieldDecorator('firstName', {
              rules: [
                { required: true, message: 'Please enter your name!' }
              ]
            })(
              <Input
                name="firstName"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="First"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('lastName', {
              rules: [
                { required: true, message: 'Please enter your name!' }
              ]
            })(
              <Input
                name="lastName"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Last"
              />
            )}
          </FormItem>
          </div> : "" }
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: 'Please input your email!' }
              ]
            })(
              <Input
                name="email"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                name="password"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {displayName}
            </Button>
            {displayName === 'Login' ? (
              <Link to="/signup">New? Register now!</Link>
            ) : (
                <Link to="/">Have an account? Sign in here!</Link>
              )}
          </FormItem>
          <Link to="/main">
            <Button onClick={guestSignin} type="primary" className="guest-btn">
              Continue as Guest
            </Button>
          </Link>
        </Form>
      </div>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',

  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up'
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
const WrappedNormalLoginForm = Form.create()(LoginForm);

export const Login = connect(mapLogin, mapDispatch)(WrappedNormalLoginForm);
export const Signup = connect(mapSignup, mapDispatch)(WrappedNormalLoginForm);

/**
 * PROP TYPES
 */
// LoginForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// };
