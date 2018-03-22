import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {auth} from '../store';
import { Button } from 'antd';

/**
 * COMPONENT
 */
const LoginForm = (props) => {
  //const {name, displayName, handleSubmit, error} = props;

  return (
    <div id="formContainer">
      <div id="authForm">
        <div id="authImage">
          <img src="https://www.freelogoservices.com/api/main/images/1j+ojl1FOMkX9WypfBe43D6kivaErxNNmhzEwXs1M3EMoAJtlSIthPdj...P09" />
        </div>
        <form /*onSubmit={handleSubmit}*/ name="name">
          <div id="form-inputs">
            <div className="inputs">
              <input name="email" placeholder="Email" type="text" />
            </div>
            <div className="inputs">
              <input name="password" placeholder="Password" type="password" />
            </div>
            <div className="inputs">
              <Button type="submit" fluid color="instagram" > displayName </Button>
            </div>
            <div className="inputs">
              {/*<Button href="/auth/google" fluid color="google plus" >{displayName} with Google</Button>*/}
            </div>
            {/*error && error.response && <div> {error.response.data} </div>*/}
          </div>
        </form>
      </div>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    // name: 'login',
    // displayName: 'Login',
    // error: state.user.error
  };
};

const mapSignup = (state) => {
  return {
    // name: 'signup',
    // displayName: 'Sign Up',
    // error: state.user.error
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      //dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);
export const Signup = connect(mapSignup, mapDispatch)(LoginForm);

/**
 * PROP TYPES
 */
// LoginForm.propTypes = {
//   name: PropTypes.string.isRequired,
//   displayName: PropTypes.string.isRequired,
//   handleSubmit: PropTypes.func.isRequired,
//   error: PropTypes.object
// };
