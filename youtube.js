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
function getContent(id, lang) {
  lang = lang || "en"; 
  var request = new XMLHttpRequest();
  request.open('GET', "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key=" + key + "&fields=items(snippet)&part=snippet", true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Create "data" from parsed response
      var data = JSON.parse(this.response).items[0].snippet;
      console.log(data);

      // Update the title and give credit to the author
      document.getElementById("title").innerHTML = data.title;
      document.getElementById("description").innerHTML = data.description;
      document.title = data.title + " (YouTube article view)";
      document.getElementById("author").innerHTML = data.channelTitle;
      document.getElementById("author").parentNode.href = "#/channel/" + data.channelId;

      var img = document.getElementById("img");
      // This part will add the video thumbnail
      if (data.thumbnails.maxres !== undefined) {
        // Set 'maxres' thumbnail if avaliable
        img.src = data.thumbnails.maxres.url;
      }
      else {
        // Set medium res thumbnail if needed
        img.src = data.thumbnails.medium.url;
      }

      // // This part will turn the image into a link
      // img.parentNode.href = "//youtu.be/" + id;

      // Fade in content (and remove placeholder values)
      img.style.height = ""; //remove placeholder height
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
      content.innerHTML = "<b> Description below: <b></b></b><br> (<em>No transcript found in your language: " + (lName(lang) || lang) + ". </em>Description shown instead).";
      document.getElementById("description").style.display = "block"; //make the description avaliable
    }
  };
  xhr.onerror = function() {
    document.getElementById("content").innerHTML = "Error getting transcript"; //in case there is an error
    console.log("Error while getting XML.");
  };
  var url = "https://www.youtube.com/api/timedtext?v=" + id + "&lang=" + lang;
  xhr.open("GET", url);
  xhr.responseType = "document";
  xhr.send();
}

// Get a list of subtitled languages
function getLangs(id) {
  // GET "https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=apbSsILLh28&key=" + {YOUR_API_KEY}
  // GET "https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=apbSsILLh28&fields=items%2Fsnippet%2Flanguage&key=" + {YOUR_API_KEY}

  id = id || "apbSsILLh28";
  return new Promise(function(resolve, reject) {
    var request = new XMLHttpRequest();
    request.open('GET', "https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=" + id + "&fields=items%2Fsnippet%2Flanguage&key=" + key, true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        var data = JSON.parse(this.response).items;
        // console.log(data);
        var results = [];
        for (var i = 0; i < data.length; i++) {
          var lCode = data[i].snippet.language;
          var response = {
            name: lName(lCode),
            code: lCode,
            hash: "#/video/&lang=" + lCode + "/" + id,
          };
          results.push(response);
        }
        resolve(results);
      }
      else {
        // We reached our target server, but it returned an error
        console.warn("server responded with a " + this.status + " error");
        reject(Error(this.statusText));
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.warn("The server could not be reached");
    };

    request.send(); //send request
    // Loading...
  });
}

// Hide search results/ home
function hideResults() {
  var searchPanel = document.querySelector(".search-panel");
  searchPanel.style.opacity = "0";
  searchPanel.style.display = "none";
  document.querySelector(".content").style.display = "block";
  // document.querySelector(".content").style.opacity = "1";
  for (var i = searchPanel.querySelectorAll("li").length - 1; i >= 0; i--) {
    searchPanel.querySelectorAll("li")[i].style.display = "none";
  }
  document.querySelector(".nav-bar").style.opacity = "1";
}

