import React, { Component } from 'react';
import FormField from '../utils/form-field';
import { update, generateData, isFormValid } from '../utils/form-actions';
import {loginUser} from '../../redux/actions/user-actions'
import {withRouter} from 'react-router-dom'

import { connect } from 'react-redux'
//after we login, we need to check server for authentication (Redux)

class Login extends Component {
//state data: Email & Password
  state = {
    formError: false,
    formSuccess: '',

    //need to create a reusable component (form-field) that will take in 'formData'
    //this component will take in info and create an input w/ everything we need

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

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'login');
    let formIsValid = isFormValid(this.state.formData, 'login')

    if (formIsValid){
      // console.log('dataToSubmit: ', dataToSubmit)

      this.props.dispatch(loginUser(dataToSubmit)) //*where we dispatch an action to Redux ACTIONS (check dev tools) -> server -> response
      .then(res => { //will return the obj defined by ACTION: type & payload ({loginSuccess: true})
        if (res.payload.loginSuccess){
          this.props.history.push('/user/dashboard') // how we send to new route user user react router; will first need to inject properties of the route (since this is a child of multiple layers before routes) -> withRouter

        }else{
          this.setState({
            formError: true
          })
        }
      })

    }else{
      this.setState({
        formError: true //(Please check your information...)
      })
    }
  }

  // formfield will be passed the form data (as props)
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

            {this.state.formError ? <div className="error_label"> Please check your imformation... </div> :null}

            <button onClick={(event)=> this.submitForm(event)}>Log in</button>


        </form>
      </div>
    );
  }
}

// export default Login;

export default connect()(withRouter(Login)); //so now all route props will be injected in Login