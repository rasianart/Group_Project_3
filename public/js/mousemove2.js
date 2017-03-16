$(document).ready(function() {

    function invert(params) {
      $(this).setPixels({
        x: params.eventX, y: params.eventY,
        width: 50, height: 50,
        // loop through each pixel
        each: function(px) {
          px.r = 255 - px.r;
          px.g = 255 - px.g;
          px.b = 255 - px.b;
        }
      });
    }

    $('canvas').drawImage({
      layer: true,
      fromCenter: false,
      source: '../images/forest.jpg',
      x: 0, y: 0,
      mousemove: invert
    });











});
