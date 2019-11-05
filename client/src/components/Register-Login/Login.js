import React, { Component } from 'react';
import FormField from '../utils/form-field';
import { update } from '../utils/form-actions';

// import { connect } from 'react-redux'
//after we login, we need to check server for authentication (Redux)

class Login extends Component {
//state data: Email & Password
  state = {
    formError: false,
    formSuccess: '',

    //need to create a reusable component that will take in 'formData'
    //component will take info and create an input w/ everything we need

    formData: {   //where we store all the elements (inputs) of the form

      email:{
        element: 'input',
        value: '',
        config: { // where we store all info of that element
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: { //will start when information is submit -> modifies 'valid'
          required: true, //cannot submit empty form
          email: true     //check if valid email
        },
        valid: false,   //starts false; true when validated
        touched: false, //for validation skipping
        validationMessage: '' //if err, stored here
      },

      password:{
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
          autoComplete: 'on'
        },
        validation: { //will start when information is entered in -> modifies 'valid'
          required: true,
          // email: true (not an email)
        },
        valid: false,
        touched: false, //for validation skipping
        validationMessage: '' //if err, stored here
      }
    }
  }

   //will need to call to an outside function to validate (in form-actions)
  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'login')
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  submitForm = () => {

  }

  // formfield will be passed the form data (as props) ->
  // run through the checks ->
  // return input w/ all the information

  render() {
    return (
      <div className="signin_wrapper">
        {/* will will outsource all the logic away from actual component */}
        <form onSubmit={(event)=>this.submitForm(event)}>

            <FormField
              id={'email'} //becomes id of element below
              formData={this.state.formData.email}
              change={ (element)=> this.updateForm(element)} //element contains the event, id ('email')
            />

            <FormField
              id={'password'}
              formData={this.state.formData.password}
              change={ (element)=> this.updateForm(element)} //element contains the event, id ('email'), blur
            />



        </form>
      </div>
    );
  }
}

export default Login;

// export default connect()(Login);