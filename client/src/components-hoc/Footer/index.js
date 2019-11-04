import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
import faClock from '@fortawesome/fontawesome-free-solid/faClock'
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope'

class Footer extends Component {
  render() {
    return (
      <footer className="background_dark">
        <div className="container">
          <div className="logo">
          ‐&nbsp;AudioPhilic ‐╾
          </div>
          <div className="wrapper">

            <div className="left">
                <h3>Contact Information -╾</h3>
              <div className="business_info">

                {/* --- Address --- */}
                <div className="tag">
                    <FontAwesomeIcon className="icon" icon={faCompass} />

                    <div className="info">
                      <div>Address:</div>
                      <div>&nbsp;1533 Parrish St</div>
                      <div>&nbsp;Philadelphia, PA</div>
                    </div>
                </div>

                 {/* --- Phone --- */}
                <div className="tag">
                    <FontAwesomeIcon className="icon" icon={faPhone} />

                    <div className="info">
                      <div>Phone:</div>
                      <div>&nbsp;814-308-2155</div>
                    </div>
                </div>

                {/* --- Working Hours --- */}
                <div className="tag">
                    <FontAwesomeIcon className="icon" icon={faClock} />

                    <div className="info">
                      <div>Working Hours:</div>
                      <div>&nbsp;Mon-Sun/ 9am-5pm</div>
                    </div>
                </div>

                {/* --- Email --- */}
                <div className="tag">
                    <FontAwesomeIcon className="icon" icon={faEnvelope} />

                    <div className="info">
                      <div>Email:</div>
                      <div>&nbsp;info@audiophilic.com</div>
                    </div>
                </div>

              </div>
            </div>

            <div className="left">
              <h3>Be the first to know -╾</h3>
              <div className="info">
                Get all the latest information on new releases, sales, and offers. You cannot miss out!
              </div>

            </div>

          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;