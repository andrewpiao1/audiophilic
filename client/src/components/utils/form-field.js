import React from 'react';

//passed in 3 props from Login
const FormField = ({id, formData, change}) => {

  const showError = () =>{
    let errorMessage = null

    if(formData.validation && !formData.valid){
      errorMessage = (
        <div className="error_label">
          {formData.validationMessage}
        </div>
      )
    }
    return errorMessage
  }

  const renderTemplate = () => {
    let formTemplate = null;

    switch(formData.element){
      case('input'):
        formTemplate = ( //JSX
          <div className="formBlock">
            <input
              {...formData.config}
              value={formData.value}
              //these will fire the FormField change() method to update the state of formData
              onBlur={(event)=> change({event, id, blur:true})} //if we leave form, checks if input is empty or not
              onChange={(event)=> change({event, id})}
            />

            {/*function that checks for error from formData */}
            {showError()}
          </div>
        )
        break;

      default:
        formTemplate = null;
    }

    return formTemplate

  }

  return (
    <div>
      {renderTemplate()}
    </div>
  );
};

export default FormField;