var id; //make video id variable public
id = "QGwKge-ivkU"; //set fallback url if no hash
var transcript; //another public var
// newURL(); //get url when page loads
var key = "AIzaSyC6Ymc1aoVbR3zMgsZqFCef9SOoHQV5X0Y";

// parse data and update DOM
function getContent() {
  $.ajax({
    url: "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + key + "&fields=items(snippet)&part=snippet",
    dataType: "jsonp",
    success: function(data) {
      console.log(data.items[0].snippet);
      document.getElementById("title").innerHTML = data.items[0].snippet.title;
      document.title = data.items[0].snippet.title + " (YouTube article view)";
      document.getElementById("author").innerHTML = data.items[0].snippet.channelTitle;
      document.getElementById("img").src = "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
      document.getElementById("img").style = "opacity:0";
      document.getElementById("img").style.transition = "opacity ease-out  1s";
      document.getElementById("img").style.opacity = "1";
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert(textStatus, +' | ' + errorThrown);
    }
  });

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
    id = "zzfCVBSsvqA";
  } //set to a random id if none found
  getContent();
}

window.addEventListener("load", newURL);
window.onhashchange = newURL; //add listener for change in hash