import React, { Component } from 'react';
import routes from './routes';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="page">
      
        <section>

          
          <header className="head">
            <img src={require("./images/logo_trans2-1.png")} alt="" />

            {/* <div className="headText">
              Sleep for your smile!
            <br />
              Dental and in-office anesthesia
            <br />
              your iv sedation specialists
          </div> */}
          </header>



          <nav>
              <Link to='/' className='homeL' style={{textDecoration: "none"}}>Home</Link>
              <Link to='/calandar' className='calL' style={{textDecoration: "none"}}>Calandar</Link>
              <Link to='/contact' className='conL' style={{textDecoration: "none"}}>Contact</Link>
              <Link to='/billing' className='bilL' style={{textDecoration: "none"}}>Billing</Link>
          </nav>



          <div className="body">
          {routes}
          </div>




          <footer className="foot">
            dentTIVA® is a trademarked service of TIVA OBA, L.L.C.
            <br />
            Louisville, Kentucky © 2012
        </footer>
        </section>
      </div>
    );
  }
}

export default App;
