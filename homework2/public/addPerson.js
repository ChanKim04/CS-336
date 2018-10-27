// Homework02

// created Fall 2018 (10/26) 
// @author: Chan Kim (ck45) for CS 336 at Calvin College  
$(document).ready(function() {
  $( 'form' ).submit(function( event ) {
    event.preventDefault();
    var form = $( this );
  
    $.ajax({
      type: 'POST',
      url: '/save',
      data: form.serialize(),
      dataType: 'json'
    })
      .done(function( resp ) {
        $("#info").empty();
        $("#info").append("<p>New person has added!</p>");
      })
      .fail(function(xhr, status, errorThrown) {
        alert("Sorry, there was a problem!");
        console.log("Error: " + errorThrown);
        console.log("Status:" + status);
        console.dir( xhr );
    })
  });
});