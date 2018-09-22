$(document ).ready(function() {
    console.log( "ready!" );

    //  ================== VARIABLES  ================== 

    var foodChoices = ['ramen', 'pizza', 'strawberry', 'barbecue', 'sushi']

    //  ================== FUNCTIONS  ================== 

    function displayFoodInfo() {

        var food = $(this).attr("data-food");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        food + "&api_key=sMDSA8c6Gqu6aUYkHdoDqWxYtEhv9OPM&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            // show query URL for each user's choice
            console.log(queryURL);
            // show response for each user's choice
            console.log(response);

            var foodDiv = $("<div>");
            var results = response.data;
            
            // loop through the gif images (limit 10)
            for (var i = 0; i < results.length; i++) {
                var p = $("<p>").text("Rating: " + results[i].rating);
                
                // create an HTML image element for each gif image
                var foodImage = $("<img>");
                
                // add source of the image with its current state ANIMATE
                foodImage.attr("src", results[i].images.fixed_height.url);

                // add class = 'gif' to use in pausingGifs function
                foodImage.addClass('gif');
                // add data-state='animate' to use in pausingGifs function
                foodImage.attr('data-state', 'animate');
                // add data-still= 'still-image-URL' to use in pausingGifs function
                foodImage.attr('data-still', results[i].images.fixed_height_still.url)
                // add data-animate= 'animate-image-URL' to use in pausingGifs function
                foodImage.attr('data-animate', results[i].images.fixed_height.url);

                // append rating
                foodDiv.append(p);

                // append image
                foodDiv.append(foodImage);

                // prepend images from the new choice over the ones from previous choice
                $("#foodGif").html(foodDiv);
            }

        });
    };
  
  // function to create food button(s)
  function renderButtons() {
      $('#foodButtons').empty();
      for (var i = 0; i < foodChoices.length; i++) {
          var a = $('<button>');
          a.addClass('food-btn food-btn-2 food-btn-2g');
          a.attr('data-food', foodChoices[i]);
          a.text(foodChoices[i]);
          $('#foodButtons').append(a);
      }
  };


  // function to pause and animate gif images
  function pausingGifs() {

    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      // if the current state is STILL
      // console.log the URL in the animate state
      console.log("currently still change to animate: " + $(this).attr("data-animate"));
      // update its src attribute to what its data-animate value is
      $(this).attr("src", $(this).attr("data-animate"));
      //set the image's data-state to animate
      $(this).attr("data-state", "animate");
    } else { 
      // else if the current state is ANIMATE
      // console.log the URL in the still state
      console.log("currently animate change to still: " + $(this).attr("data-still"));
      // update its src attribute to what its data-still value is
      $(this).attr("src", $(this).attr("data-still"));
      // set the image's data-state to still
      $(this).attr("data-state", "still");
    }
  };

  renderButtons();

  // ================== EVENT LISTENERS  ================== 

  // when user clicks the 'submit' button, take user's input and add a food button using the renderButton() function
  $('#addFood').on('click', function(event){
      event.preventDefault();
      var foodInput = $('#food-input').val();
      console.log ("food input: " + foodInput)
      foodChoices.push(foodInput);
      renderButtons();
  });

  // show rating and 10 gif images when the food button is click
  $(document).on('click', '.food-btn', displayFoodInfo);

  // pausing gif images if it is animate and vice versa
  $(document).on("click", '.gif', pausingGifs);

});



      

