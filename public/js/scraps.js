// document.onmousemove = getMouseXY;
// document.getElementById('img').onmousemove = getMouseXY;
// var tempX = 0;
// var tempY = 0;
// var dataIndex;
// let redIndex;
// let count = 0;

// function getMouseXY(e) {
//     tempX = e.pageX;
//     tempY = e.pageY;
//
//     if (tempX < 0) {
//         tempX = 0
//     };
//     if (tempY < 0) {
//         tempY = 0
//     };
//     let adjustedX = Math.round((tempX * myCan.canvas.width) / screen.width);
//     let adjustedY = Math.round((tempY * myCan.canvas.height) / window.outerHeight);
//     dataIndex = (adjustedX * 4) + (adjustedY * myCan.canvas.width * 4);
//
//     var pixelData = myCan.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
//     if (pixelData[0] > 225 && pixelData[1] > 210 && pixelData[2] < 100) {
//         $('#glow').css({
//             'box-shadow': '0px 0px 100px 40px rgb(241, 255, 173)'
//         })
//     } else {
//         $('#glow').css({
//             'box-shadow': '0px 0px 0px 0px white'
//         });
//     }
// }

// let dataRetrieved = false;

// $('#img').mousemove(function(e) {

    // function Coordinates(topLeft, topLeft2, topRight, topRight2, bottomRight, bottomRight2, bottomLeft, bottomLeft2) {
    //     this.topLeft = [topLeft, topLeft2];
    //     this.topRight = [topRight, topRight2];
    //     this.bottomRight = [bottomRight, bottomRight2];
    //     this.bottomLeft = [bottomLeft, bottomLeft2];
    // }
    //
    // let bottom = $('#div').offset().top + $('#div').outerHeight();
    // let right = $('#div').offset().left + $('#div').outerWidth();
    //
    // let one = new Coordinates($('#div').offset().top,
    //     $('#div').offset().left,
    //     $('#div').offset().top,
    //     right,
    //     bottom,
    //     right,
    //     bottom,
    //     $('#div').offset().left);
    // coordHolder.push(one);
// });

// function rgbToHex(r, g, b) {
//     if (r > 255 || g > 255 || b > 255)
//         throw "Invalid color component";
//     return ((r << 16) | (g << 8) | b).toString(16);
// }

// let pixelInt = setInterval(function() {

// $(document).on('mouseover', function() {
// $(document).on('click', function(e) {
//
//     // console.log('moused');
//     var grabSection = myCan.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 50, 50);
//     console.log(grabSection);
//     let reImage = imagedata_to_image(grabSection, e);
//     console.log(reImage);
//
//
//     setTimeout(() => {
//         let pX = e.pageX;
//         let pY = e.pageY;
//         let adjustedX = Math.round((pX * myCan.canvas.width) / screen.width);
//         let adjustedY = Math.round((pY * myCan.canvas.height) / window.outerHeight);
//         console.log(adjustedX);
//         console.log(adjustedY);
//             console.log(pX, pY);
//             // $('.crop-image').offset().left = adjustedX;
//             // $('.crop-image').offset().top = adjustedY;
//             $('.crop-image').css({'margin-top': adjustedY + 100 + 'px','margin-left': adjustedX + 'px'});
//             // $('.crop-image').offset({top:adjustedY,left:adjustedY});
//             // console.log($('.crop-image').offset().left);
//      }, 10);
//
//
//         window.onload = function () {
//
//     // setTimeout(function() {
//         var myPixelation = new ClosePixelation( reImage [
//             { shape: 'diamond', resolution: 98, size: 200, offset: 0, alpha: 0.991 },
//             { shape: 'circle', resolution: 20, size: 19, offset: 0, alpha: 0.991 }
//         ]);
//
//         };
//
//     });
//     function imagedata_to_image(imagedata, e) {
//         var canvas2 = document.createElement('canvas');
//         var ctx = canvas2.getContext('2d');
//         canvas2.width = imagedata.width;
//         canvas2.height = imagedata.height;
//         ctx.putImageData(imagedata, 0, 0);
//
//
//         var image = document.createElement("img");
//         // image.setAttribute('id', 'crop-image');
//         image.className = 'crop-image';
//         image.src = canvas2.toDataURL();
//         $('#page-contain').append(image);
//         return image;
//     }
//
//     $('#vert-line').on('mouseenter', function() {
//         $(this).css({
//             'box-shadow': '0px 0px 500px 50px red'
//         })
//     }).on('mouseleave', function () {
//         $(this).css({
//             'box-shadow': '0px 0px 0px 0px red'
//         })
//     });









