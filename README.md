# Youtube Article View, _Read_ Your YouTube.

This app makes it simple to read the closed captioning of any YouTube video that supports it and do so in an attractive, nicely formatted article view.

Features:
- Read Youtube videos in your own, or any avaliable language for that video ("#/video/lang=[lang]/[video id]")
- Quick & proper parsing of video transcript
- Respect for common special characters and formatting denotations
- Intelligent adding of newlines
- Bookmarklet to view/read 'article' directly from YouTube
- Manually read a video by pasting it's video id after "#/video/" in url and pressing enter
- Find "articles" (videos) and "authors" (channels) by searching for them by title, id, or url
- A 'homepage' with recommended/featured YouTube reading
- Suggests alternate languages to read article in when not avaliable in current language
- Show video description if no CC
- Show tittle above article and as webpage title
- Show HQ thumbnail inline, at top of article
- Fallback to medium or highres thumbnail for videos that don't have a 'maxres' quality thumnail
- Search for and view different channels
- Display channel name as 'author'
- Clicking on  the author name allows you to explore other videos on that channel
- A short list of related "articles" and their descriptions (in a tooltip) at the top of the page
- Read recommended articles by clicking on them
- Compatible with Spritz bookmarklet (Spritzlet)
- Works well, even with (especialy with) long (~2+ hrs.) videos and documentries.
- Dependency free! (DOES NOT require Jquery, or the proprietary YouTube js framework).

Features (upcoming):
- Get auto CC (hack?)
- Android app and/or offline functionalities
- Server-side/ hybrid version with 'modern' url scheme (`/id` instead of `/#id`)
- Automatically set language based off of browser preferences
- Improve suggestions (they don't work for all pages)

Bookmarklet:
The bookmarklet makes it easy to view the currently open YouTube video in Article View.
Steps:
- Copy the code below
- Bookmark this page
- Delete the url and paste the copied code
- Change the title to "read video in article view" or something of that sort

- On desktop, you can just select the code and drag it to the bookmarks bar

Code to copy:
`javascript:(function(){document.location="https://rawgit.com/rocketinventor/youtube-article-view/master/index.html#/video/"+location.href.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];})();`

Disclaimer: The API (V2) currently being used to get CC data has been officially depreciated and could be discontinued at any time. V3 of the YouTube CC API doesn't seem to support the functionlity needed (although json responses would be nice). The functionality will likely have to be rewritten in the future and will probably have to be implemented using a hack of some sort.

The first working prototype was produced in one night on September 9, 2015.
First avaliable on Github: September 17, 2015.
