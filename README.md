# yt-loops

An extension to make loops in a youtube video.
You can make multiple loops, enable or disable them.
If multiple loops are enables they are connected to each other, so one loop ends,
the next one follows.


## to create zip

inside the directory:

```bash
zip -r yt-loops-VERSION.zip . -x ".git/*"
```

I remember seeing a comment saying firefox was annoyed by Google for making
manifest version 3, and instead of agreeing, they make it more difficult for
everybody. I mean I get it, Google forcing bad decisions sucks, but you are
punishing everyone! So, for firefox, the manifest needs an extension ID, in a
property that only exists for firefox!

! For firefox, rename manifest-firefox.json into manifest.json
