import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './all-routes';

import './resources/styles.css'; //css
import { BrowserRouter } from 'react-router-dom'

// === REDUX ===
import { Provider } from 'react-redux';    //Provider connects with redux
import { createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './redux/reducers'

const createStoreWithMiddleWare = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)


ReactDOM.render(
   <Provider
      store={createStoreWithMiddleWare(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>

         <BrowserRouter>
         <Routes />
         </BrowserRouter>,

   </Provider>


, document.getElementById('root'));