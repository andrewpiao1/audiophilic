import React, { Component } from 'react';
// import apLogo from '../../resources/ap-logo.png';
// 1[❯] 2[❭❭] 3[❩] 4[⧩]


class Header extends Component {
  render() {
    return (
      <header className="background_light">
        <div className="container">

          <div className="left">
            <div className="logo">
            &nbsp; ❩AudioPhilic
            </div>
          </div>

          <div className="right">
            <div className="top">
            ☰ Links
            </div>
            <div className="bottom">
            ☰ Links
            </div>
          </div>

        </div>
      </header>
    );
  }
}

export default Header;