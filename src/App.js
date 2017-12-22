import React, { Component } from 'react';
import routes from './routes';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="page">
      <section>
        <header className="head">header</header>
        <nav>
          <div>
          <Link to='/' className=''>Home</Link>
          <Link to='/calandar' className=''>Calandar</Link>
          <Link to='/contact' className=''>Contact</Link>
          <Link to='/billing' className=''>Billing</Link>
          </div>
        </nav>
        {routes}
        <footer className="foot">footer</footer>
        </section>
      </div>
    );
  }
}

export default App;
