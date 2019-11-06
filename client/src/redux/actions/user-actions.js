import axios from 'axios';

import { USER_SERVER} from '../../components/utils/misc';
import { LOGIN_USER } from './types';

function loginUser(dataToSubmit){
  //'request' is a promise
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then( res => res.data) //res.data: {loginSuccess: true}

    //for Redux, you need to return 'type' & 'payload'
    return {
      type: LOGIN_USER,
      payload: request
    }
}

export {loginUser}