// }, 1000);

// let stopPix = () => {
//     clearInterval(pixelInt);
// }

// var img = document.getElementById('pixel-img');
// // create a new Close Pixelation instance with ClosePixelation
// // requires two arguments: the original image element
// // and an array of options
// var myPixelation = new ClosePixelation( img, [
//     { shape: 'diamond', resolution: 98, size: 200, offset: 0, alpha: 0.991 },
//     { shape: 'circle', resolution: 20, size: 19, offset: 0, alpha: 0.991 }
// ]);
// let res = 98;
// let res2 = 20;
// let percent = 1;


// let size =
// let pixelInt = setInterval(function() {
//     myPixelation.render([
//         { resolution: 98*percent, size: 200*percent, offset: 0*percent, alpha: 0.991 },
//         { resolution: 20*percent, size: 19*percent, offset: 0*percent, alpha: 0.991 }
//     ]);
//     // res++;
//     // res2++;
//     percent = percent - .1;
//     console.log(percent);
//
//     if (percent < .0001) {
//         stopPix();
//     }
// }, 1000);
//
// let stopPix = () => {
//     clearInterval(pixelInt);
// }
// re-render the canvas with different options

// // render a single option-set on top
// myPixelation.renderClosePixels({
//   resolution: 48, alpha: 0.5
// });






//
// // Node Constructor
// function Node(x, y) {
//   this.targX = this.ogX = this.x = x;
//   this.targY = this.ogY = this.y = y;
// }
// Node.prototype.update = function(ev, threshold) {
//   if (Math.sqrt(Math.pow(this.ogX - ev.mousePos.x, 2) + Math.pow(this.ogY -ev.mousePos.y, 2)) < threshold) {
//     var angle = Math.atan2(this.x - ev.mousePos.x, this.y - ev.mousePos.y) - Math.PI / 2;
//     this.targX = this.ogX + (Math.cos(angle) * threshold);
//     this.targY = this.ogY + (Math.sin(-angle) * threshold);
//   } else {
//     this.targX = this.ogX;
//     this.targY = this.ogY;
//   }
//
//   this.x += (this.targX - this.x) * 0.045;
//   this.y += (this.targY - this.y) * 0.045;
// };
//
// Node.prototype.render = function(ctx) {
//   ctx.save();
//   ctx.fillStyle = 'transparent';
//   ctx.strokeStyle = 'white';
//   ctx.beginPath();
//   ctx.lineWidth = 0;
//   ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI, true);
//   ctx.fill();
//   ctx.stroke();
//   ctx.restore();
// };
//
// // Node Manager Constructor
// function NodeManager(n, dw, dh, threshold) {
//   this.n = n; // Dimensions of field
//   this.dw = dw; // Horizontal distance between nodes
//   this.dh = dh; // Vertical distance between nodes
//   this.threshold = threshold;
//   this.nodes = [];
//   for(var i = 0; i < n; i++) {
//     this.nodes.push([]);
//     for(var j = 0; j < n; j++) {
//       this.nodes[i].push(new Node((i * dw) + (dw / 2), (j * dh) + (dh / 2)));
//     }
//   }
// }
// NodeManager.prototype.update = function(ev) {
//   var that = this;
//   this.nodes.forEach(function(row) {
//     row.forEach(function(node) {
//       node.update(ev, that.threshold);
//     });
//   });
// };
// NodeManager.prototype.render = function(ctx) {
//   this.nodes.forEach(function(row) {
//     row.forEach(function(node) {
//       node.render(ctx);
//     });
//   });
// };
// NodeManager.prototype.renderLines = function(ctx) {
//   ctx.save();
//   ctx.strokeStyle = 'white';
//   ctx.lineWidth = 1;
//   ctx.beginPath();
//   for(var i = 0; i < this.n; i++) {
//     for(var j = 0; j < this.n; j++) {
//       ctx.moveTo(this.nodes[i][j].x, this.nodes[i][j].y);
//       try { ctx.lineTo(this.nodes[i + 1][j].x, this.nodes[i + 1][j].y); }
//       catch(e) { }
//       ctx.moveTo(this.nodes[i][j].x, this.nodes[i][j].y);
//       try { ctx.lineTo(this.nodes[i][j + 1].x, this.nodes[i][j + 1].y); }
//       catch(e) { }
//     }
//   }
//   ctx.stroke();
//   ctx.restore();
//
// };
//
// // Event Manager Constructor
// function EventManager() {
//   this.mousePos = {
//     x: NaN,
//     y: NaN
//   };
//
//   var that = this;
//
//   window.onmousemove = function(e) {
//     that.mousePos.x = e.clientX;
//     that.mousePos.y = e.clientY;
//   };
// };
//
// // Demo
// // ===========
//
// // Event Manager
// var ev = new EventManager();
//
// // Node initialization
// var n = 35; // Size of field
// var nm = new NodeManager(n, myCan.canvas.width / n, myCan.canvas.height / n, 105);
//
// // Canvas initialization
// var canvas = document.createElement('canvas');
// let imgCan = document.getElementById('img-contain');
// canvas.width = myCan.canvas.width;
// canvas.height = myCan.canvas.height;
// canvas.setAttribute('id', 'grid');
// imgCan.appendChild(canvas);
// var ctx = canvas.getContext('2d');
// ctx.globalAlpha = 0.5;
//
// requestAnimationFrame(frame = function() {
//   // Inefficiently clear the canvas.... lol
//
//   ctx.save();
//   ctx.fillStyle = 'transparent';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   ctx.restore();
//
//   // Update and render nodes
//   nm.update(ev);
//   nm.render(ctx);
//   nm.renderLines(ctx);
//   requestAnimationFrame(frame);
// });
// var pixImg = document.getElementById('pixel-img');
//
// setTimeout(function() {
//     var myPixelation = new ClosePixelation( pixImg [
//                 { shape: 'diamond', resolution: 98, size: 200, offset: 0, alpha: 0.991 },
//                 { shape: 'circle', resolution: 20, size: 19, offset: 0, alpha: 0.991 }
//             ]);
//         }, 1000);









