// Lab09

// created Fall 2018 (11/02) 
// @author: Chan Kim (ck45) for CS 336 at Calvin College 

import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
import Comment from './Comment';

module.exports = React.createClass({
    render: function() {
      var commentNodes = this.props.data.map(function(comment) {
        return (
          <Comment author={comment.author} key={comment.id}>
            {comment.text}
          </Comment>
        );
      });
      return (
        <div className="commentList">
          {commentNodes}
        </div>
      );
    }
  });