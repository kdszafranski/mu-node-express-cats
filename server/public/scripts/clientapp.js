$(document).ready(function() {
  // event listeners
  $('#add-song').on('click', function() {
    event.preventDefault();
    var values = {};
    $.each($('#inputForm').serializeArray(), function(i, field) {
      values[field.name] = field.value;
    });

    $.ajax({
      type: 'POST',
      url: '/songs',
      data: values,
      success: function(data, status) {
        // check the status from the response
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

  // get all cats (initial load)
  function getSongs() {
    $.ajax({
      type: 'GET',
      url: '/songs',
      success: function(data) {
        $('#song-container').empty();
        data.forEach(function(song, i) {
          console.log(song);
          $('#song-container').append('<div class="song"></div>');
          $el = $('#song-container').children().last();
          $el.append('<h2>' + song.title + '</h2>');
          $el.append('<p>By: ' + song.artist + '</p>');
        });
      }
    });
  }

  // post new cat
  getSongs();
});
