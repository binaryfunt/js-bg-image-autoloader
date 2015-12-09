$(document).ready(function() {
    $("body").removeClass("no-js");
    
    var theDiv = $("div:first"),
        // Get image URL from inside brackets, e.g. url(http://example.com/image.jpg), even if contained by quotes
        bgSrcRegex = /url\(["|']?(.+?)["|']?\)/,
        theDivBgSrc = theDiv.attr('style').match(bgSrcRegex)[1], // Can't use .css("background") as this gets computed style (none)
        // Get background position info e.g. center center/cover
        bgPosRegex = /url\(.+\)\s(.*?)[;|"]/,
        theDivBgPos = theDiv.attr('style').match(bgPosRegex)[1];
    console.log("background image src " + theDivBgSrc);
    
        
    // Regex to get image size suffix
    var sizeSuffixRegex = /_([^_]*)(?=\.jpg|\.jpeg|\.png|\.gif)/;
    
    var bgs = {
        lowResBgSrc: theDivBgSrc.replace(sizeSuffixRegex, "_XS"),
        highResBgSrc: theDivBgSrc.replace(sizeSuffixRegex, "_XL")
    };
    
    // In case browser has put quotes around the high res src, remove all quotes
    var removeQuotesRegex = /("|')/g;
    for (bgSrc in bgs) {
        bgs[bgSrc] = bgs[bgSrc].replace(removeQuotesRegex, "");
    }
    
    // Pre-load low res background image
    var imgS = new Image();
    console.log("new image created " + imgS.src);
    $(imgS).attr("src", bgs.lowResBgSrc);
    console.log("imgS source set " + imgS.src);

    $(imgS).load(function() {
        // Show low res image (whilst waiting for high res to load)
        console.log("imgS loaded");
        theDiv.css("cssText", "background: url(" + bgs.lowResBgSrc + ") " + theDivBgPos + " !important");
        // .css("background", "url(etc) !important") doesn't work, won't override CSS stylesheet !important
        console.log("div css changed");
    });
    
    // Create MediaQueryListener object
    var mql = window.matchMedia("(-webkit-min-device-pixel-ratio: 1), (min-device-pixel-ratio: 1), (min-resolution: 96dpi), (min-resolution: 1dppx)");
    // Just a starter media query, will need to use ones for different resolutions etc
    console.log(mql);
    if (mql.matches) {
        console.log("Media match success");
        // Pre-load high res image
        var imgL = new Image();
        console.log("new image created " + imgL.src);
        $(imgL).attr("src", bgs.highResBgSrc);
        console.log("imgL source set " + imgL.src);
        
        // After high res image has pre-loaded, replace original image
        $(imgL).load(function() {
            console.log("imgL loaded");
            theDiv.css("cssText", "background: url(" + bgs.highResBgSrc + ") " + theDivBgPos + " !important");
            // .css("background", "url(etc) !important") won't override CSS stylesheet !important
            console.log("div css changed");
        });
    }
});