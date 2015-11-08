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
      document.getElementById("description").innerHTML = data.items[0].snippet.description;
      document.title = data.items[0].snippet.title + " (YouTube article view)";
      document.getElementById("author").innerHTML = data.items[0].snippet.channelTitle;
      
      // This part will add the video thumbnail
      if (data.items[0].snippet.thumbnails.maxres !== undefined) {
        // Set 'maxres' thumbnail if avaliable
        document.getElementById("img").src = data.items[0].snippet.thumbnails.maxres.url;
      } else {
        // Set medium res thumbnail if needed
        document.getElementById("img").src = data.items[0].snippet.thumbnails.medium.url;
      }
      
      // Fade in content (and remove placeholder values)
      document.getElementById("img").style.height = ""; //remove placeholder height
      document.querySelector(".content").style.display = "block"; //unhide content
      document.querySelector(".content").style.opacity = "1"; //fade it in
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
  document.title = "Loading...";

  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var content = document.getElementById("content");
    if (xhr.responseXML != null) {
      var transcript = xhr.responseXML.documentElement;
      // content.innerHTML = transcript.textContent;
      parse(transcript);
      // console.log(transcript.childNodes);
      document.getElementById("description").style.display = "none";
    }
    else {
      // Show description and note the lack of a transcript
      content.innerHTML = "<b> Description below: <b></b></b><br> (<em>No transcript found! </em>Description shown instead).";
      document.getElementById("description").style.display = "block"; //make the description avaliable
    }
  };
  xhr.onerror = function() {
    document.getElementById("content").innerHTML = "Error getting transcript"; //in case there is an error
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

// New article parser
function parse(transcript) {
  document.getElementById("content").innerHTML = "";
  for (var x = 0; x <= transcript.childElementCount - 1; x++) {
    document.getElementById("content").appendChild(document.createTextNode(" " + unescapeHtml(transcript.childNodes[x].innerHTML)));
  }
  // Give some stats
  console.log(x + " nodes" + " & " + document.getElementById("content").innerText.length + " chars");
}

// Unescape html special characters
function unescapeHtml(unsafe) {
  return unsafe
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
  // If more special character support is needed, the github.com/mathiasbynens/he library could be used
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

//add listener for change in hash
window.onhashchange = function () {
  newURL();
  document.querySelector(".content").style.opacity = "0.1"; //fade out old content
};