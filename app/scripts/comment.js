// Lab09

// created Fall 2018 (11/02) 
// @author: Chan Kim (ck45) for CS 336 at Calvin College 

import React from 'react';
import Remarkable from 'remarkable';

module.exports = React.createClass({
    rawMarkup: function() {
      var md = new Remarkable();
      var rawMarkup = md.render(this.props.children.toString());
      return { __html: rawMarkup };
    },
  
    render: function() {
      return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      );
    }
  });