// Show search results/ home / channel
function showResults(q, type) {
  var searchPanel = document.querySelector(".search-panel");
  searchPanel.style.display = "block";
  searchPanel.style.opacity = "1";
  document.querySelector(".content").style.display = "none";
  document.querySelector(".nav-bar").style.opacity = "0.5";
  // document.querySelector(".content").style.opacity = "0";
  var subHeader = searchPanel.querySelector("h2");
  type = type || "video";
  if (!q) {
    // subHeader.style.display = "block";
    q = ""; // just in case
    // Add suggested tags / interesting topics like "documentary", "Ted talk", etc.
    // Maybe use/ make an API for this based off of YouTube, Google, or scraping
    document.title = "YouTube article view";
    subHeader.innerHTML = "Suggested articles:";
  }
  else {
    // subHeader.style.display = "none";
    var title;
    if (type == "channelId") {
      title = "Channel ID: " + q;
    }
    else {
      title = "Search results for: " + q;
    }
    subHeader.innerHTML = title;
    document.title = title;
  }
  var request = new XMLHttpRequest();
  var url = "https://www.googleapis.com/youtube/v3/search?maxResults=10&type=" + (type != "channelId" ? type + "&q" : "video&channelId") + "=" + q + (type == "video" ? "&videoCaption=closedCaption&videoDuration=long" : "") + "&part=snippet" + "&fields=items(id%2Csnippet)&key=" + key;
  request.open('GET', url, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      var data = JSON.parse(this.response);
      var link;
      var kind;
      var searchPanel = document.querySelector(".search-panel");
      if (document.location.hash.split("/")[1] == "channel") {
        var searchPanel = document.querySelector(".search-panel");
        var title = data.items[0].snippet.channelTitle;
        document.title = title  + " (YouTube article view)";
        searchPanel.querySelector("h2").innerHTML = "Channel: " + title;
      }
      for (var x = data.items.length - 1; x >= 0; x--) {
        // define link
        link = searchPanel.querySelectorAll("li")[x].querySelector("a");
        link.parentElement.style.display = "block"; //make visible
        // Set title, description, and url
        kind = data.items[x].id.kind.split("#").pop();
        if (kind == "channel") {
          link.href = "#/channel/" + data.items[x].id.channelId; //set the url
        }
        else {
          link.href = "#/video/" + data.items[x].id.videoId; //set the url
        }
        link.querySelector("h3").innerHTML = data.items[x].snippet.title; //set the title
        link.querySelector("p").innerHTML = data.items[x].snippet.description;
        // Set image
        link.querySelector("img").src = data.items[x].snippet.thumbnails.medium.url;
      }
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
}

// Show and hide searchbox
function showSearch() {
  document.getElementsByName("searchMethod")[0].checked = true;
  var searchBox = document.querySelector(".search-box");
  searchBox.style.display = "block";
  searchBox.style.opacity = "0";
  searchBox.style.opacity = "1";
  document.querySelector(".overlay").style.display = "block";
}

function hideSearch() {
  var searchBox = document.querySelector(".search-box");
  searchBox.style.display = "none";
  searchBox.style.opacity = "0";
  document.querySelector(".overlay").style.display = "";
  document.getElementById("query").value;
}

function search() {
  var type;
  var q = document.getElementById("query").value;
  var options = document.getElementsByName("searchMethod"); 
  type = "all";
  if (options[1].checked == true) {
   type = "channel";
  }
  if (options[2].checked == true) {
   type = "video";
  }
  if (options[3].checked == true) {
   type = "videoUrl";
  }
  if (type != "videoUrl") {
    hideSearch();
    // showResults(q, type); // Search for it
    if (q) {
      location.hash = "#/search/" + type + "/" + q; // Go to the search URL
    }
  }
  else {
    hideSearch();
    location.hash = "#"+q.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];
  }
  options[0].checked = true;
}

