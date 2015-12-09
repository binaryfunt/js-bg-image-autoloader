# js-bg-image-autoloader
Automatically loads background image size that is targeted to screen resolution/size.
This is being developed for saving mobile data, and actualy showing an image (though pixelated) on slow connections,
whilst a sufficiently high res version loads

## How does it work?

This assumes the background image is given by inline styles (which is appropriate in some cases, as the background
image may count as content)

1. JS stops background image from loading. It does this by writing CSS to a style tag.
If no-js, fallback image of medium resolution loads.
1. script.js then grabs the bg-image URL and removes the size suffix (e.g., _L in DSC_8482_L.jpg)
1. Regexes
1. It creates a new low res image with the _S suffix and loads that (quickly) to show something,
using little data
1. If media query matches, it also loads a high res version. When this has finished loading,
it replaces the low res version.
