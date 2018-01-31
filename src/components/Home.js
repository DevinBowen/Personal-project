import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../css/home.css';
// const img1 = require('../images/img_1.jpg');

export default class Home extends Component {

  render() {
    return (
      <div>


        {/* <div className="one">
          <div>
            Certified Registered Nurse Anesthetists and Anesthesiologists providing <u>ultimate comfort in IV (Intravenous) Sedation</u> at your Dental Office or Surgery Center:
        </div>
        </div>
        <div className="row">
          <img src={img1} alt=""/>
          <div className="">
            <span id="yellow">We make any dental treatment possible no matter your level of anxiety.</span>
        </div>
        </div>



        <div className="two">
          <div>
            <u>Ultimate Comfort</u>:
        </div>
          <div>
            Our IV sedation allows for safe, complete and controlled relaxation <span id="yellow"><u>at any level you need</u></span>.
          </div>
          <div>
            We provide your IV sedation while your dentist can focus on your dental treatment.
        </div>
        </div>


        <div className="three">
          <ul>
            <li>Include <span id="yellow">dentTIVA®</span> in your next visit to you dentist’s office.</li>
            <li><span id="yellow">Have your next dental procedure done <u>while you sleep.</u></span></li>
            <li>You may never want to undergo any dental procedure without us again.</li>
            <li>Many have and are glad they did.</li>
          </ul>
        </div> */}


        <div className="main">
          <div className="col">
            <img src={require("../images/sleep.jpeg")} alt=""/>
            IV Sedation Dentestry
          </div>
          <div className="col">
          <img src={require("../images/pain.jpg")} alt=""/>
          Pain Free Procedure
          </div>
          <div className="col">
          <img src={require("../images/money.jpeg")} alt=""/>
          Inexpensive Vs Hospital Bills
          </div>
        </div>

        <div className="three">
          <ul>
            <li>Include <span id="yellow">dentTIVA®</span> in your next visit to you dentist’s office.</li>
            <li><span id="yellow">Have your next dental procedure done <u>while you sleep.</u></span></li>
            <li>You may never want to undergo any dental procedure without us again.</li>
            <li>Many have and are glad they did.</li>
          </ul>
        </div>

      </div>
    );
  }
}
