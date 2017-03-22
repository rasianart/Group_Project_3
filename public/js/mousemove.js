$(document).ready(function() {

    let coordHolder = [];
    let activate = false;
    let toggle = false;
    let scrollTransition = false;
    let bloomToggle = false;
    let isHover = false;

    $('#chaneysegura').css({'opacity': '.6'});
    setTimeout(() => {
        $('#chaneysegura').css({'transition': 'all .1s ease'});
    }, 1500);


    $("img.lazy").lazyload({
        threshold: 700,
        effect: "fadeIn",
        event: "mouseover"
    });

    // $(function(){
    // 		$(".element").typed({
    // 			strings: ["It is important to take your medicine every day as prescribed.", "You will receive advice about ways to help you take it regularly so that it has the best chance to help you avoid infection.", "Tell your provider if you are having trouble remembering to take your medicine or if you want to stop medication."],
    // 			typeSpeed: 0
    // 		});
    // 	});

    let ambAudio = document.getElementById('ambient-audio');
    ambAudio.volume = .75;

    $('#ear-circle').on('mouseenter', () => {
        console.log('hey');
        ambAudio.muted = true;
    });
    $('#ear-circle').on('mouseleave', () => {
        ambAudio.muted = false;
    });

    $('.abs').on('mouseenter', function() {
        if (!toggle) {
            $(this).children('.visor').css({
                'width': '1400px',
                'opacity': '1',
                'background-color': 'white'
            });
            $(this).css({
                'transition': 'all .15s ease',
                'background-color': 'white'
            });
        } else {
            $(this).children('.darker').css({
                'background-color': '#d1d1d1'
            });
            $(this).children('.visor').css({
                'width': '1400px',
                'height': '23px',
                'width': '1400px',
                'opacity': '1'
            });
            $(this).css({
                'transition': 'all .15s ease',
                'opacity': '1',
                'background-color': '#999'
            });
        }

    });
    $('.abs').on('mouseleave', function() {
        if (!toggle) {
            $(this).children('.visor').css({
                'width': '70px',
                'opacity': '0',
                'background-color': 'white'
            });
            $(this).css({
                'transition': 'all 1.5s ease',
                'background-color': 'transparent'
            });
        } else {
            $(this).children('.visor').css({
                'height': '30px',
                'width': '70px',
                'opacity': '0'
            });
            $(this).css({
                'transition': 'all 1.5s ease',
                'background-color': '#bcb096'
            });
        }
    });

    var $gal = $("#img-contain"),
        galW = 1224,
        galH = $gal.outerHeight(true),
        galSW = $gal[0].scrollWidth * 2,
        galSH = $gal[0].scrollHeight * 2,
        wDiff = (galSW / galW) - 1,
        hDiff = (galSH / galH) - 1, // widths difference ratio
        // mPadd = 60, // Mousemove Padding
        mPadd = 0, // Mousemove Padding
        damp = 13500, // Mousemove response softness
        dampX = 0,
        dampY = 0,
        mX = 0,
        mY = 0, // Real mouse position
        mX2 = 0,
        mY2 = 0, // Modified mouse position
        posX = 26.75,
        posY = 231,
        mmAA = galW - (mPadd * 2),
        mmAAH = galH - (mPadd * 2), // The mousemove available area
        mmAAr = (galW / mmAA);
        mmAArH = (galH / mmAAH); // get available mousemove fidderence ratio

    var container = document.getElementById('img-contain');
    container.scrollTop = 800;
    container.scrollLeft = 400;


    const initDamp = () => {
        let decrement = 2;
        let initWait = setInterval(function() {

            if (damp >= 13450) {
                decrement = decrement * 1.01;
            }
            else if (damp < 13450 && damp > 12500) {
                decrement = decrement * 1.025;
            }
            else if (damp < 12500 && damp >11500) {
                decrement = decrement * 1.005;
            }
            damp = damp - decrement;
            if (damp < 1650) {
                stopInt();
            }
        }, 10);

        let stopInt = () => {
            clearInterval(initWait);
        }
    }

    // damp = 1650;
//******** UNCOMMENT THIS TIMOUT AND COMMENT THE PREVIOUS damp = 1650; AFTER DONE TESTING

    setTimeout(() => {
        $gal.mousemove(function(e) {

            mX = e.pageX - $(this).parent().offset().left - this.offsetLeft;
            mX2 = Math.min(Math.max(0, mX - mPadd), mmAA) * mmAAr;
            mY = e.pageY - $(this).parent().offset().top - this.offsetTop;
            mY2 = Math.min(Math.max(0, mY - mPadd), mmAAH) * mmAArH;

            let opacAmount = e.pageX * -.001 + .8;
            $('.abs').css({
                'opacity': opacAmount*2
            });
            let opacAmount2 = (e.pageX) * .0015 - 1;
            $('.absR').css({
                'opacity': opacAmount2*2.5
            });

            activate = true;
        });

        initDamp();
    }, 1000);



    // setTimeout(() => {
    //     $('#img-contain').animate({
    //         scrollTop: 700,
    //         scrollLeft: 400
    //     }, 2000, function() {
    //         posX = container.scrollLeft/ 15;
    //         posY = container.scrollTop/ 3.45;
    //         initDamp();
    //     });
    // }, 1200);


    setInterval(function() {
        if (activate && !scrollTransition) {

            posX += (mX2 - posX - 550) / damp; // zeno's paradox equation "catching delay"
            $gal.scrollLeft((posX * wDiff));

            posY += (mY2 - posY - 250) * 5 / damp; // zeno's paradox equation "catching delay"
            $gal.scrollTop((posY * hDiff));
        }
    }, 10);
    let imgData = [];
    let can;
    let myCan = document.getElementById('img');

    myCan.canvas = $('<canvas />')[0];
    myCan.canvas.width = myCan.width;
    myCan.canvas.height = myCan.height;
    myCan.canvas.getContext('2d').drawImage(myCan, 0, 0, myCan.width, myCan.height);

    setTimeout(() => {
        imgData = myCan.canvas.getContext('2d').getImageData(0, 0, myCan.width, myCan.height).data;
    }, 1000);

    let c = 0;
    let initDecay = false;
    let initDecay2 = false;
    let initAverage = .5;

    setTimeout(() => {
        initDecay2 = true;
    }, 2000);

    $(document).on('mousemove', function clickFunc(e) {

        let tempX = e.pageX;
        let tempY = e.pageY;
        let scrollX = $('#img-contain').scrollLeft();
        let scrollY = $('#img-contain').scrollTop();
        let iX = scrollX + tempX - 40;
        let iY = scrollY + tempY - 40;
        var imgX = Math.ceil(iX / 25) * 25;
        var imgY = Math.ceil(iY / 25) * 25;
        if (iX + 40 > 900 && iX + 40 < 950 && iY + 40 > 630 && iY + 40< 670) {
            setTimeout(()=>{
                isHover = true;
            }, 1500);
        }

        if (mousedown === true) {

            let maskCoor = {
                topRx: imgX + 50,
                topRy: imgY + 50,
                midTRx: imgX,
                midTRy: imgY + 100,
                midBRx: imgX - 50,
                midBRy: imgY + 50,
            };

            // let thing = imgX + ' ' + imgY + ',' + maskCoor.topRx + ' ' + maskCoor.topRy + ',' +  maskCoor.midTRx + ' ' + maskCoor.midTRy + ',' +  maskCoor.midBRx + ' ' + maskCoor.midBRy + ',' +  maskCoor.botRx + ' ' + maskCoor.botRy + ',' +
            //                 maskCoor.botLx + ' ' + maskCoor.botLy + ',' +  maskCoor.midBLx + ' ' + maskCoor.midBLy + ',' +  maskCoor.midTLx + ' ' + maskCoor.midTLy;

            let thing = imgX + ' ' + imgY + ',' + maskCoor.topRx + ' ' + maskCoor.topRy + ',' + maskCoor.midTRx + ' ' + maskCoor.midTRy + ',' + maskCoor.midBRx + ' ' + maskCoor.midBRy;


            function makeSVG(tag, attrs) {
                var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
                for (var k in attrs)
                    el.setAttribute(k, attrs[k]);
                return el;
            }

            if (!toggle) {
                var shape = makeSVG('polygon', {
                    points: thing
                });
                document.getElementById('image').appendChild(shape);
            }


        };

        let colorHover = (elem, x, y) => {
            let i2X = scrollX + tempX;
            let i2Y = scrollY + tempY;
            let diffX = Math.abs(Math.abs(x - i2X));
            let diffY = Math.abs(Math.abs(y - i2Y));
            let average = Math.sqrt(((diffX / 2 + diffY / 2) ));
            average = (-average * .01 + .15) * 10 + .3;
            // console.log(i2X, i2Y);
            if (y === 0) {
                diffX = (-diffX * .01 + .15) * .1 + 1;
                $(elem).css({'opacity': diffX});
            }
            switch (elem) {
                case ('#earglow' || '#earglow2' || '#earglow3'):
                    average = average - 1.1;
                    $(elem).css({'opacity': average});
                    break;
                // case ('#img2'):
                //     // average = average * 1.25 - .7 -initAverage;
                //     average = average - .3 -initAverage;
                //     // console.log(average);
                //     $(elem).css({'opacity': average});
                //     // average = average * .25 + 1.06;
                //     // average < 1 ? average = 1 : average;
                //     // average > 1.35 ? average = 1.35 : average;
                //     // $('#eye-circle').css({'transform': 'scale(' + average + ')'});
                //     break;
                case ('#chaneysegura'):
                    let cutAv;
                    average = average + .3;
                    average > .5 ? cutAv = .5 : average;
                    $(elem).css({'opacity': cutAv || average});
                    break;
                case ('#near-sight-text'):
                    average = -average * 150 + 215;
                    $(elem).css({'color': 'rgba(' + average + ', ' + average + ', ' + average + ', 1)'});
                    break;
                case ('#hear'):
                    average = average * 20 + 4;
                    average < 16 ? average = 16 : average;
                    average > 28 ? average = 28 : average;
                    $(elem).css({'font-size': average + 'px' });
                    break;
                default:
                    $(elem).css({'opacity': average});
            }
        }

        if (!initDecay) {
            initDecay = true;
            setTimeout(() => {
                let decAv = setInterval(() => {
                    initAverage -= .001;
                    if (initAverage <= 0 ){
                        clearInterval(decAv);
                    }
                }, 10);
            }, 1000);
        }

        if (initDecay2) {
            // colorHover('#img2', 920, 655);
        }
        // colorHover('#img6', 1175, 300);
        colorHover('#chaneysegura', 850, 1300);
        colorHover('#near-sight-text', 630, 690);
        colorHover('#hear', 1330, 680);

        // colorHover('#earglow', 1320, 685);
        // colorHover('#earglow2', 1330, 655);
        // colorHover('#img3', 1250, 975);
        // colorHover('#img5', 1375, 650);
        // colorHover('#img4', 0, 0);

    });

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

        $('#glow1').css({
            'box-shadow': '0px 0px ' + (range - 80) + 'px ' + (range - 70) + 'px ' + 'white',
            'opacity': (range / 100)
        });
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

        if (tempX < 0) {
            tempX = 0
        };
        if (tempY < 0) {
            tempY = 0
        };
        let adjustedX = Math.round((tempX * myCan.canvas.width) / screen.width);
        let adjustedY = Math.round((tempY * myCan.canvas.height) / window.outerHeight);
        dataIndex = (adjustedX * 4) + (adjustedY * myCan.canvas.width * 4);

        var pixelData = myCan.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
        if (pixelData[0] > 225 && pixelData[1] > 210 && pixelData[2] < 100) {
            $('#glow').css({
                'box-shadow': '0px 0px 100px 40px rgb(241, 255, 173)'
            })
        } else {
            $('#glow').css({
                'box-shadow': '0px 0px 0px 0px white'
            });
        }
    }

    let dataRetrieved = false;

    $('#img').mousemove(function(e) {

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
    });

    function rgbToHex(r, g, b) {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    }

    let pxRatioH = 1;
    let pxRatioW = (window.outerWidth / myCan.canvas.width) * 1.9;
    let gainNode;
    let gainNode2;
    let gainArr = [gainNode, gainNode2];
    var audio = document.getElementById("audio");
    let mousedown = false;

    var list = ['./audio/baseriff.mp3', './audio/highpitch.mp3'] //array containing list of music sources
    // var list = ['./audio/highpitch.mp3'] //array containing list of music sources
    var playListBuffer = new Array(); //array to put in all decoded audio
    var playList = new Array();
    var context = new AudioContext();

    load(list);

    function load(url){
        for (var i=0; i<list.length; i++){ //load in every url
            var request = new XMLHttpRequest();
            request.open('GET', list[i], true);
            request.responseType = 'arraybuffer';

            request.onload = function () { //Async method
                    context.decodeAudioData(this.response, function(buffer) {    //Async method
                        if (!buffer) {
                            alert('error decoding file data: ');
                            return;
                        }

                        playListBuffer.push(buffer);                                //Decode audio and put inside playListBuffer
                        if (list.length==playListBuffer.length){                           //When All files have been decoded show an Array in console
                            prepare(gainArr);
                        }
                                                                            },  function(e) { console.log('Error decoding audio file', e)});

            };

            request.onerror = function() {
                alert('BufferLoader: XHR error');
            }

            request.send();
        }

    }
    function prepare(gArray){
        for (var i=0; i<playListBuffer.length; i++){
            var source = context.createBufferSource();              // creates a sound source
            source.buffer = playListBuffer[i];
            gArray[i] = context.createGain();
            gArray[i].gain.value = 0;
            source.connect(gArray[i]);                     // tell the source which sound to play
            gArray[i].connect(context.destination);                    // connect the source to the context's destination (the speakers)
            playList.push(source);
        }
        playAll();
    }

    function playAll(){
        for (var i=0; i<playList.length; i++){
            playList[i].start(0);
            playList[i].loop = true;
        }
    }

    var calculateFrequency = function(mouseXPosition) {
        var minFrequency = 20,
            maxFrequency = 2000;

        return ((mouseXPosition / window.innerWidth) * maxFrequency) + minFrequency;
    };

    let xReturn;
    let yReturn;
    let average;

    let marker1 = [parseInt(parseInt($('#marker1').css('margin-left')) * pxRatioW), parseInt(parseInt($('#marker1').css('margin-top')) * pxRatioH)];
    let marker2 = [parseInt(parseInt($('#ear-circle').css('margin-left')) * pxRatioW), parseInt(parseInt($('#ear-circle').css('margin-top')) * pxRatioH)];

    var calculateGain = function(mouseYPosition, mouseXPosition, markerArr) {

        marker1 = [parseInt(parseInt($('#marker1').css('margin-left')) * pxRatioW), parseInt(parseInt($('#marker1').css('margin-top')) * pxRatioH)];
        marker2 = [parseInt(parseInt($('#ear-circle').css('margin-left')) * pxRatioW), parseInt(parseInt($('#ear-circle').css('margin-top')) * pxRatioH)];

        var minGain = 0,
            maxGain = 1;

        mouseXPosition = mouseXPosition + $('#img-contain').scrollLeft() + 1;
        mouseYPosition = mouseYPosition + $('#img-contain').scrollTop() - 30;

        if (mouseYPosition > (markerArr[1] - 400) && mouseYPosition < (markerArr[1] + 400)) {
            if (mouseYPosition <= markerArr[1]) {
                yReturn = ((((mouseYPosition) - (markerArr[1] - 400)) / 400) * maxGain) + minGain - 1;
            } else if (mouseYPosition >= markerArr[1]) {
                yReturn = ((((markerArr[1] + 400) - mouseYPosition) / 400) * maxGain) + minGain - 1;
            }
        } else {
            return 0;
        }

        if (mouseXPosition > (markerArr[0] - 400) && mouseXPosition < (markerArr[0] + 400)) {
            if (mouseXPosition <= markerArr[0]) {
                xReturn = ((((mouseXPosition) - (markerArr[0] - 400)) / 400) * maxGain) + minGain;
            } else if (mouseXPosition >= markerArr[0]) {
                xReturn = ((((markerArr[0] + 400) - mouseXPosition) / 400) * maxGain) + minGain;
            }
        } else {
            return 0;
        }


        //controls range of gain
        average = ((xReturn / 2 + yReturn / 2) / 3);

        if (average <= 0) {
            average = 0;
        }
        if (toggle) {
            average = average / 10;
        }

        return average;
    };

    let returnScreen = () => {
        $('#eye-hover, #eye-circle').css({'pointer-events': 'auto'});
        $('.blooming-menu__container').css('opacity', '0');
        $('#img-contain').css({'filter': 'brightness(1)'});
        bloomingMenu.close();
        $('#info-table').css({
            'opacity': '0',
            'margin-top': '-70px'
        });
        $('#descript').css({
            'opacity': '0',
            'margin-bottom': '-70px'
        });
        $('.abs').css({
            'transition': 'all .75s ease',
            'background-color': 'transparent'
        });
        let volCount = .15;
        let raiseVolume = setInterval(() => {
            volCount = volCount + .005;
            ambAudio.volume = volCount;
            if (ambAudio.volume > .99) {
                clearInterval(raiseVolume);
            }
        }, 1);
    }

    let toggleClasses = () => {
        $('#img-contain').toggleClass('scale');
        $('.abs').toggleClass('scale-ui');
        $('.absR').toggleClass('scale-ui2');
        $('.inner-block').toggleClass('opacity');
        $('.imgs').toggleClass('scale-imgs');
    }

    const scrollAmount = (x, y) => {
        scrollTransition = true;
        bloomToggle = !bloomToggle;
        $('#img-contain').css({'filter': 'brightness(1)'});
        $('#img-contain').animate({
            scrollTop: y,
            scrollLeft: x
        }, 1500, function() {
            posX = container.scrollLeft/ 15;
            posY = container.scrollTop/ 3.45;
            scrollTransition = false;
            damp = 2500;
            initDamp();
        });
            toggle = !toggle;
            returnScreen();
            toggleClasses();
    }

    $(document).on('click', 'li.blooming-menu__item', function(e) {
        let chosenBloom = $(this).index()+1;
        switch (chosenBloom) {
            case 1:
                scrollAmount(300, 400);
                break;
            case 2:
                scrollAmount(2748, 400);
                break;
            case 3:
                scrollAmount(5196, 400);
                break;
        }
    });

    $(document).on('click', 'button.blooming-menu__main', function(e) {
        bloomToggle = !bloomToggle;
        console.log('bloom');
        if (bloomToggle) {
            console.log('bloom2');
            $('#img-contain').css({'filter': 'brightness(0.75)'});
        } else {
            $('#img-contain').css({'filter': 'brightness(1)'});
        }
    });

    bloomingMenu.render();
    $('.blooming-menu__container').css('opacity', '0');

    const switchView = () => {
        toggle = !toggle;
        if (toggle) {
            $('#eye-hover, #eye-circle').css({'pointer-events': 'none'});
            $('.blooming-menu__container').css('opacity', '1');
            $('#info-table').css({
                'opacity': '1',
                'margin-top': '193px'
            });
            $('#descript').css({
                'opacity': '1',
                'margin-bottom': '188px'
            });
            $('.abs').css({
                'transition': 'all .75s ease'
            });
            let volCount = 1;
            let lowerVolume = setInterval(() => {
                volCount = volCount - .005;
                ambAudio.volume = volCount;
                if (ambAudio.volume < .15) {
                    clearInterval(lowerVolume);
                }
            }, 1);
        } else {
            returnScreen();
        }
        toggleClasses();
    }

    $(document).on('keypress', function(e) {
        e.preventDefault();
        if (e.which === 122) {
            switchView();
        }
    });

    $(document).on('click', 'div#z', () => {
        switchView();
    });

    document.body.addEventListener('mousedown', function(e) {
        mousedown = true;
        let tempX = e.pageX;
        let tempY = e.pageY;
        let scrollX = $('#img-contain').scrollLeft();
        let scrollY = $('#img-contain').scrollTop();
        let iX = scrollX + tempX - 40;
        let iY = scrollY + tempY - 40;
        var imgX = Math.ceil(iX / 75) * 75;
        var imgY = Math.ceil(iY / 75) * 75;

        let maskCoor = {
            topRx: imgX + 50,
            topRy: imgY + 50,
            midTRx: imgX,
            midTRy: imgY + 100,
            midBRx: imgX - 50,
            midBRy: imgY + 50,
        };

        let thing = imgX + ' ' + imgY + ',' + maskCoor.topRx + ' ' + maskCoor.topRy + ',' + maskCoor.midTRx + ' ' + maskCoor.midTRy + ',' + maskCoor.midBRx + ' ' + maskCoor.midBRy;

        function makeSVG(tag, attrs) {
            var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
            for (var k in attrs)
                el.setAttribute(k, attrs[k]);
            return el;
        }

        if (!toggle) {
            var shape = makeSVG('polygon', {
                points: thing
            });
            document.getElementById('image').appendChild(shape);
        }
    });

    document.body.addEventListener('mouseup', function() {
        mousedown = false;
        // audio.pause();
        // source.stop(0);
    });

    document.body.addEventListener('mousemove', function(e) {

        if (isHover) {
            gainArr[0].gain.setTargetAtTime(calculateGain(e.clientY, e.clientX, marker1), context.currentTime, .5);
            gainArr[1].gain.setTargetAtTime(calculateGain(e.clientY, e.clientX, marker2), context.currentTime, .5);
        }

    });

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





});
