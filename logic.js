$(document).ready(function () {

$("#resultsHeader").hide();
$('#jobPanel').hide();
   $("#weatherCard").hide();
//Begin Firebase Logic
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
$("#search").on("click", function (event) {
    
  var jobInput = $("#job-input").val().trim();

  var locationInput = $("#location-input").val().trim();

  //Creates object for pushing input data

 var newSearch = {
    job: jobInput,
    location: locationInput,
  };

  //Uploads data to database
  database.ref().push(newSearch); 
    

  //Firebase watcher 
  database.ref().on("child_added", function (childSnapshot) {
    var jobInput = childSnapshot.val().job;
    var jobLocation = childSnapshot.val().location;

  // Create the new row
  var newRow = $("<tr>").append(
  $("<td>").text(jobInput),
  $("<td>").text(locationInput),
  );

// Append the new row to the table
$("#search-table > tbody").append(newRow);
});
  });
});


$("#search").on("click", function () {
      event.preventDefault();

      //take the job entered and store it as a value
      var jobKeyword = $("#job-input").val().trim();
      var jobLocation = $("#location-input").val().trim();
      //console.log(jobKeyword);
      //console.log(jobLocation);

      //store the job location sting and if white space exsits add a % per documentation. 
      var jobStr = jobKeyword;
      //console.log(jobStr);


      var queryURL = "https://data.usajobs.gov/api/search?Keyword=" + jobStr + "&LocationName=" + jobLocation + "";
      //console.log(queryURL);

      //var host = 'data.usajobs.gov';



      var host = 'data.usajobs.gov';
      var userAgent = 'raymond2129@gmail.com';
      var authKey = 'T5i3+huUBl++AK8mHug1930bMx99fqscqNArmElhy0s=';

      var request = $.ajax({
        url: queryURL,
        method: 'GET',
        beforeSend: function (xhr) {
          //xhr.setRequestHeader("Host", host);
          //xhr.setRequestHeader("User-Agent", userAgent);
          xhr.setRequestHeader("Authorization-Key", authKey);

        }
      });
      request.then(function (results) {
          //console.log(results);
          //$("#position-view").text(JSON.stringify(results));
          //console.log(results);

          $("#jobPanel").empty();
          var dataResults = results.SearchResult.SearchResultItems;
          var dataEmpty = results.SearchResult.SearchResultCount;
          //console.log(dataEmpty);
          //console.log(dataResults.length);
          
            if (dataResults.length === 0) {

              var newDiv1 = $("<div>");
              newDiv1.addClass("job-search-empty");
              var emptyJob = $("<div>").text("No Results found. Please try a different Job Title or Location.");
              //console.log("text: " + emptyJob);
              newDiv1.append(emptyJob);
              $("#jobPanel").prepend(newDiv1);

            } else { for (var i = 0; i < dataResults.length; i++) {

              console.log(dataResults.length);
              var newDiv = $("<div>");
              newDiv.addClass("job-search");

              //Job search title from data
              var jobTitle = $("<div>").text("Job Title: " + dataResults[i].MatchedObjectDescriptor.PositionTitle);
              jobTitle.addClass("job-title");
              newDiv.append(jobTitle);
              //console.log(jobTitle);

              //Pull the agency for the job search
              var jobAgency = $("<div>").text("Agency: " + dataResults[i].MatchedObjectDescriptor.OrganizationName);
              jobAgency.addClass("job-Agency");
              newDiv.append(jobAgency);
              //console.log(jobAgency);

              var jobLoc = $("<div>").text("Location: " + dataResults[i].MatchedObjectDescriptor.PositionLocationDisplay);
              jobLoc.addClass("job-Loc");
              newDiv.append(jobLoc);
              //console.log(jobLoc);
              var linkURI = $("<a href=" + dataResults[i].MatchedObjectDescriptor.PositionURI + ">").text(dataResults[i].MatchedObjectDescriptor.PositionURI);
              linkURI.addClass("link-URI");
              newDiv.append(linkURI);
              //console.log(linkURI);

              var hardLine = $("<hr>");
              newDiv.append(hardLine);
              $("#jobPanel").prepend(newDiv);


            }             
              $("#jobPanel").show();
              $("#resultsHeader").show();
          }

          // WEATHER CODE

          var userCity = $("#location-input").val().trim();

          var currentDay = $("#currentDay").text(moment().format("dddd, MMM Do"));

          var APIKey = "4215e0176d12264a5f7d201c6130c2f9";

          var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + APIKey;
          console.log(queryURL);

          // var userCity = $("#location-input").val();
          console.log(userCity);

          $.ajax({
              url: queryURL,
              method: "GET",
            })

            .then(function (response) {
                console.log(response);
                console.log(queryURL);
                $("#temp1").text("Current Temperature: " + response.main.temp + " F");
                $("#description1").text("Cloud Coverage: " + response.clouds.all + " %");
                $("#wind1").text("Wind Speed: " + response.wind.speed + " mph");

                $("#weatherCard").show();

              });
              $("#clear").on("click", function(event){
                location.reload();
            });
          });
      });
