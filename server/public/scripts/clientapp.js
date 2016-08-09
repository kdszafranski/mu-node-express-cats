$(document).ready(function() {
  // load data
  getSongs();

  // send submitted song data to the server
  $('#add-song').on('click', function() {
    event.preventDefault();

    var song = {};
    $.each($('#songForm').serializeArray(), function(i, field) {
      song[field.name] = field.value;
    });

    /**
    Which is the same as:

    $(this).serializeArray().forEach(function(field, index) {
      song[field.name] = field.value;
    });

    Which is a method chain of these steps:

    var fields = $(this).serializeArray();
    fields.forEach(function(field, index) {
      song[field.name] = field.value;
    });
    **/

    // send song data to the server
    $.ajax({
      type: 'POST',
      url: '/songs',
      data: song,
      success: function(data, status) {
        // check the status returned from the server
        if(status == "success") {
          getSongs();
        } else {
          alert("Something went wrong");
        }
      },
      error: function(xhr, status) {
        // request failed or we got a 4xx status code
        alert("HTTP Error!");
      }
    })

  });

  // get all songs from the server
  function getSongs() {
    $.ajax({
      type: 'GET',
      url: '/songs',
      success: function(data) {
        $('#song-list').empty();
        // append each song to the DOM
        data.forEach(function(song, i) {
          appendDOM(song);
        });
      }
    });
  }

  function appendDOM(song) {
    $('#song-list').append('<div class="song"></div>');
    $el = $('#song-list').children().last();
    $el.append('<h2>' + song.title + '</h2>');
    $el.append('<p>By: ' + song.artist + '</p>');
  }

});
