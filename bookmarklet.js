// pretty js
var video = document.location.href;
var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
var match = video.match(regExp);
document.location = "https://rawgit.com/rocketinventor/youtube-article-view/master/index.html#/video/" + match[2];

// bookmarklet
javascript:(function(){document.location="https://rawgit.com/rocketinventor/youtube-article-view/master/index.html#/video/"+location.href.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];})();