// var img = document.getElementById('img');
//
// var myPixelation = new ClosePixelation( img, [
//     { shape: 'diamond', resolution: 98, size: 200, offset: 0, alpha: 0.991 },
//     { shape: 'circle', resolution: 20, size: 19, offset: 0, alpha: 0.991 }
// ]);
// $(document).one('click', function() {
//     myPixelation.render([
//         { shape: 'diamond', resolution: 50, size: 200, offset: 0, alpha: 0.991 },
//         { shape: 'circle', resolution: 10, size: 19, offset: 0, alpha: 0.991 }
//     ]);
// })

// var context2 = new AudioContext();
// var context = new AudioContext(),
//     mousedown = false,
//     oscillator,
//     gainNode,
//     gainNode2;
// var audio = document.getElementById("audio");
// var source, source2;
// var stream;
// var soundSource, concertHallBuffer;
// var FilterSample = {
//     FREQ_MUL: 7000,
//     QUAL_MUL: 30,
//     playing: false
// };
// let soundBuffer;
//
// let request = new XMLHttpRequest();
// request.open('GET', './audio/baseriff.mp3', true);
// request.responseType = 'arraybuffer';
//
// request.onload = function() {
//     context.decodeAudioData(request.response, function(buffer) {
//         soundBuffer = buffer;
//         document.body.addEventListener('mouseover', function(e) {
//             FilterSample.play(soundBuffer);
//         });
//     });
// }
// request.send();
//
// gainNode = context.createGain();
// gainNode2 = context2.createGain();
// gainNode.gain.value = 0;
// gainNode2.gain.value = 0;
//
// FilterSample.play = function(buffer) {
//     source = context.createBufferSource();
//     source.buffer = buffer;
//     gainNode = context.createGain();
//     gainNode.gain.value = 0;
//     source.connect(gainNode);
//     gainNode.connect(context.destination);
//     source.start(0);
//     source.loop = true;
// }
