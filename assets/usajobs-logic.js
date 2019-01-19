$("#submit").on("click", function () {
    event.preventDefault();

    //take the job entered and store it as a value
    var jobKeyword = $("#job-input").val().trim();
    var jobLocation = $("#location-input").val().trim();
    //console.log(jobKeyword);
    //console.log(jobLocation);

    //store the job location sting and if white space exsits add a % per documentation. 
    var jobStr = jobKeyword;
    console.log(jobStr);


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
      } 
    ); 
    request.done(function(results){
        console.log(results);
        //$("#position-view").text(JSON.stringify(results));

        // Creating a div to hold the job
        var jobDiv = $("<div class='job-search'>");

        // Storing the Job Title
        var jobTitle = results.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.PositionTitle;

        // Creating an element to have the job title displayed
        var pOne = $("<p>").text("Job Title: " + jobTitle);

        // Displaying the rating
        jobDiv.append(pOne);

        // Storing the Job Discrition
        var jobAgency = results.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.OrganizationName;

        // Creating an element to hold the Job Disc.
        var pTwo = $("<p>").text("Agency: " + jobAgency);

        // Displaying the release year
        jobDiv.append(pTwo);

        // Storing the location
        var jobLoc = results.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.PositionLocationDisplay;

        // Creating an element to hold the Location
        var pThree = $("<p>").text("Location: " + jobLoc);

        // Appending the plot
        jobDiv.append(pThree);

                // Storing the salary
        // var jobSalary = results.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.PositionTitle;

                // Creating an element to hold the Location
        // var pFour = $("<p>").text("Salary: " + plot);
        
                // Appending the plot
        // jobDiv.append(pFour);

        // Retrieving the URL for job
        var linkURL = results.SearchResult.SearchResultItems[0].MatchedObjectDescriptor.ApplyURI[0];

        // Creating an element to hold the link
        var link = $("<p>").attr("src", linkURL);

        // Appending the image
        jobDiv.append(linkURL);

        // Putting the entire movie above the previous movies
        $("#position-view").prepend(jobDiv);
      });
    });