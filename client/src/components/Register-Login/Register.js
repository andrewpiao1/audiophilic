import React, { Component } from 'react';
import FormField from '../utils/form-field';
import { update, generateData, isFormValid } from '../utils/form-actions';
// import {withRouter} from 'react-router-dom'

// import {loginUser} from '../../redux/actions/user-actions'

import { connect } from 'react-redux'

class Register extends Component {
  state = {
    formError: false,
    formSuccess: '',
    formData: {

      name:{
        element: 'input',
        value: '',
        config: { // where we store all info of that element
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },

      lastName:{
        element: 'input',
        value: '',
        config: { // where we store all info of that element
          lastName: 'lastName_input',
          type: 'text',
          placeholder: 'Enter your last name'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },

      email:{
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true     //check if valid email
        },
        valid: false,
        touched: false,
        validationMessage: ''
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
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },

      confirmPassword:{
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'confirmPassword',
          placeholder: 'Confirm your password',
          autoComplete: 'on'
        },
        validation: {
          required: true,
          confirm: 'password'
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateForm = (element) => {
    const newFormData = update(element, this.state.formData, 'register')
    this.setState({
      formError: false,
      formData: newFormData
    })
  }

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formData, 'register');
    let formIsValid = isFormValid(this.state.formData, 'register')

    if (formIsValid){
      console.log('dataToSubmit: ', dataToSubmit)

    }else{
      this.setState({
        formError: true //(Please check your information...)
      })
    }
  }

  render() {
    return (
      <div className="page_wrapper">
        <div className="container">
          <classname className="register_login_container">
            <div className="left">

              <form onSubmit={(event)=> this.submitForm(event)}>

              <h2>Personal Information</h2>
                <div className="form_block_two">

                  <div className="block">
                    <FormField
                    id={'name'} //becomes id of element below
                    formData={this.state.formData.name}
                    change={ (element)=> this.updateForm(element)}
                      />
                  </div>

                  <div className="block">
                    <FormField
                    id={'lastName'} //becomes id of element below
                    formData={this.state.formData.lastName}
                    change={ (element)=> this.updateForm(element)}
                      />
                  </div>
                </div>

                <div>
                  <FormField
                  id={'email'}
                  formData={this.state.formData.email}
                  change={ (element)=> this.updateForm(element)}
                  />
                </div>

                <h2>Verify password</h2>
                <div className="form_block_two">

                  <div className="block">
                    <FormField
                    id={'password'} //becomes id of element below
                    formData={this.state.formData.password}
                    change={ (element)=> this.updateForm(element)}
                      />
                  </div>

                  <div className="block">
                    <FormField
                    id={'confirmPassword'} //becomes id of element below
                    formData={this.state.formData.confirmPassword}
                    change={ (element)=> this.updateForm(element)}
                      />
                  </div>
                </div>

                {this.state.formError ? <div className="error_label"> Please check your imformation... </div> :null}

                <button onClick={(event)=> this.submitForm(event)}>Create an account</button>

              </form>

            </div>
          </classname>
        </div>
      </div>
    );
  }
}

export default connect()(Register)
// export default connect()(withRouter(Register)); //this is a main component inside route, so do not need withRouter()