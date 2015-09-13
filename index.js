var five = require("johnny-five");
var board = new five.Board();
var Firebase = require("Firebase");

var myFirebaseRef = new Firebase("https://burning-fire-6346.firebaseio.com/");
var player = "player1";

var epsilon = 2;

var d1 = 50;
var d2 = 50;
var d3 = 50;

board.on("ready", function() {
  var proximity1 = new five.Proximity({
    controller: "HCSR04",
    pin: 7
  });

  var proximity2 = new five.Proximity({
  	controller: "HCSR04",
    pin: 8
  });


  var proximity3 = new five.Proximity({
  	controller: "HCSR04",
    pin: 9
  });


  proximity1.on("data", function() {
  	var cm = Math.floor(this.cm)
  	if(Math.abs(d1 - cm) > epsilon) {
  		d1 = cm;
	  	var distance1Ref = myFirebaseRef.child(player).child("sensors").child("distance1");

	    console.log("Sensor1: "+ d1 + "cm", this.in + "in");
	    distance1Ref.update({"value": d1});

    }
  });

  proximity1.on("change", function() {
    // console.log("The obstruction has moved.");
  });

  proximity2.on("data", function() {
  	var cm = Math.floor(this.cm)
  	if(Math.abs(d3 - cm) > epsilon) {
  		d3 = cm;
	  	var distance2Ref = myFirebaseRef.child(player).child("sensors").child("distance2");

	    console.log("Sensor2: "+ d3 + "cm", this.in + "in");
	    distance2Ref.update({"value": d3});

    }
  });

  proximity2.on("change", function() {
    // console.log("The obstruction has moved.");
  });

  proximity3.on("data", function() {
  	var cm = Math.floor(this.cm)
  	if(Math.abs(d3 - cm) > epsilon) {
  		d3 = cm;
	  	var distance3Ref = myFirebaseRef.child(player).child("sensors").child("distance3");

	    console.log("Sensor3: "+ d3 + "cm", this.in + "in");
	    distance3Ref.update({"value": d3});

    }
  });

  proximity3.on("change", function() {
    // console.log("The obstruction has moved.");
  });
});
