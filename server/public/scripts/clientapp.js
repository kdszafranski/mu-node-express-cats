$(document).ready(function() {
  // event listeners
  $('#add-cat').on('click', function() {
    event.preventDefault();
    var values = {};
    $.each($('#inputForm').serializeArray(), function(i, field) {
      values[field.name] = field.value;
    });

    $.ajax({
      type: 'POST',
      url: '/felines',
      data: values,
      success: function(response) {
        if(response == true) {
          getCats();
        } else {
          alert("Something went wrong");
        }
      }
    })

  });

  // get all cats (initial load)
  function getCats() {
    $.ajax({
      type: 'GET',
      url: '/felines',
      success: function(data) {
        $('#cat-container').empty();
        data.forEach(function(cat, i) {
          $('#cat-container').append('<div>' + cat + '</div>');
        });
      }
    });
  }

  // post new cat
  getCats();
});
