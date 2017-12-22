import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Calandar from './components/Calandar';
import Billing from './components/Billing';
import Contact from './components/Contact';


export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/calandar' component={Calandar} />
        <Route path='/contact' component={Contact} />
        <Route path='/billing' component={Billing} />

    </Switch>
)

