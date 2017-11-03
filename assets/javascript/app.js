var config = {
    apiKey: "AIzaSyA9SMpvHS8ZslCddrr9N3DCMCJjlGl8fpk",
    authDomain: "train-assignment-51b47.firebaseapp.com",
    databaseURL: "https://train-assignment-51b47.firebaseio.com",
    projectId: "train-assignment-51b47",
    storageBucket: "",
    messagingSenderId: "520701587196"
};
firebase.initializeApp(config);

var database = firebase.database()

var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";


$("#submit").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    trainTime = $("#train-time").val().trim();
    frequency = $("#frequency").val().trim();

    $("#remove").bind("click", function() {
        $("input[type=text], textarea").val("");
    });

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
    });

    var todayDate = new Date();
});

//////////////////////////////////////



/////////////////////////////////////

database.ref().on("child_added", function(snapshot) {
    var user = snapshot.val();
    var destination = user.destination;

    var row = $("<tr>")
    var td1 = $("<td>")
    var td2 = $("<td>")
    var td3 = $("<td>")
    var td4 = $("<td>")
    var td5 = $("<td>")

    td1.append(user.trainName)
    td2.append(user.destination)
    td3.append(user.frequency)
    td4.append(trainTime)
    td5.append(user.timeDiff)

    row.append(td1)
    row.append(td2)
    row.append(td3)
    row.append(td4)
    row.append(td5)



    ////////////////////////////////////


    var dateFormat = 'HH:mm'
    var now = moment().format(dateFormat);
    // console.log(now)
    var newStart = moment(user.trainTime, "hh:mm A").subtract(1, "years");
    console.log(newStart)
    var firstTime = newStart._i;

    console.log(firstTime)

    var firstTimeConverted = moment(firstTime, "hh:mm A").subtract(1, "years");

    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % user.frequency;
    var tMinutesTillTrain = user.frequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");


    //////////////////////////// 

    td3.text("Every " + user.frequency + " Minutes")
    td4.text(moment(nextTrain).format("hh:mm A"))
    td5.text(tMinutesTillTrain)
    $("#tbody").append(row)

}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

$("#remove").on("click", function() {
    $('#train-name').val(trainName);
    $("#destination").val(destination);
    $("#train-time").val(trainTime);
    $("#frequency").val(frequency);
});