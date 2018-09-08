// Wait for DOM load
$(function() {

  // Apply attributes to HTML li elements for searching
  var listItems = document.getElementsByTagName('li');
  for (var l=0; l < listItems.length; l++) {
    listItems[l].setAttribute("id", `list-item-${l+1}`);
  };

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

  // Search for a tag
  $("#tag-input").on("change paste keyup",function() {
    var tag = $(this).val().trim().toLowerCase();
    
    for (var i=0; i < listItems.length; i++) {
      var dataTags = listItems[i].getAttribute('data-tags');
      if (!dataTags.includes(tag)) {
        listItems[i].style.display = "none";
      } else {
        listItems[i].style.display = "list-item";
      };
    };
    
  });

});