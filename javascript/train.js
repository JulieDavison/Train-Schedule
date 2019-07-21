// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyD6-H1YHHB05KtOE1NWH7GlrTExWYIkLN8",
  authDomain: "trainschedule-a29e4.firebaseapp.com",
  databaseURL: "https://trainschedule-a29e4.firebaseio.com",
  projectId: "trainschedule-a29e4",
  storageBucket: "",
  messagingSenderId: "173626162355",
  appId: "1:173626162355:web:1263d51cc348fad1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStartDate = moment($("#start-date-input").val().trim(), "MM/DD/YYYY").format("X");
  var trainStartTime = moment($("#start-time-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var trainfrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    startdate: trainStartDate,
    starttime: trainStartTime,
    frequency: trainfrequency
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.startdate);
  console.log(newTrain.starttime);
  console.log(newTrain.frequency);

  alert("New Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-date-input").val("");
  $("#start-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStartDate = childSnapshot.val().startdate;
  var trainStartTime = childSnapshot.val().starttime;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStartDate);
  console.log(trainStartTime);
  console.log(trainFrequency);

  
  var remainder = moment().diff(moment.unix(trainStartTime), "minutes")%trainFrequency;     //modulus   12 / 5 2 R 2 => modulus is only the remainder 12 % 5 => 2
  console.log(remainder);
  
  var minutes = trainFrequency - remainder;
  console.log(minutes);

  var arrival = moment().add(minutes, "m").format("hh:mm A");
  console.log(arrival);



  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    // $("<td>").text(trainStartDate),
    $("<td>").text(arrival),
    $("<td>").text(minutes)
    
  );

  // Append the new row to the table
  $("#train-table> tbody").append(newRow);
});

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
