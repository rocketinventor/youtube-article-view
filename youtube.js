var id; //make video id variable public
id = "zzfCVBSsvqA"; //set fallback url if no hash
var transcript; //another public var
newURL(); //get url when page loads
var key = "AIzaSyC6Ymc1aoVbR3zMgsZqFCef9SOoHQV5X0Y";

// get data/content/transcript from internet
function getContent() {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    transcript = xhr.responseXML.documentElement;
    // transcript = xhr.responseXML;
    setContent();
  };
  xhr.onerror = function() {
    console.log("Error while getting XML.");
  };
  var url = "https://www.youtube.com/api/timedtext?v=" + id + "&lang=en";
  xhr.open("GET", url);
  xhr.responseType = "document";
  xhr.send();
}

// parse data and update DOM
function setContent() {
  // var content = document.getElementById("content").innerHTML;
  // document.body.innerHTML = transcript.nodeName;
  // objtree_xml = transcript;
  // var xotree_out = xotree.parseXML( objtree_xml );
  // parseXML(transcript);
  // console.log(xotree_out);
  document.getElementById("content").innerHTML = transcript.textContent;
  document.getElementById("img").src = "https://img.youtube.com/vi/" + id + "/maxresdefault.jpg";
  // document.getElementById("link1").href = "tittle1"
  // document.getElementById("link1").text = 
  
  $.ajax({
      url: "https://www.googleapis.com/youtube/v3/videos?id=" + id + "&key="+ key + "&fields=items(snippet)&part=snippet", 
      dataType: "jsonp",
      success: function(data){
               console.log(data.items[0].snippet);
              document.getElementById("title").innerHTML = data.items[0].snippet.title;
              document.getElementById("author").innerHTML = data.items[0].snippet.channelTitle;
      },
      error: function(jqXHR, textStatus, errorThrown) {
          alert (textStatus, + ' | ' + errorThrown);
      }
  });
  
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

// // Changes XML to JSON
// function xmlToJson(xml) {

// 	// Create the return object
// 	var obj = {};

// 	if (xml.nodeType == 1) { // element
// 		// do attributes
// 		if (xml.attributes.length > 0) {
// 		obj["@attributes"] = {};
// 			for (var j = 0; j < xml.attributes.length; j++) {
// 				var attribute = xml.attributes.item(j);
// 				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
// 			}
// 		}
// 	} else if (xml.nodeType == 3) { // text
// 		obj = xml.nodeValue;
// 	}

// 	// do children
// 	if (xml.hasChildNodes()) {
// 		for(var i = 0; i < xml.childNodes.length; i++) {
// 			var item = xml.childNodes.item(i);
// 			var nodeName = item.nodeName;
// 			if (typeof(obj[nodeName]) == "undefined") {
// 				obj[nodeName] = xmlToJson(item);
// 			} else {
// 				if (typeof(obj[nodeName].push) == "undefined") {
// 					var old = obj[nodeName];
// 					obj[nodeName] = [];
// 					obj[nodeName].push(old);
// 				}
// 				obj[nodeName].push(xmlToJson(item));
// 			}
// 		}
// 	}
// 	return obj;
// };

window.onhashchange = newURL; //add listener for change in hash