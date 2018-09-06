// Wait for DOM load
$(function() {

  // DELETE
  $(".delete-button").on("click", function(event) {
    event.preventDefault();
    var id = $(this).data('id');

    // Ajax to API delete route
    $.ajax({
      url: `/api/delete/${id}`,
      method: "DELETE"
    }).then(function() {
        console.log("Deleting ID: " + id);
        location.reload();
    });
  });

});