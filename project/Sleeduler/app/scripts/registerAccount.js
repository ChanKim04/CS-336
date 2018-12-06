import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';

import styles from '../css/base.css';

import {API_URL} from './global';

module.exports = React.createClass({
    getInitialState: function() {
      return {username: '', password: ''};
    },

    handleUsernameChange: function(e) {
      this.setState({username: e.target.value});
    },
    handlePasswordChange: function(e) {
      this.setState({password: e.target.value});
    },
    contextTypes: {
      router: React.PropTypes.object
  },
    handleCreate: function () {
      var newAccount = {
        username: this.state.username.trim(),
        password: this.state.password.trim()
      };
      $.ajax({
          url: API_URL + '/register',
          dataType: 'json',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify(newAccount)
      })
          .done(function (login) {
              this.context.router.push('/');
          }.bind(this))
          .fail(function (xhr, status, errorThrown) {
              console.error(API_URL, status, errorThrown.toString());
          }.bind(this));
  },
    render: function() {

      return (
        <div className= {styles.siteContainer}>
          <div className= {styles.gridContainer}>
            <form className= {styles.login}>
            <div className= {styles.field}>
                <input type="text" className= {styles.formInput} placeholder="Username" required value={this.state.username} onChange={this.handleUsernameChange}/>
              </div>
              <div className= {styles.field}>
                <input type="password" className= {styles.formInput} placeholder="Password" required value={this.state.password} onChange={this.handlePasswordChange}/>
              </div>
              <div className= {styles.field}>
                <input type="submit" value="Create" onClick={this.handleCreate}/>
              </div>
            </form>
            <p className= {styles.textCenter}>Return to <Link to="/">Sign in</Link></p>
          </div>
        </div>     
      );
    }
  });