// Homework02

// created Fall 2018 (10/26) 
// @author: Chan Kim (ck45) for CS 336 at Calvin College  

$(document).ready(function() {
    $( 'form' ).submit(function( event ) {
    event.preventDefault();
    var form = $( this );

        $.ajax({
            type: "POST",
            url: "/person/" + $("#ID").val(),
            data: form.serialize(),
            dataType: 'json'
        })
        .done(function( resp ) {
            $("#name").empty();
            $("#logID").empty();
            $("#strDate").empty();
            $("#name").append("<p>Name: " + resp.firstName + " " + resp.lastName + "</p>");
            $("#logID").append("<p>Login ID: " + resp.loginID + "</p>");
            $("#strDate").append("<p>Start Date: " + resp.startDate + "</p>");
        })
        .fail(function(xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status:" + status);
            console.dir( xhr );
        })
    });
});