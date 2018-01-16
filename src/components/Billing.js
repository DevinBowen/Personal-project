
import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
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
        <input type="decimal" onChange={(e) => this.updateAmount(e.target.value)} />
        {console.log(this.state.amount)}
        <br />
        <br />
        <StripeCheckout
          token={this.onToken}
          stripeKey={process.env.REACT_APP_PUBLISHABLE_KEY}
          amount={this.state.amount*100}
        />
      </div>
    );
  }
}


