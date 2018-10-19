// Lab07

// created Fall 2018 (10/17) 
// @author: Chan Kim (ck45) for CS 336 at Calvin College  

$(document).ready(function() {

    $( function() {
        // $( ".widget input[type=submit], .widget a, .widget button" ).button();
        $( "a" ).click( function(event) {
        $.ajax({
            type: "GET",
            url: "/hello",
            data: {
                name: "lab7!"
            },
            dataType: "JSON"
        })
        .done(function(json) {
            $("<em>", {html: "Hello, " + json}).appendTo("body");
            })
        .fail(function(xhr, status, errorThrown){
            alert( "Sorry, there was a problem!" );
            console.log( "Error: " + errorThrown );
            console.log( "Status: " + status );
            console.dir( xhr );
        })
         event.preventDefault();
    })
    // Exercise 7.2 
    // $("a").click(function(event){
    //     $("<em>", {html: "no data yet..."}).appendTo("body");
    //      event.preventDefault();
    // })
})
});