// Update suggested links
function updateLinks(id, data) {
  // GET "https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=" + id + "&type=video&videoCaption=closedCaption&videoDuration=long&fields=items(id%2Csnippet)&key=" + key
  data = data || {
    "items": [{
      "id": {
        "videoId": "H_8y0WLm78U"
      },
      "snippet": {
        "title": "Monica Lewinsky: The price of shame",
      }
      }, {
      "id": {
        "videoId": "P2AUat93a8Q"
      },
      "snippet": {
        "title": "Why Happy Couples Cheat | Esther Perel | TED Talks",
      }
      }, {
      "id": {
        "videoId": "Ks-_Mh1QhMc"
      },
      "snippet": {
        "title": "Your Body Language Shapes Who You Are | Amy Cuddy | TED Talks",
      }
      }]
  };
  // Fetch related videos
  if (id) {
    var request = new XMLHttpRequest();
    var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=" + id + "&type=video&videoCaption=closedCaption&videoDuration=long&fields=items(id%2Csnippet)&key=" + key;
    request.open('GET', url, true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        data = JSON.parse(this.response);
        var link;
        for (var x = document.getElementById("nav").querySelectorAll("li").length - 1; x >= 0; x--) {
          // define link
          link = document.getElementById("nav").querySelectorAll("li")[x].querySelector("a");

          // Set title and url
          link.href = "#/video/" + data.items[x].id.videoId; // set the url for the links
          var title = data.items[x].snippet.title; // define title
          title = (title.length > 55 ? title.split("|")[0].split(":")[0] : title); // split the title intelligently if it is too long
          title = (title.length > 55 ? title.substr(0, 50) + "..." : title); // make the title even shorter if it's still too long
          link.innerHTML = title; //set the title
          //Show tooltip with description
          var description = data.items[x].snippet.description; // define description
          description = (description.length > 220 ? description.substr(0, 190) + "..." : description); // shorten lengthy descriptions
          link.parentElement.title = description; // set it
        }
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

    // Make sure nav is visible and opaque
    document.querySelector(".nav-bar").style.display = "block";
    // document.querySelector(".nav-bar").style.opacity = 1;
  }
  else {
    console.warn("Missing parameter: id; could not fetch related videos!");
  }
}

// New article parser
function parse(transcript) {
  var content = document.getElementById("content");
  content.innerHTML = "";
  for (var x = 0; x <= transcript.childElementCount - 1; x++) {
    // content.appendChild(document.createTextNode(" " + unescapeHtml(transcript.childNodes[x].innerHTML)));
    content.insertAdjacentHTML("beforeEnd", "<text> " + unescapeHtml(transcript.childNodes[x].innerHTML) + "</text>");
  }
  // remove line break in beginning
  if (content.childNodes[0].childNodes[1].tagName == "BR") {
    content.childNodes[0].childNodes[1].style.display = "none";
    content.childNodes[0].childNodes[2].style.display = "none";
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
    .replace(/&amp;/g, "&")
    .replace(/]/g, "]" + "<br><br>")
    .replace(/\[INAUDIBLE]<br><br>/g, "[INAUDIBLE]")
    // .replace(/--/g, "-")
    .replace(/--/g, "<br>" + "--")
    .replace(/>>/g, "<br><br>");
  // If more special character support is needed, the github.com/mathiasbynens/he library could be used
}

//get video id and update variable
function newURL() {
  // First hide the searchbox just in case
  hideSearch();
  // get video id from hash
  var hash = location.hash.substring(1);
  var split = hash.split("/");
  var id = split.pop();
  // if no hash is present, use a fallback video
  if (location.hash == "") {
    showResults();
    id = fallbackId;
  }
  if (split.length > 1) {
    if (split[1] == "search") {
      // If there is an id
      if (split.length == 3) {
        showResults(decodeURIComponent(id), split[2]);
      }
      // if no Id...
      else {
        showSearch();
        hideResults();
      }
    }
    else if (split[1] == "channel") {
      showResults(id, "channelId");
    }
    else {
      // Get content & show recommended articles
      hideResults();
      hideSearch();
      if (split.length >= 3) {
        var langs = split[2].split("=");
        if (langs[0] == "&lang") {
          var lang = langs[1];
        }
      }
      getContent(id, lang);
    }
  }

  // Update links at top of page
  updateLinks(id);

}

window.addEventListener("load", newURL); //run script on load

//add listener for change in hash
window.onhashchange = function() {
  newURL();
  document.querySelector(".content").style.opacity = "0.1"; //fade out old content
};