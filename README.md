# Youtube Article View, _Read_ Your YouTube.

This app makes it simple to read the closed captioning of any YouTube video that supports closed captioning and, do so in a nicely formatted article view.

Features:
- Quick & proper parsing of video transcript with respect for common special characters
- View/read 'article' by pasting video Id after "/#" in url and pressing enter
- Or, by clicking the bookmarklet
- Show video description if no CC
- Show tittle above article and as webpage title
- Show HQ thumbnail inline, at top of article
- Fallback to medium or highres thumbnail for videos that don't have a 'maxres' quality thumnail
- Display channel name as 'author'
- Compatible with Spritz bookmarklet (Spritzlet)
- Works well, even with (especialy with) long (~2+ hrs.) videos and documentries.

Features (upcoming):
- Display date posted next to author
- Clicking on  the author name allows you to explore other videos on that channel
- Recommended articles at top based on tags (with hover-over thumbnails)
- Allow video playback by clicking on thumbnail
- Add newlines for, and remove "<<"
- Use Spritz API
- Save scroll positions and offer to restore if doesn't match last saved
- Search feature
- Add 'homepage' with recommended/featured YouTube reading
- Copy and paste _full_ url (a button will be in the upper right hand corner)
- Get auto CC (hack?)
- Android app and/or offline functionalities
- Server-side/ hybrid version with 'modern' url scheme (`/id` instead of `/#id`)

Bookmarklet:
The bookmarklet makes it easy to view the currently open YouTube video in Article View.
Steps:
- Copy the code below
- Bookmark this page
- Delete the url and paste the copied code
- Change the title and give it a title

- On desktop, you can just select the code and drag it to the bookmarks bar

Code to copy:
`javascript:(function(){document.location="https://rawgit.com/rocketinventor/youtube-article-view/master/index.html#"+location.href.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/)[2];})();`

Disclaimer: The API (V2) currently being used to get CC data has been officially depreciated and could be discontinued at any time. V3 of the YouTube CC API doesn't seem to support the functionlity needed (although json responses would be nice). The functionality will likely have to be rewritten in the future and will probably have to be implemented using a hack of some sort.

The first working prototype was produced in one night on September 9, 2015.
First avaliable on Github: September 17, 2015.
