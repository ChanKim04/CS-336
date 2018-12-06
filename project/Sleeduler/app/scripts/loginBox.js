import React from 'react';
import $ from 'jquery';
import styles from '../css/base.css';
import {Link} from 'react-router';

import { API_URL, POLL_INTERVAL } from './global';

module.exports = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var account = {
      username: this.state.username.trim(),
      password: this.state.password.trim()
      };
    this.setState({data: account});
      $.ajax({
        url: API_URL,
        dataType: 'json',
        type: 'POST',
        contentType: 'application/json',
        data: account
    })
        .done(function (data) {
        }.bind(this))
        .fail(function (xhr, status, errorThrown) {
            console.error(API_URL, status, errorThrown.toString());
        }.bind(this));
  },

    render: function() {
      return (
        <div className= {styles.siteContainer}>
          <div className= {styles.gridContainer}>
            <form className= {styles.login} onSubmit={this.handleSubmit}>
              <div className= {styles.field}>
                  <input type="text" name="username" className= {styles.formInput} placeholder="Username" required />
              </div>
              <div className= {styles.field}>
                  <input type="password" name="password" className= {styles.formInput} placeholder="Password" required/>
              </div>
              <div className= {styles.field}>
                  <input type="submit" value="Log In"/>
              </div>
              </form>
              <p className= {styles.textCenter}>Not a member? <Link to="/register">Sign up now</Link></p>
          </div>
        </div>
      );
    }
  });