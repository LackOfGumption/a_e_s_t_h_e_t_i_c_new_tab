function updateClock() {
  // Time is displayed in 24-hour format
  var currentTime = new Date();

  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var currentSeconds = currentTime.getSeconds();
  // Uncomment this part to enable 12-hour format
  //var isMorning = true;
  //if (currentHours > 12) {
  //  currentHours = currentHours - 12;
  //  isMorning = false;
  //}

  // Pad the minutes and seconds with leading zeros, if required
  currentHours = (currentHours < 10 ? "0" : "") + currentHours;
  currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
  currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

  // Compose the string for display
  //Remove the end part for 12-hour format
  var currentTimeString = currentHours + " : " + currentMinutes + " : " + currentSeconds /* + (isMorning ? " am" : " pm")*/ ;
  // Update the time display
  document.getElementById("time").firstChild.nodeValue = currentTimeString;
}