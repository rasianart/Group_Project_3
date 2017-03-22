$(document).ready(function() {

    let coordHolder = [];
    let activate = false;
    let toggle = false;

    // var lazyloader = new LazyLoad();
    // $(function() {
        $("img.lazy").lazyload({
            threshold : 700,
            effect : "fadeIn",
            event : "mouseover"
        });
            // $(".imgs").show().lazyload();
        // $("img.lazy").lazyload();
    // });
    $('.abs').on('mouseenter', function() {
        if (!toggle) {
            $(this).children('.visor').css({'width': '1400px', 'opacity': '1', 'background-color': 'white'});
            $(this).css({'transition': 'all .15s ease', 'background-color': 'white'});
        } else {
            $(this).children('.darker').css({'background-color': '#d1d1d1'}) ;
            $(this).children('.visor').css({'width': '1400px', 'height': '23px', 'width': '1400px', 'opacity': '1'}) ;
            $(this).css({'transition': 'all .15s ease', 'opacity': '1', 'background-color': '#999'});
        }

    });
    $('.abs').on('mouseleave', function() {
        if (!toggle) {
            $(this).children('.visor').css({'width': '70px', 'opacity': '0', 'background-color': 'white'});
            $(this).css({'transition': 'all 1.5s ease', 'background-color': 'transparent'});
        } else {
            $(this).children('.visor').css({'height': '30px', 'width': '70px', 'opacity': '0'});
            $(this).css({'transition': 'all 1.5s ease', 'background-color': '#bcb096'});
        }
    });

    // $('.blooming-menu__main-content').css({'opacity': '0 !important'});

    const circle1 = new mojs.Shape({
        fill: 'none',
        radius: 300,
        strokeWidth: {
            10: 0
        },
        scale: {
            0: 1
        },
        angle: {
            'rand(-35, -70)': 0
        },
        duration: 1000,
        left: 0,
        top: 0,
        easing: 'circ.out',
        stroke: '#fff',
        className: 'outerCirc'
    });

    const circle2 = new mojs.Shape({
        fill: 'none',
        radius: 25,
        strokeWidth: {
            50: 0
        },
        scale: {
            0: 1
        },
        angle: {
            'rand(-35, -70)': 0
        },
        duration: 500,
        left: 0,
        top: 0,
        easing: 'circ.out',
        radius: {
            0: 15
        },
        strokeWidth: {
            30: 0
        },
        stroke: 'white',
        delay: 'rand(75, 150)',
        className: 'innerCirc'
    });

    var $gal = $("#img-contain"),
        galW = 1224,
        galH = $gal.outerHeight(true),
        galSW = $gal[0].scrollWidth * 2,
        galSH = $gal[0].scrollHeight * 2,
        wDiff = (galSW / galW) - 1,
        hDiff = (galSH / galH) - 1, // widths difference ratio
        mPadd = 60, // Mousemove Padding
        mPadd = 0, // Mousemove Padding
        // damp   = 0,  // Mousemove response softness
        damp = 3500, // Mousemove response softness
        dampX = 0,
        dampY = 0,
        mX = 0,
        mY = 0, // Real mouse position
        mX2 = 0,
        mY2 = 0, // Modified mouse position
        // posX = 1000,
        // posY = 454,
        // posX = 570,
        // posY = 330,
        posX = 27,
        posY = 231,
        // posX = 0,
        // posY = 0,
        mmAA = galW - (mPadd * 2),
        mmAAH = galH - (mPadd * 2), // The mousemove available area
        mmAAr = (galW / mmAA);
        mmAArH = (galH / mmAAH); // get available mousemove fidderence ratio
console.log(wDiff, hDiff);
    // $('#img-contain').css('height', window.innerHeight);


    // var container = document.getElementsByTagName('body');
    var container = document.getElementById('img-contain');
    // container.scrollTop = 1100;
    // container.scrollLeft = 700;
    container.scrollTop = 800;
    container.scrollLeft = 400;


    let initWait = setInterval(function() {
        damp--;
        if (damp < 1650) {
            stopInt();
        }
    }, 10);

    let stopInt = () => {
        clearInterval(initWait);
    }
    // let mmm;
    $gal.mousemove(function(e) {

        mX = e.pageX - $(this).parent().offset().left - this.offsetLeft;
        mX2 = Math.min(Math.max(0, mX - mPadd), mmAA) * mmAAr;
        // console.log(mX);


        mY = e.pageY - $(this).parent().offset().top - this.offsetTop;
        mY2 = Math.min(Math.max(0, mY - mPadd), mmAAH) * mmAArH;


        let opacAmount = e.pageX * -.0007 + .8;
        // console.log(opacAmount);
        $('.abs').css({'opacity': opacAmount});
        // $('#block1').css({'color': 'rgba(255, 255, 255, ' + opacAmount + ')'});
        // dampX = Math.round((e.pageX * myCan.canvas.width) / screen.width  + 400);
        // if (dampX > 750) {
        //     dampX = 750;
        // }
        // dampY = Math.round((e.pageY * myCan.canvas.height) / screen.height  + 150);
        // console.log(dampY);
        // if (dampY > 350) {
        //     dampY = 350;
        // }
        // mX = Math.round((e.pageX * myCan.canvas.width) / screen.width);
        // mY = Math.round((e.pageY * myCan.canvas.height) / window.outerHeight);


        activate = true;

        // mmm = e.pageY;

    });

    setInterval(function() {
        if (activate) {


            // mY = Math.round((e.pageY * myCan.canvas.height) / window.outerHeight);

            // console.log(damp);
            posX += (mX2 - posX - 550) / damp; // zeno's paradox equation "catching delay"
            // console.log(posX);
            // console.log(wDiff);
            $gal.scrollLeft((posX * wDiff));
            // $('#img-contain, #marker1').scrollLeft((posX * wDiff));
            // $gal.scrollLeft(mX);
            // console.log(posX * wDiff);
            // container.scrollLeft = posX * wDiff;

            posY += (mY2 - posY  - 250) * 5 / damp; // zeno's paradox equation "catching delay"
            // console.log(hDiff);
            $gal.scrollTop((posY * hDiff));
            // $('#img-contain, #marker1').scrollTop((posY * hDiff));
            // $gal.scrollTop(mY);
            // $gal.scrollTop(mY);
            // console.log(mY);
            // console.log(posY * hDiff);
            // console.log(mmm);

            // let newX = (((posX * wDiff) * myCan.canvas.width) / screen.width)/4;
            // let newY = (((posY * hDiff) * myCan.canvas.height) / 777)/4;
            // console.log(newX);
            // window.scrollTo(newX, newY);

        }
    }, 10);
    let imgData = [];
    let can;
    let myCan = document.getElementById('img');

    // $(".img").on('load', function() {
        myCan.canvas = $('<canvas />')[0];
        myCan.canvas.width = myCan.width;
        myCan.canvas.height = myCan.height;
        myCan.canvas.getContext('2d').drawImage(myCan, 0, 0, myCan.width, myCan.height);
    // });

    setTimeout(() => {
        imgData = myCan.canvas.getContext('2d').getImageData(0, 0, myCan.width, myCan.height).data;
        // console.log(imgData);
    }, 1000);

    let c = 0;

    $(document).on('mousemove', function clickFunc(e) {
        if (mousedown === true) {
        let tempX = e.pageX;
        let tempY = e.pageY;
        let scrollX = $('#img-contain').scrollLeft();
        let scrollY = $('#img-contain').scrollTop();
        let iX = scrollX + tempX - 40;
        let iY = scrollY + tempY - 40;
        console.log(iX, iY);
        var imgX = Math.ceil(iX/25) * 25;
        var imgY = Math.ceil(iY/25) * 25;



        console.log(imgX, imgY);
        // let maskCoor = {
        //     topRx: imgX + 25,
        //     topRy: imgY,
        //     midTRx: imgX + 37.5,
        //     midTRy: imgY + 12.5,
        //     midBRx: imgX + 37.5,
        //     midBRy: imgY + 37.5,
        //     botRx: imgX + 25,
        //     botRy: imgY + 50,
        //     botLx: imgX,
        //     botLy: imgY + 50,
        //     midBLx: imgX - 12.5,
        //     midBLy: imgY + 37.5,
        //     midTLx: imgX - 12.5,
        //     midTLy: imgY + 12.5,
        // }
        //
        // let thing = imgX + ' ' + imgY + ',' + maskCoor.topRx + ' ' + maskCoor.topRy + ',' +  maskCoor.midTRx + ' ' + maskCoor.midTRy + ',' +  maskCoor.midBRx + ' ' + maskCoor.midBRy + ',' +  maskCoor.botRx + ' ' + maskCoor.botRy + ',' +
        //                 maskCoor.botLx + ' ' + maskCoor.botLy + ',' +  maskCoor.midBLx + ' ' + maskCoor.midBLy + ',' +  maskCoor.midTLx + ' ' + maskCoor.midTLy;

        // let randX = Math.floor(Math.random() * 50);
        // let randY = Math.floor(Math.random() * 50);
        // console.log(randX);

        // let maskCoor = {
        //     topRx: imgX + randX,
        //     topRy: imgY + randY,
        //     midTRx: imgX,
        //     midTRy: imgY + 50 + randY,
        //     midBRx: imgX - randX,
        //     midBRy: imgY + randY,
        // };

        let maskCoor = {
            topRx: imgX + 50,
            topRy: imgY + 50,
            midTRx: imgX,
            midTRy: imgY + 100,
            midBRx: imgX -50,
            midBRy: imgY + 50,
        };

        // let thing = imgX + ' ' + imgY + ',' + maskCoor.topRx + ' ' + maskCoor.topRy + ',' +  maskCoor.midTRx + ' ' + maskCoor.midTRy + ',' +  maskCoor.midBRx + ' ' + maskCoor.midBRy + ',' +  maskCoor.botRx + ' ' + maskCoor.botRy + ',' +
        //                 maskCoor.botLx + ' ' + maskCoor.botLy + ',' +  maskCoor.midBLx + ' ' + maskCoor.midBLy + ',' +  maskCoor.midTLx + ' ' + maskCoor.midTLy;

        let thing = imgX + ' ' + imgY + ',' + maskCoor.topRx + ' ' + maskCoor.topRy + ',' +  maskCoor.midTRx + ' ' + maskCoor.midTRy + ',' +  maskCoor.midBRx + ' ' + maskCoor.midBRy;


        function makeSVG(tag, attrs) {
            var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs)
                el.setAttribute(k, attrs[k]);
            return el;
        }

        if (!toggle){
            var shape= makeSVG('polygon', {points: thing});
            document.getElementById('image').appendChild(shape);
        }
    }
    });

    $(document).on('click', function (e) {
        // let tempX = e.pageX;
        // let tempY = e.pageY;
        // let scrollX = $('#img-contain').scrollLeft();
        // let scrollY = $('#img-contain').scrollTop();
        // let imgX = scrollX + tempX - 40;
        // let imgY = scrollY + tempY - 40;
        // // let newOut = $('<div class="outter"><div class="inner"></div></div');
        // // newOut.appendTo('#img-contain');
        // // newOut.css({'margin-left': imgX, 'margin-top': imgY});
        // // newOut.children().css({'background-position': imgX + 'px ' + imgY + 'px'});
        // console.log(imgX, imgY);
        // let maskCoor = {
        //     topRx: imgX + 100,
        //     topRy: imgY,
        //     midTRx: imgX + 150,
        //     midTRy: imgY + 50,
        //     midBRx: imgX + 150,
        //     midBRy: imgY + 150,
        //     botRx: imgX + 100,
        //     botRy: imgY + 200,
        //     botLx: imgX,
        //     botLy: imgY + 200,
        //     midBLx: imgX - 50,
        //     midBLy: imgY + 150,
        //     midTLx: imgX - 50,
        //     midTLy: imgY + 50,
        // }
        //
        // let thing = imgX + ' ' + imgY + ',' + maskCoor.topRx + ' ' + maskCoor.topRy + ',' +  maskCoor.midTRx + ' ' + maskCoor.midTRy + ',' +  maskCoor.midBRx + ' ' + maskCoor.midBRy + ',' +  maskCoor.botRx + ' ' + maskCoor.botRy + ',' +
        //                 maskCoor.botLx + ' ' + maskCoor.botLy + ',' +  maskCoor.midBLx + ' ' + maskCoor.midBLy + ',' +  maskCoor.midTLx + ' ' + maskCoor.midTLy;
        // function makeSVG(tag, attrs) {
        //     var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
        //     for (var k in attrs)
        //         el.setAttribute(k, attrs[k]);
        //     return el;
        // }
        //
        // var shape= makeSVG('polygon', {points: thing});
        // document.getElementById('image').appendChild(shape);
        // let points = [[imgX, imgY], [maskCoor.topRx, maskCoor.topRy], [maskCoor.midTRx, maskCoor.midTRy], [maskCoor.midBRx, maskCoor.midBRy], [maskCoor.botRx, maskCoor.botRy], [maskCoor.botLx, maskCoor.botLy], [maskCoor.midBLx, maskCoor.midBLy], [maskCoor.midTLx, maskCoor.midTLy]];

        circle1
            .tune({
                x: e.pageX,
                y: e.pageY
            })
            .replay();
        circle2
            .tune({
                x: e.pageX,
                y: e.pageY
            })
            .replay();
    });


    // setInterval(function() {
    //     let randTime1 = Math.random() * 1000;
    //     let randTime2 = Math.random() * 1000;
    //     let randTime3 = Math.random() * 1000;
    //     let randsize1 = Math.floor(Math.random() * 20) + 1;
    //     let randsize2 = Math.floor(Math.random() * 20) + 1;
    //     let randsize3 = Math.floor(Math.random() * 20) + 1;
    //     $('#glow1').css({'width': randsize1, 'height': randsize1});
    // }, 1000);
    let shapeArr = [];
    let countSkip = 0;
    $(document).on('mousemove', function(e) {
        let tempX = e.pageX;
        let tempY = e.pageY;
        let scrollX = $('#img-contain').scrollLeft();
        let scrollY = $('#img-contain').scrollTop();
        let iX = scrollX + tempX;
        let iY = scrollY + tempY;
        let mouseRangeX = 1450 - iX;
        let mouseRangeY = 1350 - iY;
        let rangeX = (200 - Math.abs(mouseRangeX)) / 2;
        let rangeY = (200 - Math.abs(mouseRangeY)) / 2;
        let range = (rangeX + rangeY) / 2;
        range < 0 ? range = 0 : range;

        // if (countSkip % 10 === 0) {
        //     shapeArr.push(tempX, tempY);
        //     console.log(JSON.stringify(shapeArr));
        //     console.log(shapeArr.length);
        // }
        // count++;


        // let randsize1 = Math.floor(Math.random() * 20) + 1;
        // let randsize2 = Math.floor(Math.random() * 20) + 1;
        // let randsize3 = Math.floor(Math.random() * 20) + 1;
        // let randTime1 = Math.random() * 1000;
        // let randTime2 = Math.random() * 1000;
        // let randTime3 = Math.random() * 1000;
        // console.log(randTime1, randTime2);
        // console.log('enter');
        // $('.glow').css({'box-shadow': '0px 0px 50px 30px white'});
        $('#glow1').css({'box-shadow': '0px 0px ' + (range-80) + 'px ' + (range-70) + 'px ' + 'white', 'opacity': (range/100)});

        // setTimeout(function() {
        //     $('#glow2').css({'width': randsize2, 'height': randsize2, 'box-shadow': '0px 0px 50px 30px white'});
        // }, randTime2);
        // setTimeout(function() {
        //     $('#glow3').css({'width': randsize3, 'height': randsize3, 'box-shadow': '0px 0px 50px 30px white'});
        // }, randTime3);
    })

    // document.onmousemove = getMouseXY;
    document.getElementById('img').onmousemove = getMouseXY;
    var tempX = 0;
    var tempY = 0;
    var dataIndex;
    let redIndex;
    let count = 0;



    function getMouseXY(e) {
        tempX = e.pageX;
        tempY = e.pageY;
        // console.log(tempX, tempY);

        // let box coor

        // let pxRatioH = (window.outerHeight / myCan.canvas.height) * .89;
        // let pxRatioW = (window.outerWidth / myCan.canvas.width);
        // $('.glow').css({
        //     box-shadow: 0px 0px 50px 30px rgb(241, 255, 173);
        // });


        // let newX = ((tempX * myCan.canvas.width) / screen.width)/4;
        // let newY = ((tempY * myCan.canvas.height) / 777)/4;
        // console.log(newX);
        // window.scrollTo(newX, newY);    //ALTERNATIVE SCROLL THAT SCROLLS THE BODY!
        // window.scrollLeft = tempX;
        // window.scrollTop = tempY;

        if (tempX < 0) {
            tempX = 0
        };
        if (tempY < 0) {
            tempY = 0
        };
        let adjustedX = Math.round((tempX * myCan.canvas.width) / screen.width);
        let adjustedY = Math.round((tempY * myCan.canvas.height) / window.outerHeight);
        dataIndex = (adjustedX * 4) + (adjustedY * myCan.canvas.width * 4);
        // console.log("R: " + imgData[dataIndex] + "  G: " + imgData[dataIndex + 1] + "  B: " + imgData[dataIndex + 2]);



        var pixelData = myCan.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
        // console.log(pixelData);
        if (pixelData[0] > 225 && pixelData[1] > 210 && pixelData[2] < 100) {
            $('#glow').css({
                'box-shadow': '0px 0px 100px 40px rgb(241, 255, 173)'
            })
        } else {
            $('#glow').css({
                'box-shadow': '0px 0px 0px 0px white'
            });
        }

        // $('#div').css({
        //     left: tempX,
        //     top: tempY
        // });
    }

    let dataRetrieved = false;

    $('#img').mousemove(function(e) {
        // console.log(e.pageX, e.pageY);

        function Coordinates(topLeft, topLeft2, topRight, topRight2, bottomRight, bottomRight2, bottomLeft, bottomLeft2) {
            this.topLeft = [topLeft, topLeft2];
            this.topRight = [topRight, topRight2];
            this.bottomRight = [bottomRight, bottomRight2];
            this.bottomLeft = [bottomLeft, bottomLeft2];
        }

        let bottom = $('#div').offset().top + $('#div').outerHeight();
        let right = $('#div').offset().left + $('#div').outerWidth();

        let one = new Coordinates($('#div').offset().top,
            $('#div').offset().left,
            $('#div').offset().top,
            right,
            bottom,
            right,
            bottom,
            $('#div').offset().left);
        coordHolder.push(one);
        // $('img').unbind('mousemove');
    });

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }



    // document.addEventListener('click', function(e) {
    //     circle1
    //         .tune({
    //             x: e.pageX,
    //             y: e.pageY
    //         })
    //         .replay();
    //     circle2
    //         .tune({
    //             x: e.pageX,
    //             y: e.pageY
    //         })
    //         .replay();
    //
    //
    //
    //
    //
    // });

    // let adjustedX = Math.round((tempX * myCan.canvas.width) / screen.width);
    // let adjustedY = Math.round((tempY * myCan.canvas.height) / window.outerHeight);

    // let pxRatioH = (window.outerHeight / myCan.canvas.height) * .89;
    let pxRatioH = 1;
    let pxRatioW = (window.outerWidth / myCan.canvas.width) * 1.9;



    // 564
    // 383

    let marker1 = [parseInt(parseInt($('#marker1').css('margin-left')) * pxRatioW), parseInt(parseInt($('#marker1').css('margin-top')) * pxRatioH )];
    // +  parseInt($('#img-contain').scrollTop())
    // console.log(parseInt(parseInt($('#marker1').css('margin-top')) * pxRatioH ));
    // let marker1 = [583+50, 300+50];
    // let marker1 = [583, 395];
    var context2 = new AudioContext();
    var context = new AudioContext(),
        mousedown = false,
        oscillator,
        gainNode,
        gainNode2;
    var audio = document.getElementById("audio");
    var source, source2;
    var stream;
    var soundSource, concertHallBuffer;
    var FilterSample = {
        FREQ_MUL: 7000,
        QUAL_MUL: 30,
        playing: false
    };
    let soundBuffer;

    let request = new XMLHttpRequest();
    request.open('GET', './audio/deafening_seg2.mp3', true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            soundBuffer = buffer;
            document.body.addEventListener('mouseover', function(e) {
                FilterSample.play(soundBuffer);
            });
        });
    }
    request.send();

    // let soundBuffer2;
    //
    // let request2 = new XMLHttpRequest();
    // request2.open('GET', './audio/deafening_seg2.mp3', true);
    // request2.responseType = 'arraybuffer';
    //
    // request.onload = function() {
    //     context.decodeAudioData(request.response, function(buffer) {
    //         soundBuffer = buffer;
    //         context2.decodeAudioData(request2.response, function(buffer2) {
    //             soundBuffer2 = buffer2;
    //             // document.body.addEventListener('mouseover', function(e) {
    //                 FilterSample.play(soundBuffer, soundBuffer2);
    //             // });
    //         });
    //     });
    // }
    // // request.send();
    // request2.send();

    gainNode = context.createGain();
    gainNode2 = context2.createGain();
    gainNode.gain.value = 0;
    gainNode2.gain.value = 0;

    FilterSample.play = function(buffer) {
        source = context.createBufferSource();
        source.buffer = buffer;
        // source2 = context2.createBufferSource();
        // source2.buffer = buffer2;
        gainNode = context.createGain();
        // gainNode2 = context2.createGain();
        gainNode.gain.value = 0;
        // gainNode.gain.setTargetAtTime(calculateGain(e.clientY), context.currentTime, 0.01);

        source.connect(gainNode);
        // gainNode2.connect(gainNode);
        gainNode.connect(context.destination);

        // source2.connect(gainNode2);
        // gainNode2.connect(context2.destination);
        source.start(0);
        // source2.start(0);
    }

    var calculateFrequency = function(mouseXPosition) {
        var minFrequency = 20,
            maxFrequency = 2000;

        return ((mouseXPosition / window.innerWidth) * maxFrequency) + minFrequency;
    };

    let xReturn;
    let yReturn;
    let average;

    var calculateGain = function(mouseYPosition, mouseXPosition) {
        var minGain = 0,
            maxGain = 1;



        // console.log("mouseX pos: " + (((marker1[1] + 100) - mouseYPosition) / 100) * maxGain) + minGain));
        // console.log("markerX pos: " + (marker1[0]));
        // console.log("mouseY pos: " + mouseYPosition);
        // console.log("markerY pos: " + (marker1[1]));
        mouseXPosition = mouseXPosition + $('#img-contain').scrollLeft() + 1;
        mouseYPosition = mouseYPosition + $('#img-contain').scrollTop() - 30;

        if (mouseYPosition > (marker1[1] - 500) && mouseYPosition < (marker1[1] + 500)) {
            if (mouseYPosition <= marker1[1]) {
                yReturn = ((((mouseYPosition) - (marker1[1] - 500)) / 300) * maxGain) + minGain - 1;
                // console.log(yReturn);
                // return 1 - ((((mouseYPosition) - (marker1[1] - 200)) / 100) * maxGain) + minGain;
                // return yReturn;
            } else if (mouseYPosition >= marker1[1]) {
                yReturn = ((((marker1[1] + 500) - mouseYPosition) / 500) * maxGain) + minGain - 1;
                // console.log(yReturn);
                // return (((mouseYPosition - (marker1[1])) / 100) * maxGain) + minGain;
                // return yReturn;
            }
        } else {
            return 0;
        }

       if (mouseXPosition > (marker1[0] - 500) && mouseXPosition < (marker1[0] + 500)) {
           if (mouseXPosition <= marker1[0]) {
               // console.log('2 in');
               xReturn = ((((mouseXPosition) - (marker1[0] - 500)) / 500) * maxGain) + minGain;
            //    return xReturn;
            //    console.log(xReturn);
           } else if (mouseXPosition >= marker1[0] ) {
               // console.log('3 in');
               xReturn = ((((marker1[0] + 500)  - mouseXPosition) / 500) * maxGain) + minGain;
            //    return xReturn;
            //    console.log(xReturn);
           }
       } else {
           return 0;
       }


        // return 1 - ((mouseYPosition / window.innerHeight) * maxGain) + minGain;

        average = ((xReturn/2 + yReturn/2) / 6);

        // return xReturn;
        if (average <= 0) {
            average = 0;
        }
        if (toggle) {
            average = average/10;
        }
        // console.log(average);
        return average;
    };



    $(document).on('keypress', function(e) {
        // console.log(e.which);
        e.preventDefault();
        if (e.which === 122) {

            toggle = !toggle;
            if (toggle) {
                // interval = setInterval(fade, 200);
                // $('audio').animate({volume: 0.0}, 1000);
                // gainNode.gain.value = 0;
                // source.disconnect();
                // gainNode2.connect(gainNode2);
                // $('.visor').addClass('lighter');
                $('#info-table').css({'opacity': '.25', 'margin-top': '195px'});
                bloomingMenu.render();
                $('.abs').css({'transition': 'all .75s ease'});
                // ('.scale-ui').css({'transition': 'all 0s ease'});
            } else {
                // ('.scale-ui').css({'transition': 'all 3s ease'});
                // gainNode.gain.value = 1;
                // source.connect(gainNode);
                // $('audio').animate({volume: 1.0}, 1000);
                $('#info-table').css({'opacity': '0', 'margin-top': '-70px'});
                // setTimeout(function() {
                    // $('#info-table').css({'transition': 'all 1.5s ease', 'color': 'rgba(0, 0, 0, 1)'});
                // }, 750);
                // $('#info-table').delay(1500).css('color', 'rgba(0, 0, 0, 1)');
                $('.abs').css({'transition': 'all .75s ease', 'background-color': 'transparent'});
                $('.blooming-menu__container').remove();
            }



            $('#img-contain').toggleClass('scale');
            $('.abs').toggleClass('scale-ui');
            $('.inner-block').toggleClass('opacity');
            // $('#img').css('width', '100%');
            // $('#img-contain').toggleClass('change-height');
            // $('#img').toggleClass('scale-bg-img');
            // $('#twins').toggleClass('scale-bg-twins');
            // $('#face2').toggleClass('scale-bg-face2');
            // $('#sculpt').toggleClass('scale-bg-sculpt');
            $('.imgs').toggleClass('scale-imgs');
        }
    });

    $(document).on('click', 'button.blooming-menu__main', function() {
        console.log('hit');
        $('.blooming-menu__item-btn').toggleClass('semi-trans');
    })

    document.body.addEventListener('mousedown', function(e) {
        mousedown = true;
        let tempX = e.pageX;
        let tempY = e.pageY;
        let scrollX = $('#img-contain').scrollLeft();
        let scrollY = $('#img-contain').scrollTop();
        let iX = scrollX + tempX - 40;
        let iY = scrollY + tempY - 40;

        // let newOut = $('<div class="outter"><div class="inner"></div></div');
        // newOut.appendTo('#img-contain');
        // newOut.css({'margin-left': imgX, 'margin-top': imgY});
        // newOut.children().css({'background-position': imgX + 'px ' + imgY + 'px'});
        // console.log(iX, iY);
        var imgX = Math.ceil(iX/75) * 75;
        var imgY = Math.ceil(iY/75) * 75;
        // console.log(imgX, imgY);
        // let maskCoor = {
        //     topRx: imgX + 25,
        //     topRy: imgY,
        //     midTRx: imgX + 37.5,
        //     midTRy: imgY + 12.5,
        //     midBRx: imgX + 37.5,
        //     midBRy: imgY + 37.5,
        //     botRx: imgX + 25,
        //     botRy: imgY + 50,
        //     botLx: imgX,
        //     botLy: imgY + 50,
        //     midBLx: imgX - 12.5,
        //     midBLy: imgY + 37.5,
        //     midTLx: imgX - 12.5,
        //     midTLy: imgY + 12.5,
        // };

        // let randX = Math.floor(Math.random() * 50);
        // let randY = Math.floor(Math.random() * 50);
        // console.log(randX);
        //
        // let maskCoor = {
        //     topRx: imgX + randX,
        //     topRy: imgY + randY,
        //     midTRx: imgX,
        //     midTRy: imgY + 50 + randY,
        //     midBRx: imgX - randX,
        //     midBRy: imgY + randY,
        // };

        let maskCoor = {
            topRx: imgX + 50,
            topRy: imgY + 50,
            midTRx: imgX,
            midTRy: imgY + 100,
            midBRx: imgX -50,
            midBRy: imgY + 50,
        };

        // let thing = imgX + ' ' + imgY + ',' + maskCoor.topRx + ' ' + maskCoor.topRy + ',' +  maskCoor.midTRx + ' ' + maskCoor.midTRy + ',' +  maskCoor.midBRx + ' ' + maskCoor.midBRy + ',' +  maskCoor.botRx + ' ' + maskCoor.botRy + ',' +
        //                 maskCoor.botLx + ' ' + maskCoor.botLy + ',' +  maskCoor.midBLx + ' ' + maskCoor.midBLy + ',' +  maskCoor.midTLx + ' ' + maskCoor.midTLy;

        let thing = imgX + ' ' + imgY + ',' + maskCoor.topRx + ' ' + maskCoor.topRy + ',' +  maskCoor.midTRx + ' ' + maskCoor.midTRy + ',' +  maskCoor.midBRx + ' ' + maskCoor.midBRy;

        function makeSVG(tag, attrs) {
            var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs)
                el.setAttribute(k, attrs[k]);
            return el;
        }

        if (!toggle){
            var shape= makeSVG('polygon', {points: thing});
            document.getElementById('image').appendChild(shape);
        }
        // console.log(e.pageX, e.pageY);
    });

    document.body.addEventListener('mouseup', function() {
        mousedown = false;
        audio.pause();
        source.stop(0);
    });


    // setTimeout(() => {
        document.body.addEventListener('mousemove', function(e) {
            // if (mousedown) {
                gainNode.gain.setTargetAtTime(calculateGain(e.clientY, e.clientX), context.currentTime, .5);
                // gainNode2.gain.setTargetAtTime(calculateGain(e.clientY, e.clientX), context2.currentTime, 0.01);
            // }

        });
        // gainNode.gain.setTargetAtTime(calculateGain(0, 0), context.currentTime, 0.01);
    // }, 1000);

let countDown = 10;

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
//         $('#img-contain').append(image);
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



var bloomingMenu = new BloomingMenu({
      startAngle: 0,
      endAngle: 315,
      radius: 100,
      itemsNum: 8,
      fatherElement: document.getElementById('bloom-contain'),
    //   injectBaseCSS: false
    //   injectBaseCSS: false
    })

    // bloomingMenu.render();

    // Prevents "elastic scrolling" on Safari
    document.addEventListener('touchmove', function(event) {
      'use strict'
      event.preventDefault()
    })



});
