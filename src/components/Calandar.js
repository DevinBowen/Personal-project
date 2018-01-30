import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
// import axios from 'axios';
import Cal from './cal';
import '../css/calandar.css'

export default class Calandar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avalable: [],
      unavalable: []
    }

  }

// -------------dont need anymore
  // componentDidMount() {
  //   axios.get('/api/avalable').then(res => {
  //     console.log(res.data)
  //     this.setState({ avalable: res.data })
  //   })
  // }




  render() {

    //-------------dont need anymore
    // console.log(this.state.avalable)
    // var availabeList = this.state.avalable.map(available => (
    //   <div key={available.id}>
    //     {available.avalable}
    //     <br/>
    //     {available.date} 
    //     {available.dentist} 
    //     {available.name} 
    //     {available.office} 
    //     {available.time}
    //     <br/>

    //   </div>))
    return (
      <div>
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
