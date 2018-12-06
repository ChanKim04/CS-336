import React from 'react';
import $ from 'jquery';
import styles from '../css/base.css';


import { API_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({
  
    render: function() {
      return (
        <div className="appBox">
          <h1>{this.props.params.username}</h1>

        </div>
      );
    }
  });