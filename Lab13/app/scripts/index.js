// Lab13

// created Fall 2018 (11/28) 
// @author: Chan Kim (ck45) for CS 336 at Calvin College  

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import '../css/base.css';

import CommentBox from './commentBox';
import CommentEdit from './commentEdit';


ReactDOM.render((
  <Router history={browserHistory}>
      <Route path="/" component={CommentBox}/>
      <Route path="/:id" component={CommentEdit}/>
  </Router>
), document.getElementById('content')
  // <CommentBox url="/api/comments" pollInterval={2000} />,
  // <Route path="/:id" component={CommentEdit} />,
  // document.getElementById('content')
);