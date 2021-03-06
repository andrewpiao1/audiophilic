import React from 'react';
import MyButton from '../utils/my-button';

import Login from './Login';

//stateless component (b/c not too much logic)

const RegisterLogin = () => {
  return (
    <div className="page_wrapper">
      <div className="container">

        <div className="register_login_container">
          <div className="left">
            <h1>New Customers</h1>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

            < MyButton
              type="link" //default scenario
              title="Create an account"
              linkTo="/register"
              addStyles={{  //will override default styles
                  margin: '10px 0 0 0'
              }}
            />

          </div>
          <div className="right">
            <h2>Registered customers</h2>
            <p>If you have an account, please log in.</p>

            <Login />

          </div>
        </div>

      </div>
    </div>
  );
};

export default RegisterLogin;