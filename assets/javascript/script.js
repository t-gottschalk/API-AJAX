// alert("connected");

//Initial Topics Array
var topics = ["Kate Upton", "Halsey", "Scarlett Johansson", "Megan Fox", "Taylor Swift", "Ariana Grande", "Kendall Jenner", "Blake Lively", "Jessica Alba"];

//Display Topic Buttons Function
function topicButtons() {
	$('#topicButtons').empty();

	for (var i = 0; i < topics.length; i++) {
		var newButton = $('<button>');
		newButton.addClass('topic');
		newButton.attr('data-name', topics[i]);
		newButton.text(topics[i]);
		$('#topicButtons').append(newButton);
	}
}
topicButtons();

//Event Listener on click
$(document).on("click", ".topic", displayTopics);

//AJAX Request for GIPHY API Function
function displayTopics() {
	var topicSearch = $(this).attr('data-name');
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicSearch + "&api_key=d6fLbxSe33vEgh9MoSXt9mZB3htrlOfv&limit=10";

	$('#gifs-appear-here').empty();

	$.ajax( {
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		for (var i = 0; i < response.data.length; i++) {
			var divGIPHY = $('<div>');
			var rating = $('<p>').text("GIPHY Rating: " + response.data[i].rating);
			var stillGIPHY = response.data[i].images.fixed_height_still.url;
			var image = $('<img>').attr('src', stillGIPHY);

			image.addClass('toggleGIPHY');
			image.attr('data-state', 'still');
			image.attr('animate-url', response.data[i].images.fixed_height.url);
			image.attr('still-url', response.data[i].images.fixed_height_still.url);

			divGIPHY.append(rating, image);
			$('#gifs-appear-here').append(divGIPHY);
		}

		$(".toggleGIPHY").on('click', function() {
			var state = $(this).attr("data-state");
				if (state === "still") {
					$(this).attr("src", $(this).attr("animate-url"));
					$(this).attr("data-state", "animate");
				} else {
					$(this).attr("src", $(this).attr("still-url"));
					$(this).attr("data-state", "still");
				}
		});
		topicButtons();
	});
}

//Add Topic Button Function
$("#addTopic").on("click", function(event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    topics.push(topic);
    $("#topic-input").val("");
    topicButtons();
});
