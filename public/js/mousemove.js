$(document).ready(function() {

    let coordHolder = [];
    let activate = false;
    let toggle = false;
    let scrollTransition = false;
    let bloomToggle = false;
    let isHover = false;
    let shiftScroll = false;

    // $('#img-masc').css({'opacity': '.5'});
    // setTimeout(()=>{
    //     $('#img-masc').css({'transition': 'all 5s ease', 'filter': 'contrast(100%)', 'opacity': '1'});
    // }, 1500);

    $('.abs, absR').on('mouseenter', ()=>{
        clearInterval(activateMouse);
    })
    $('.abs, absR').on('mouseleave', ()=>{
        activateMouse = setInterval(updateMouse, 10);
    })

    $('#chaneysegura').css({
        'opacity': '.75',
        'margin-bottom': '367px',
        'transform': 'scale(1, 1)',
    });

    // setTimeout(() => {
    //     $('#chaneysegura').css({'transition': 'all 15s ease', 'filter': 'brightness(2)'});
    // }, 5000);

    $("img.lazy").lazyload({
        threshold: 700,
        effect: "fadeIn",
        event: "mouseover",
        load: function() {
            $('#cv').css({'opacity': '1'});
        }
    });

    const typeAbout = () => {
        $("#text1").typed({
            strings: ["Lorem Ipsum is simply dummy text"],
            typeSpeed: 0,
            backDelay: 5000000,
            showCursor: false
        });
        $("#text2").typed({
            strings: ["of the printing and typesetting industry."],
            typeSpeed: 0,
            backDelay: 5000000,
            showCursor: false
        });
        $("#text3").typed({
            strings: ["Ipsum has been the industry's standard"],
            typeSpeed: 0,
            backDelay: 5000000,
            showCursor: false
        });

        $('#about-text-holder').css({
            'margin-left': '375px'
        })
    };

    // typeAbout();

    const ambAudio = document.getElementById('ambient-audio');
    ambAudio.volume = .75;

    $('#ear-hover').on('mouseenter', () => {
        ambAudio.muted = true;
    });
    $('#ear-hover').on('mouseleave', () => {
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
                'height': '36px',
                'width': '1800px',
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

    let $gal = $("#page-contain"),
        galW = 1224,
        galH = 600,
        // galH = $gal.outerHeight(true),
        galSW = 19584,
        // galSW = $gal[0].scrollWidth * 2,
        galSH = $gal[0].scrollHeight * 4,
        wDiff = (galSW / galW) - 1, // widths difference ratio
        hDiff = (galSH / galH) - 1,
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
        posY = 36.3,
        mmAA = galW - (mPadd * 2),
        mmAAH = galH - (mPadd * 2), // The mousemove available area
        mmAAr = (galW / mmAA);
        mmAArH = (galH / mmAAH); // get available mousemove fidderence ratio

    const containerX = document.querySelector('.img-contain');
    const containerY = document.getElementById('page-contain');
    containerY.scrollTop = 800;
    containerX.scrollLeft = 400;

    let initWait;

    const initDamp = () => {
        let decrement = 2;
        initWait = setInterval(function() {

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
            if (damp < 2650) {
                stopInt();
            }
        }, 10);
    }

    const stopInt = () => {
        clearInterval(initWait);
    }

    // damp = 2650;
//******** UNCOMMENT THIS TIMOUT AND COMMENT THE PREVIOUS damp = 1650; AFTER DONE TESTING
    setTimeout(() => {
        $gal.mousemove(function(e) {

            !activate && initDamp();
            activate = true;

            tempX2 = e.pageX;
            tempY2 = e.pageY;

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
        });
    }, 1000);

    let updateMouse = () => {

        if (activate && !scrollTransition) {

            posX += (mX2 - posX - 550) / damp;
            if (posX < 0) {posX = 0}
            if (!moveWithAudio) {
                $('.img-contain').scrollLeft((posX * wDiff));
            } else if (!shiftScroll) {

                shiftScroll = true;
                clearInterval(activateMouse);

                $('.img-contain').animate({
                    scrollLeft: 1400
                }, 3000, function() {
                    stopInt();
                    damp = 13500;
                    initDamp();
                    posX = containerX.scrollLeft / 15;
                    activateMouse = setInterval(updateMouse, 10);
                });
            }

            posY += (mY2 - posY - 250) / damp;
            if (posY < 0) {
                posY = 0
            } else if (posY > 120) {
                posY = 120;
            }
            if (!moveWithAudio) {
                $gal.scrollTop((posY * hDiff))
            } else if (!shiftScroll) {
                $('#page-contain').animate({
                    scrollTop: 600
                }, 3000, function() {
                    posY = containerY.scrollTop / 22.22;
                });
            }
        }
    }
    let activateMouse = setInterval(updateMouse, 10);

    let imgData = [];
    let can;
    let myCan = document.getElementById('img');

    $('#bio-text').on('mouseenter', function() {
        if (damp != 6000) {stopInt()}
        damp = 8000;
    });
    $('#bio-text').on('mouseleave', function() {
        // damp = 8250;
        initDamp();
    })

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
    let hearFont = 18;

    setTimeout(() => {
        initDecay2 = true;
    }, 2000);

    $(document).on('mousemove', function clickFunc(e) {

        let tempX = e.pageX;
        let tempY = e.pageY;
        let scrollX = $('.img-contain').scrollLeft();
        let scrollY = $('#page-contain').scrollTop();
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

            if ($('#hear').data('activate') === 'complete') {
                hearFont = 22;
            }

            switch (elem) {
                case ('#earglow' || '#earglow2' || '#earglow3'):
                    average = average - 1.1;
                    $(elem).css({'opacity': average});
                    break;
                case ('#chaneysegura'):
                    let cutAv;
                    average = average + .3;
                    average > .5 ? cutAv = .5 : average;
                    $(elem).css({'opacity': cutAv || average});
                    break;
                case ('#near-sight-text'):
                    average = -average * 150 + 215;
                    (average < 100) && (average = 100);
                    $(elem).css({'color': 'rgba(' + average + ', ' + average + ', ' + average + ', 1)'});
                    break;
                case ('#hear'):
                    average = average * 20 + 4;
                    average < hearFont ? average = hearFont : average;
                    average > 30 ? average = 30 : average;
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

        colorHover('#near-sight-text', 630, 690);
        colorHover('#hear', 1330, 680);

    });

    let shapeArr = [];
    let countSkip = 0;
    let stopText = false;

    $(document).on('mousemove', function(e) {
        // console.log(damp);
        if (damp < 2650) {
            damp = 2650;
        }

        let tempX = e.pageX;
        let tempY = e.pageY;
        let scrollX = $('#page-contain').scrollLeft();
        let scrollY = $('#page-contain').scrollTop();
        let iX = scrollX + tempX;
        let iY = scrollY + tempY;
        let mouseRangeX = 1450 - iX;
        let mouseRangeY = 1350 - iY;
        let rangeX = (200 - Math.abs(mouseRangeX)) / 2;
        let rangeY = (200 - Math.abs(mouseRangeY)) / 2;
        let range = (rangeX + rangeY) / 2;
        range < 0 ? range = 0 : range;

        if ($('#about-text-holder').data('text') === 'active' && !stopText) {
            stopText = true;
            $('#about-text-holder').data('text', 'inactive');
            typeAbout();
        }
    })

    let page = document.getElementById('page-contain');
    let pxRatioH = 1;
    // let pxRatioH = (window.outerHeight / page.height) * 1.9;
    // let pxRatioW = (window.outerWidth / page.width) * 1.9;
    let pxRatioW = (window.outerWidth / myCan.canvas.width) * 1.9;
    let gainNode;
    let gainNode2;
    let gainArr = [gainNode, gainNode2];
    var audio = document.getElementById("audio");
    let mousedown = false;

    var list = ['./audio/baseriff.mp3', './audio/highpitch.mp3'] //array containing list of music sources
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

    let marker1 = [parseInt(parseInt($('#about-hover').css('margin-left')) * pxRatioW - 400), parseInt(parseInt($('#about-hover').css('margin-top')) * pxRatioH)];
    let marker2 = [parseInt(parseInt($('#ear-hover').css('margin-left')) * pxRatioW + 400), parseInt(parseInt($('#ear-hover').css('margin-top')) * pxRatioH)];
    console.log(marker1[0], marker1[1]);
    console.log(marker2[0], marker2[1]);

    var calculateGain = function(mouseYPosition, mouseXPosition, markerArr) {

        var minGain = 0,
            maxGain = 1;

        mouseXPosition = mouseXPosition + $('.img-contain').scrollLeft() + 1;
        mouseYPosition = mouseYPosition + $('#page-contain').scrollTop() - 30;

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

    document.body.addEventListener('mousedown', function(e) {
        mousedown = true;
        let tempX = e.pageX;
        let tempY = e.pageY;
        let scrollX = $('.img-contain').scrollLeft();
        let scrollY = $('#page-contain').scrollTop();
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
    });

    document.body.addEventListener('mousemove', function(e) {

        if (isHover) {
            gainArr[0].gain.setTargetAtTime(calculateGain(e.clientY, e.clientX, marker1), context.currentTime, .5);
            gainArr[1].gain.setTargetAtTime(calculateGain(e.clientY, e.clientX, marker2), context.currentTime, .5);
        }
    });

    let returnScreen = () => {
        removeBackgroundBlooms();
        $('#bio-text, .p-contain').css({'pointer-events': 'auto'});
        $('#eye-hover, #eye-circle').css({'pointer-events': 'auto'});
        $('.blooming-menu__container').css('opacity', '0');
        $('#page-contain').css({'filter': 'brightness(1)'});
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
        $('#page-contain').toggleClass('scale');
        $('.abs').toggleClass('scale-ui');
        $('.absR').toggleClass('scale-ui2');
        $('.inner-block').toggleClass('opacity');
        $('.imgs').toggleClass('scale-imgs');
        $('.middle-block').toggleClass('top-index');
        $('.vis-text').toggleClass('vis-text-scale');
        // $('.visor').toggleClass('visor-scale');
    }

    const scrollAmount = (x, y) => {
        scrollTransition = true;
        bloomToggle = !bloomToggle;
        removeBackgroundBlooms();
        $('#dark-half').css({'transition': 'all .5s ease', 'opacity': '1'});
        setTimeout(()=>{
            $('#dark-half').css({'transition': 'all 2s ease'});
        }, 10);
        $('#page-contain').css({'filter': 'brightness(1)'});
        $('.img-contain').animate({
            scrollLeft: x
        }, 1500, function() {
            posX = containerX.scrollLeft/ 15;
            scrollTransition = false;
            damp = 5500;
            initDamp();
        });
        $('#page-contain').animate({
            scrollTop: y
        }, 1500, function() {
            console.log(containerY.scrollTop/ 22.22);
            posY = containerY.scrollTop/ 22.22;
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
            case 4:
                scrollAmount(7696, 400);
                break;
        }
    });

    const backgroundURLS = ['url(./images/manlying4THUMB.png)', 'url(./images/teen2s32THUMB.png)', 'url(./images/uncanny2THUMB.png)', 'url(./images/man2THUMB.png)'];

    const removeBackgroundBlooms = () => {
        $('.blooming-menu__item-btn-wrapper').each(function(index) {
            $(this).css({'background': 'none'});
        })
    }

    $(document).on('click', 'button.blooming-menu__main', function(e) {
        bloomToggle = !bloomToggle;
        if (bloomToggle) {
            $('#page-contain').css({'filter': 'brightness(0.75)'});
            $('.blooming-menu__item-btn-wrapper').each(function(index) {
                setTimeout(()=>{
                    $(this).css({'background': backgroundURLS[index], 'background-size': 'cover', 'opacity': '1'});
                }, 250);
            })
        } else {
            $('.blooming-menu__item-btn-wrapper').css({'opacity': '0'});
            $('#page-contain').css({'filter': 'brightness(1)'});
            removeBackgroundBlooms();
        }
    });

    bloomingMenu.render();
    $('.blooming-menu__container').css('opacity', '0');
    $('.blooming-menu__item').css({'border': '1px solid white', 'border-radius': '50%', 'opacity': '1'});
    $('.blooming-menu__item-btn-wrapper').css({'opacity': '0', 'transition': 'all 2s ease'});

    const switchView = () => {
        toggle = !toggle;
        if (toggle) {
            // clearInterval(initWait);
            stopInt();
            $('#bio-text, .p-contain').css({'pointer-events': 'none'});
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
            damp = 5500;
        } else {
            bloomToggle = !bloomToggle;
            damp = 2650;

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

    $(document).on('click', 'div#return-button', () => {
        switchView();
    });

    let countDown = 10;

    let direction = "";
    let oldy = 0;

    let mousemovemethod = function(e) {

        if (e.pageY < oldy) {
            direction = "up";
        } else if (e.pageY > oldy) {
            direction = "down";
        }

        oldy = e.pageY;
    }

    document.onmousemove = mousemovemethod;

    $('.p-contain').on('mouseenter', function() {
        if (finishedAudioAnimate) {
            $(this).children().css({'transition': 'all .5s ease', 'height' : '30px', 'opacity': '1'});
        }
    });

    $('.p-contain').on('mouseleave', function() {
        if (finishedAudioAnimate) {
            if (direction === 'down') {
                $(this).children().css({'transition': 'all 0s ease', 'opacity': '1'});
                setTimeout(()=>{
                    $(this).children().css({'transition': 'all .5s ease', 'height' : '30px'});
                    setTimeout(()=>{
                        // $(this).next().children().css({'transition': 'all 0s ease', 'opacity': '1'});
                        setTimeout(()=>{
                            // $(this).next().children().css({'transition': 'all .5s ease', 'height' : '30px'});
                        }, 500);
                    }, 200);
                }, 10);
            } else {
                $(this).children().css({'transition': 'all .5s ease', 'height' : '0px'});
                setTimeout(()=>{
                    $(this).children().css({'opacity': '0'});
                    // $(this).prev().children().css({'transition': 'all .5s ease', 'height' : '0px'});
                    setTimeout(()=>{
                        // $(this).prev().children().css({'opacity': '0'});
                    }, 500);
                }, 200);
            }
        }
    })

});
