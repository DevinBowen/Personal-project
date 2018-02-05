import React, { Component } from 'react';
// import {Link} from 'react-router-dom';

export default class Contacts extends Component {

  render() {
    return (
      <div className="contact">
        <div>
          Email: info@denttiva.com
        </div>
        <br/>
        <div>
          Information: (855) 226-3831
        </div>
        <br/>
        <div>
          Fax: (855) 6310-417
        </div>
      </div>
    );
  }
}
