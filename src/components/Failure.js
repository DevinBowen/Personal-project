import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
// import axios from 'axios';
import Cal from './cal';
import '../css/calandar.css'

export default class Failure extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avalable: [],
      unavalable: []
    }

  }

// -------------dont need anymore
  componentDidMount() {
    window.alert("Unauthorized Login!");
  }




  render() {

    return (
      <div>
        {/* <h1>Error 401</h1>
        <h2>Unauthorized Login</h2> */}
        <div className="button">
        <a href={process.env.REACT_APP_LOGIN} style={{textDecoration: "none"}}>
                <button>LOGIN</button>
            </a>
            </div>
        <Cal className="cal"/>
      </div>
    );
  }
}
