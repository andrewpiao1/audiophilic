
//element:
  //event: SyntheticEvent
  //id: 'email'

//formData:
  //email: {element:'input', value: '', config:{}, validation:{} ...} **
  //password: {element: 'input', value: '', config:{}, validation:{} ...}

const update = (element, formData, formName) => {
  // console.log('old: ', formData.email)
  const newFormData = {...formData}  //don't want to modify the orignal that was passed down

  const newElement = {...newFormData[element.id]} //element[id] = 'email'
  //    newElement -> becomes the email property obj from formData above **

  newElement.value = element.event.target.value;

  if (element.blur){
    let validData = validate(newElement, formData);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1]
  }

  newElement.touched = element.blur || false;
  newFormData[element.id] = newElement
  console.log('new: ', newFormData)

  return newFormData  //will contain all the changes: value, valid, validation message, touched

}

const validate = ( element, formData = [] ) =>{ //will return an array: boolean & err message
  let error = [true, ''] //default is no error

  if(element.validation.email){
    const valid = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(element.value);
    const message = (valid) ? '' : 'Must be a valid email!';
    error = (valid) ? error : [valid, message]
  }

  if(element.validation){ //check if there is a required inside element
    const valid = (element.value.trim() !== '');
    const message = (valid) ? '' : "This field is required!";
    error = (valid) ? error : [valid, message]
  }

  return error

}

export {update}