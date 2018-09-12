// See who is logged in
$.ajax({
  url: "/api/user_info",
  method: "GET"
}).then(function(data) {
  $("#signed-in-as").show();
  $("#email-display").text(data.email);
}).fail(function() {
  window.location.replace("/");
});
