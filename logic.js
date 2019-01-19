$(document).ready(function() {

    <script src="https://www.gstatic.com/firebasejs/5.8.0/firebase.js"></script>
      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyAtApx4q55Rk5X10_Db7bpzMTQKdlBZq5E",
        authDomain: "project-one-3078b.firebaseapp.com",
        databaseURL: "https://project-one-3078b.firebaseio.com",
        projectId: "project-one-3078b",
        storageBucket: "project-one-3078b.appspot.com",
        messagingSenderId: "618113727323"
      };
      firebase.initializeApp(config); 
      
      var database = firebase.database();


//Button collects and stores user input      
      $(".submitInput").on("click", function (event) {

        var jobInput = $("#jobInput").val().trim();

        var locationInput = $("#locationInput").val().trim();

        	//Creates object for pushing input data
					database.ref().push({
						job: jobInput,
            location: locationInput,

          });
            
          //Firebase watcher 
	database.ref().on("child_added", function (childSnapshot) {
		var job = childSnapshot.val().job;
    var location = childSnapshot.val().location;
    
  	$("#boardText").append(
      "<td id='jobDisplay'>" + childSnapshot.val().job + 
      "<td id='locationDisplay'>" + childSnapshot.val().location +
    )
    });

  // WEATHER LOGIC
var userCity = $("#cityInput").val();

var APIKey = "4215e0176d12264a5f7d201c6130c2f9";

$("#submitButton").on("click", function(event) {
  event.preventDefault();
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + APIKey;
 
 var userCity = $("#cityInput").val();
 console.log(userCity);

 $.ajax({
      url: queryURL,
      method: "GET"
    })

.then(function(response) {
    console.log(response);
    console.log(queryURL);
    $("#temp1").append(response.main.temp);
    $("#description1").append(response.clouds.all);
    $("#precip1").append(response.main.humidity);
    $("#wind1").append(response.wind.speed);


});
}); // END WEATHER LOGIC







    }); // END OF DOCUMENT ON-READY
