import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  componentDidMount(){ //can't make a request from one server to another, if other server doesn't allow
    axios.get('/api/product/brands/').then((res)=>{
      console.log(res)
      console.log('hello')
    }).catch((err)=>{
      if (err) console.log(err);
    })
  }

  render() {
    return (
      <div className="App">
        My AudioPhilic App!
      </div>
    )
  }
}

export default App;
