import axios from 'axios';

import { USER_SERVER} from '../../components/utils/misc';

import { LOGIN_USER } from './types';

function loginUser(dataToSubmit){
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then( res => res.data) //res.data: {loginSuccess: true}
    //'request' is a promise

    //for Redux, you need to return 'type' & 'payload'
    return {
      type: LOGIN_USER,
      payload: request
    }
}

export {loginUser}