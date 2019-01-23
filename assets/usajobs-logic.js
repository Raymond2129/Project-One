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
        for (var i = 0; i < dataResults.length; i++) {
            
            if (dataResults.length == 0) {

                var newDiv1 = $("<div>");
                newDiv1.addClass("job-search-empty"); 
                var emptyJob = $("<div>").text("No Results. Please try a different Job Title or Location.");
                //console.log("text: " + emptyJob);
                newDiv1.append(emptyJob); 
                $("#jobPanel").prepend(newDiv1);

            } else { 
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




            // Creating a div to hold the job
            // var jobDiv = $("<div class='job-search'>");

            // Storing the Job Title
            // var jobTitle = results.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.PositionTitle;

            // Creating an element to have the job title displayed
            // var pOne = $("<p>").text("Job Title: " + jobTitle);

            // Displaying the rating
            // jobDiv.append(pOne);

            // Storing the Job Discrition
            // var jobAgency = results.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.OrganizationName;

            // Creating an element to hold the Job Disc.
            // var pTwo = $("<p>").text("Agency: " + jobAgency);

            // Displaying the release year
            // jobDiv.append(pTwo);

            // Storing the location
            // var jobLoc = results.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.PositionLocationDisplay;

            // Creating an element to hold the Location
            // var pThree = $("<p>").text("Location: " + jobLoc);

            // Appending the plot
            // jobDiv.append(pThree);

            // Storing the salary
            // var jobSalary = results.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.PositionTitle;

            // Creating an element to hold the Location
            // var pFour = $("<p>").text("Salary: " + jobSalary);

            // Appending the plot
            // jobDiv.append(pFour);

            // Retrieving the URL for job
            // var linkURL = results.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.ApplyURI[0];

            // Creating an element to hold the link
            // var link = $("<p>").attr("src" + linkURL);

            // Appending the image
            // jobDiv.append(link);

            // $("#position-view").prepend(jobDiv);
        }
    });
    //var currentDay = $("#currentDay").text(moment().format("dddd, MMM Do"));
    console.log(currentDay);
    var userCity = $("#location-input").val().trim();
    console.log(userCity);

    var APIKey = "4215e0176d12264a5f7d201c6130c2f9";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=imperial&appid=" + APIKey;
    console.log(queryURL);

    //var userCity = $("#location-input").val();
    //console.log(userCity);

    $.ajax({
        url: queryURL,
        method: "GET",
      })

      .then(function (response) {
        console.log(response);
        //console.log(queryURL);
        $("#temp1").text(response.main.temp + " F");
        $("#description1").text(response.clouds.all + " %");
        // debugger;
        // $("#precip1").text(response.rain["3h"]);
        $("#wind1").text(response.wind.speed + " mph");

        if (response.weather[0].icon === "10n") {
          $("#weatherImage").append("assets/images/weather_icons/02n.png");
        };
      });
    });  

