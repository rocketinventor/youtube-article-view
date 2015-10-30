# Youtube Article View, _Read_ Your YouTube.

This app makes it simple to read the closed captioning of any YouTube video that supports closed captioning and, do so in a nicely formatted article view.

Features:
- View/read 'article' by pasting video Id after "/#" in url and pressing enter
- Show video description if no CC
- Show tittle above article and as webpage title
- Show HQ thumbnail inline, at top of article
- Display channel name as 'author'
- Compatible with Spritz bookmarklet (Spritzlet)
- Works well, even with (especialy with) long (~2+ hrs.) videos and documentries.

Features (upcoming):
- Display date posted next to author
- Clicking on author (channel) name opens that channel in a new tab and/or lets you explore it inside YAV
- Recommended articles at top based on tags (with hover-over thumbnails)
- Fallback to medium or highres thumbnail for videos that don't have a 'maxres' quality thumnail
- Allow video playback by clicking on thumbnail
- Fix missing spaces after punctuation and/or new rendering method
- Add newlines for, and remove "<<"
- Use Spritz API
- Search feature
- Add 'homepage' with recommended/featured YouTube reading
- Copy and paste _full_ url
- Bookmarklet
- Get auto CC (hack?)
- Android app and/or offline functionalities

Disclaimer: The API (V2) currently being used to get CC data has been officially depreciated and could be discontinued at any time. V3 of the YouTube CC API doesn't seem to support the functionlity needed (although json responses would be nice). The functionality will likely have to be rewritten in the future and will probably have to be implemented using a hack of some sort.

The first working prototype was produced in one night on September 9, 2015.
First avaliable on Github: September 17, 2015.
