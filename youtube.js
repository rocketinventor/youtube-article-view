var id; //make video id variable public
var fallbackId = "QGwKge-ivkU";
id = fallbackId; //set fallback url if no hash
var transcript; //another public var
// newURL(); //get url when page loads
var key = "AIzaSyC6Ymc1aoVbR3zMgsZqFCef9SOoHQV5X0Y";

// parse data and update DOM
function getContent() {
  var request = new XMLHttpRequest();
  request.open('GET', "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + key + "&fields=items(snippet)&part=snippet", true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var data = JSON.parse(this.response);
      console.log(data.items[0].snippet);
      document.getElementById("title").innerHTML = data.items[0].snippet.title;
      document.title = data.items[0].snippet.title + " (YouTube article view)";
      document.getElementById("author").innerHTML = data.items[0].snippet.channelTitle;
      document.getElementById("img").src = "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
      document.getElementById("img").style = "opacity:0";
      document.getElementById("img").style.transition = "opacity ease-out  1s";
      document.getElementById("img").style.opacity = "1";
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

  request.send();

  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    transcript = xhr.responseXML.documentElement;
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
  // document.getElementById("link1").href = "tittle1"
  // document.getElementById("link1").text = 
}

//get video id and update variabke
function newURL() {
  id = window.location.hash.substring(1);
  // if no hash is present, use a fallback video
  if (location.hash == "") {
    id = fallbackId;
  } //set to a random id if none found
  getContent();
}

window.addEventListener("load", newURL);
window.onhashchange = newURL; //add listener for change in hash