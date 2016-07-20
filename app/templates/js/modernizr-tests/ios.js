/*
Global
Modernizr

*/

/**
 * Detects iOS (any version)
*/
Modernizr.addTest('ios', function () {
	var a = navigator.userAgent||navigator.vendor||window.opera;
    return (/ip(hone|od|ad)/i.test(a));
});

/**
 * Detects iOS7
*/
Modernizr.addTest('ios7', function () {
	var a = navigator.userAgent||navigator.vendor||window.opera;
    var ios7 = (/;.*CPU.*OS 7_\d/i.test(a));
    return (Modernizr.ios && ios7);
});