import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Calandar from './components/Calandar';
import Billing from './components/Billing';
import Contact from './components/Contact';
import Private from './components/Private';
import Failure from './components/Failure';


export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/denied' component={Failure} />
        <Route path='/calandar' component={Calandar} />
        {/* <Route path='/calandar/private' component={} /> */}
        <Route path="/private" component={Private} />
        <Route path='/contact' component={Contact} />
        <Route path='/billing' component={Billing} />

    </Switch>
)

