$(document).ready(function() {

    var topics = ['magenta', 'yellow', 'cyan', 'black'];
    var button;

    buttonGiphies();

    function buttonGiphies() {

        $('#topics').empty();

        for (var i = 0; i < topics.length; i++) {

            button = $('<button>').attr('class', 'topic-buttons').attr('data-colors', topics[i]).html(topics[i]);
            $('#topics').append(button);

        };

        $('.topic-buttons').click(function() {

            var color = $(this).data('colors');
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + color + "&api_key=dc6zaTOxFJmzC&limit=10";

            $('#results').empty();

            $.ajax({
                url: queryURL,
                method: 'GET'
            })
                .done(function(response) {
                    console.log(response);

                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {

                        var giphyDiv = $('<div class="giphies"></div>');
                        var giphyRating = $('<p>' + results[i].rating + '</p>');
                        var giphyImage = $('<img>')
                            .addClass('giphy-image')
                            .attr('src', results[i].images.fixed_height_still.url)
                            .attr('data-still', results[i].images.fixed_height_still.url)
                            .attr('data-animate', results[i].images.fixed_height.url)
                            .attr('data-state', 'still');

                        giphyDiv.append(giphyImage).append(giphyRating);

                        $('#results').prepend(giphyDiv);

                    }

                    $('.giphy-image').on('click', function () {

                        var dataState =  $(this).attr('data-state');
                        console.log(dataState);


                         if (dataState == 'still') {

                             console.log('It is still');
                             $(this).attr('src', $(this).attr('data-animate'));
                             $(this).attr('data-state', 'animate');

                         } else if (dataState == 'animate') {

                             console.log('It is moving!');
                             $(this).attr('src', $(this).attr('data-still'));
                             $(this).attr('data-state', 'still');

                         };

                    });
                });

        });

    };

    $('#submit').click(function() {

        if ($('#giphy-input').val().length === 0) {

            alert('Please add a color!');

        } else {

            topics.push($('#giphy-input').val());
            buttonGiphies();

            $('#giphy-input').val('');
            console.log(topics);

        }

    });





})