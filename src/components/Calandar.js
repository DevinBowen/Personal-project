import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
// import axios from 'axios';
import Cal from './cal';

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
        <a href={process.env.REACT_APP_LOGIN}>
                <button>LOGIN</button>
            </a>
        <Cal />
      <div>

          {/* {availabeList} */}
        </div>
      </div>
    );
  }
}
