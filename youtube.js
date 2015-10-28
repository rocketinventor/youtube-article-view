// Welcome source code readers!
// This is the main (and only) script.
// Its job is to fetch data from YouTube and update the page appropriately.

// YouTube requires an api key, we'll call it "key".
var key = "AIzaSyC6Ymc1aoVbR3zMgsZqFCef9SOoHQV5X0Y"; //api key goes here

// We need a fallback id so that there will always be content on this page.
// In the future it will not be necessary.
// I randomly chose a video with with subtitles for this purpose.
var fallbackId = "QGwKge-ivkU";

// update reading view
function getContent(id) {
  var request = new XMLHttpRequest();
  request.open('GET', "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + key + "&fields=items(snippet)&part=snippet", true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Create "data" from parsed response
      var data = JSON.parse(this.response);
      console.log(data.items[0].snippet);
      
      // Update the title and give credit to the author
      document.getElementById("title").innerHTML = data.items[0].snippet.title;
      document.title = data.items[0].snippet.title + " (YouTube article view)";
      document.getElementById("author").innerHTML = data.items[0].snippet.channelTitle;
      
      // This part will add the video thumbnail
      document.getElementById("img").style = "opacity:0"; //start at 0% opacity
      // // Set 'high' res thumbnail
      // document.getElementById("img").src = data.items[0].snippet.thumbnails.high.url;
      // Set 'maxres' thumbnail
      // document.getElementById("img").src = data.items[0].snippet.thumbnails.maxres.url; //using json, causes js errors if it doesn't exist
      document.getElementById("img").src = "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg"; //using a generic url string, 404 image if it doesn't exist
      
      // Fade in content (and remove placeholder values)
      document.getElementById("img").style.height = ""; //remove placeholder height
      document.getElementById("img").style.opacity = "1"; //fade in image
      document.querySelector(".content").style.display = "block"; //display
      document.querySelector(".content").style.opacity = "1"; //fade in
    }
    else {
      // We reached our target server, but it returned an error
      console.warn("server responded with a " + this.status + " error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.warn("The server could not be reached");
  };

  request.send(); //send request

  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var transcript = xhr.responseXML.documentElement;
    document.getElementById("content").innerHTML = transcript.textContent;
    // transcript = xhr.responseXML;
  };
  xhr.onerror = function() {
    console.log("Error while getting XML.");
  };
  var url = "https://www.youtube.com/api/timedtext?v=" + id + "&lang=en";
  xhr.open("GET", url);
  xhr.responseType = "document";
  xhr.send();

  // Show recommended articles
  // document.querySelector("nav").style.display = "block" //make nav visible;
  // document.getElementById("link1").href = "tittle1" //set the title for the first link
  // document.getElementById("link1").text = "/#id1" //set the title for the second link
}

//get video id and update variable
function newURL() {
  // get video id from hash
  var id = window.location.hash.substring(1);
  // if no hash is present, use a fallback video
  if (location.hash == "") {
    id = fallbackId;
  }
  getContent(id);
}

window.addEventListener("load", newURL); //run sctipt on load
window.onhashchange = newURL; //add listener for change in hash