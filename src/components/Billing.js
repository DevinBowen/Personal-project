
import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import '../css/billing.css';
require('dotenv').config();
// import { Link } from 'react-router-dom';




export default class Billing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: 0
    }

    this.updateAmount = this.updateAmount.bind(this);

  }



  onToken = (token) => {
    token.card = void 0;
    console.log('token', token);
    axios.post('http://localhost:5000/api/payment', { token, amount: this.state.amount }).then(response => {
      alert('we are in business')
    });
  }

  updateAmount(value) {
    this.setState({ amount: value })
  }


  render() {
    // console.log(process.env.REACT_APP_PUBLISHABLE_KEY)
    
    return (
      <div className="App">
        <div className="warning">
          Deposite is $200.00 and is require two weeks prior to dental appointment. If the deposite is not recieved, your appointment will be canceled with out notice.
        </div>

        <div className="pay">
          <u>Enter payment amount in exact decimal form.</u>
        </div>

        <input type="decimal" placeholder="000.00" onChange={(e) => this.updateAmount(e.target.value)} />
        {console.log(this.state.amount)}

        

        <div className="stripe">
        <StripeCheckout
          token={this.onToken}
          stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
          amount={this.state.amount*100}
        />
        </div>

        <div className="list">
          <ol>
            <li>Enter the exact amount in decimal form of the desired payment amount.</li>
            <li>Click Pay With Card and ennter the billing information into the popup.</li>
            <li>Click pay and wait for an email reciept of your payment.</li>
            <li>If you experience any issues with the billing process pleas contact DentTIVA in order to resolve the problem.</li>
          </ol>
        </div>
      </div>
    );
  }
}


