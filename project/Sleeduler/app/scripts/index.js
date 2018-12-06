import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import styles from '../css/base.css';

import AppBox from './appBox';
import LoginBox from './loginBox';
import RegisterAccount from './registerAccount';


ReactDOM.render((
  <Router history={browserHistory}>
      <Route path="/" component={LoginBox}/>
      <Route path="/register" component={RegisterAccount}/>
      <Route path="/:username" component={AppBox}/>
  </Router>
), document.getElementById('content')

);