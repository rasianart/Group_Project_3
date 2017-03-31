// let moveWithAudio = false;

$(document).ready(function() {

window.moveWithAudio = false;
let tattooCanvas = document.getElementById("tattooCanvas");
let tattooCtx = tattooCanvas.getContext("2d");
let tattooCanvasOffset = $("#tattooCanvas").offset();
let offsetX = tattooCanvasOffset.left;
let offsetY = tattooCanvasOffset.top;
let storedLines = [];
window.finishedAudioAnimate = false;
let startX = 0;
let startY = 0;
let isDown;
let isHover = false;
let isMoved = false;
let completeAbout = false;
let completeListen = false;
let completeZ = false;
let holdX;
let holdY;
let initMenuButton = false;
let isToggled = false;
returnDarkRight = false;
let enter1 = false;
let enter2 = false;
let inHead = false;
let onHover = false;
let eyeHover, earHover, headHover, aboutHover = false;
let earDropHover = false;
let hoverArray = [eyeHover, earHover, headHover, aboutHover];
let hoverArrayString = ['eye-hover', 'ear-hover', 'head-hover', 'about-hover'];
let audio = new Audio('../audio/beep.mp3');

let eyeCoordinateX = parseInt($('#eye-hover').css('margin-left')) + 100;
let eyeCoordinateY = parseInt($('#eye-hover').css('margin-top')) + 100;
let aboutCoordinateX = parseInt($('#about-hover').css('margin-left')) + 100;
let aboutCoordinateY = parseInt($('#about-hover').css('margin-top')) + 100;

audio.volume = .10;
tattooCtx.strokeStyle = "white";
tattooCtx.lineWidth = 2;

let divHover = (hovArr) => {
    hovArr.forEach(function(itm, index) {
        $('#' + itm).on('mouseenter', () => {
            hoverArray[index] = true;
        });
        $('#' + itm).on('mouseleave', () => {
            hoverArray[index] = false;
        });
    })
}

divHover(hoverArrayString);

$('#eye-hover').on('mouseenter', () => {
    $('#eye-circle').css({'transform': 'scale(1.2)'});
    $('#img2').css({'opacity': '1'});
});

$('#eye-hover').on('mouseleave', () => {
    if (!isHover){
        $('#img2').css({'opacity': '0'});
    }
    $('#eye-circle').css({'transform': 'scale(1.0)'});
});

$(document).mousedown(function (e) {
    handleMouseDown(e);
});
$(document).mousemove(function (e) {
    handleMouseMove(e);
});
$(document).mouseup(function (e) {
    handleMouseUp(e);
});
$(document).mouseout(function (e) {
    handleMouseOut(e);
});

const fadeOutLines = () => {
    isToggled = !isToggled;
    if (!isToggled) {
        $('#tattooCanvas').css({'opacity': '1'});
    } else {
        $('#tattooCanvas').css({'opacity': '0'});
    }
}

$(document).on('keypress', function(e) {
    e.preventDefault();
    if (e.which === 122) {
        fadeOutLines();
    }
});

$(document).on('click', 'div#z', () => {
    enter1 = false;
    enter2 = false;
    fadeOutLines();
});

$(document).on('click', 'div#return-button', () => {
    fadeOutLines();
});

$(document).on('click', 'li.blooming-menu__item', function(e) {
    fadeOutLines();
});

function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isHover) {
        return;
    }

    // tattooCtx.strokeStyle = "white";
    // tattooCtx.lineWidth = 2;

    isDown = true;

    let tempX = e.pageX;
    let tempY = e.pageY;
    let scrollX = $('.img-contain').scrollLeft();
    let scrollY = $('#page-contain').scrollTop();
    let iX = scrollX + tempX;
    let iY = scrollY + tempY;
    holdX = iX;
    holdY = iY;
    // console.log(iX, iY);
    if (isDown) {
        if (hoverArray[0]) {
            enter1 = true;
            iX = 548;
            iY = 696;
        }
        isDown = true;
        startX = iX;
        startY = iY;
    }
}

function handleMouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    let tempX = e.pageX;
    let tempY = e.pageY;
    let scrollX = $('.img-contain').scrollLeft();
    let scrollY = $('#page-contain').scrollTop();
    let iX = scrollX + tempX;
    let iY = scrollY + tempY;
    // console.log(iX, iY);
    if (!isMoved) {
        startX = 940;
        startY = 655;
    }

    isMoved = true;

    // console.log(hoverArray[2]);
    // hoverArray[2] && clickEffect(e);

    if ((!completeAbout || !completeListen || !completeZ) && iX > 900 && iX < 950 && iY > 630 && iY < 670) {

        if (!initMenuButton) {
            initMenuButton = true;
            let returnButton = $('<div id="return-button"></div>').appendTo('body');
            setTimeout(()=>{
                returnButton.css({'opacity': '.5'});
            }, 10);
        }
        isHover = true;
        if (!onHover) {
            audio.play()
        }
        onHover = true;
    } else {
        onHover = false;
    }

    if (isHover) {
        $('#about-hover').css({
            'margin-left': '490px',
            'margin-top': '640px',
            'opacity': '1'
        });
        $('#ear-hover').css({
            'margin-left': '1315px',
            'margin-top': '650px',
            'opacity': '1'
        });
        $('#head-hover').css({
            'margin-left': '1100px',
            'margin-top': '350px',
            'opacity': '1'
        });
    }

    if (isHover && iX > eyeCoordinateX + 25) {
        !completeAbout && $('#near-sight-text').css({'opacity': '0'});
        !completeListen && $('#hear').css({'opacity': '1'});
    } else if (isHover && iX < eyeCoordinateX - 25) {
        !completeAbout && $('#near-sight-text').css({'opacity': '1'});
        !completeListen && $('#hear').css({'opacity': '0'});
    } else if (iX > 1375 && earDropHover && finishedAudioAnimate) {
        $('#dark-half').css({'opacity': '1'});
    } else if (returnDarkRight && finishedAudioAnimate) {
        $('#dark-half').css({'opacity': '1'});
    } else if (finishedAudioAnimate) {
        $('#dark-half').css({'opacity': '0'});
    } else {
        $('#near-sight-text').css({'opacity': '1'});
        $('#hear').css({'opacity': '1'});
    }

    if (!completeZ) {
        if (isHover && iY < eyeCoordinateY + 25 && iX > eyeCoordinateX -25) {
            $('#z').css({'opacity': '1'});
        } else {
            $('#z').css({'opacity': '0'});
        }
    }

    if (iY > 950 && !completeAbout && !completeListen) {
        $('#near-sight-text').css({'opacity': '0'});
        $('#hear').css({'opacity': '0'});
    }

    if (!isDown && !isHover) {
        !completeAbout && $('#about-hover').css({'opacity': '0'});
        !completeListen && $('#ear-hover').css({'opacity': '0'});
        !completeZ && $('#head-hover').css({'opacity': '0'});
        return;
    }

    //connect outer sight
    if (hoverArray[3] && isHover && !isDown && !isToggled) {

        storedLines.push({
            x1: 940,
            y1: 655,
            x2: 548,
            y2: 696
        });
        isHover = false;
        $('#img2').css({'opacity': '0'});
        redrawStoredLines();
        let mouthSphere = $('<div id="mouth-sphere"></div>').appendTo('#img-contain1');
        completeAbout = true;
        enter1 = false;
        enter2 = false;
        setTimeout(()=>{
            mouthSphere.css({
                'width': '75px',
                'height': '75px',
                'border': '2px solid white',
                'margin-left': '800px',
                'margin-top': '900px'
            });

            audio.play();

            let xA = 548;
            let yA = 696;

            // setTimeout(()=>{
            //     $('#img-oil').css({'opacity': '.75'});
            // }, 750);

            let followMouth = setInterval(()=>{

                if (xA > 840 && yA > 940) {
                    $('#about-text-holder').data('text', 'active');
                    // $('#img-oil').css({'opacity': '1'});
                    return;
                }
                storedLines.push({
                    x1: 548,
                    y1: 696,
                    x2: xA,
                    y2: yA
                });
                xA = xA + 1.2;
                yA++;
                redrawStoredLines();
            }, 5)
        },1);
    }

    //connect ear
    if (hoverArray[1] && isHover && !isDown && !isToggled) {

        storedLines.push({
            x1: 940,
            y1: 655,
            x2: 1345,
            y2: 680
        });
        expandAudio();
        isHover = false;
        $('#img2').css({'opacity': '0'});
        redrawStoredLines();
        let earSphere = $('<div id="ear-drop"><p id="ear-text">Audio Links</p></div>').appendTo('#img-contain1');
        $('#hear').data('activate', 'complete');
        completeListen = true;
        enter1 = false;
        enter2 = false;
        setTimeout(()=>{
            earSphere.css({
                'width': '75px',
                'height': '75px',
                'border': '2px solid white',
                'margin-left': '1308px',
                'margin-top': '940px',
                'opacity': '1'
            });

            audio.play();

            let xA = 1345;
            let yA = 680;

            $('#ear-text').css({'opacity': '1', 'margin-left': '-15px', 'font-size': '18px'});

            let followMouth = setInterval(()=>{

                if (xA > 840 && yA > 940) {
                    $('#ear-drop').css({'transition': 'all 0s ease', 'background-color': 'rgba(255, 255, 255, .5)', 'pointer-events': 'auto'});
                    $('#bio-text, .p-contain').css({'pointer-events': 'auto'});
                    setTimeout(()=>{
                        $('#ear-drop').css({'transition': 'all .3s ease', 'background-color': 'rgba(255, 255, 255, .05)'});
                        setTimeout(()=>{
                            $('#ear-drop').css({'transition': 'all 2s ease', 'background-color': 'rgba(0, 0, 0, .15)'});
                        }, 50);
                    }, 50);
                    clearInterval(followMouth);
                    moveWithAudio = true;
                    setTimeout(()=>{
                        moveWithAudio = false;
                    }, 3000);
                    $('#dark-half').css({'opacity': '1'});
                    return;
                }
                storedLines.push({
                    x1: 1345,
                    y1: 680,
                    x2: 1345,
                    y2: yA
                });
                xA = xA + 1.7;
                yA += 1.5;
                redrawStoredLines();
            }, 1);
        },1);
    }



    //connect head
    if (hoverArray[2] && isHover && !isDown && !isToggled) {

        // clickEffect(e);

        storedLines.push({
            x1: 940,
            y1: 655,
            x2: 1120,
            y2: 440
        });
        isHover = false;
        $('#img2').css({'opacity': '0'});
        redrawStoredLines();
        completeZ = true;
        enter1 = false;
        enter2 = false;
        setTimeout(()=>{

            audio.play();

            $('#z').css({
                'transition': 'all .5s ease',
                'opacity': '0'
            }).delay(500).html('').css({
                'transition': 'all 0s ease',
                'margin-left': '0px',
                'margin-top': '0px',
                'background': 'url(../images/headimg.png)'
            });

            setTimeout(()=>{
                $('#z').css({
                    'opacity': '1',
                    'transition': 'all .5s ease'
                });
            }, 100);
        },1);
    }

    if (isDown && !isToggled) {
        redrawStoredLines();
        // draw the current line
        tattooCtx.beginPath();
        tattooCtx.moveTo(startX, startY);
        tattooCtx.lineTo(iX, iY);
        tattooCtx.stroke();
    } else if (isHover && !isDown && !isToggled) {

        redrawStoredLines();
        enter1 = true;
        tattooCtx.beginPath();
        tattooCtx.moveTo(startX, startY);
        tattooCtx.lineTo(940, 655);
        tattooCtx.stroke();

        isHover = true;
        startX = iX;
        startY = iY;
    }
}

const raiseTextLines = () => {
    setTimeout(()=>{
        let raiseCount = 1;
        let raise = setInterval(()=>{
            let randomMargin = Math.floor(Math.random()*(1850-1650+1)+1650);
            let randomThickness = Math.floor(Math.random()*(3-1+1)+1);
            (randomThickness === 3) && (randomThickness = 2.5);
            let randomWidth = Math.floor(Math.random()*(1200-808+1)+800);
            let line = $(`<div id="line${raiseCount}" class="raise-lines"></div>`).appendTo('#img-contain1');
            setTimeout(()=>{
                if (raiseCount === 6) {
                    randomWidth =  1495;
                    randomMargin = 1725;
                }
                line.css({'margin-top': raiseCount * 50 + 262, 'margin-left': randomMargin + 'px', 'width': randomWidth + 'px', 'border-bottom': randomThickness + 'px solid rgba(0, 0, 0, .4)'});
            }, 100);
            if (raiseCount == 9) {
                clearInterval(raise);
                setTimeout(()=>{
                    $('.lead').css({'transition': 'all 5s ease', 'opacity': '1'});
                        setTimeout(()=>{
                            $('.lead').css({'transition': 'all .5s ease'});
                        }, 2500);
                }, 500);
            } ;
            raiseCount++;
        }, 200);
    }, 700);
}

const expandAudio = () => {

    if (!earDropHover) {
        returnDarkRight = true;
        raiseTextLines();
        setTimeout(()=>{
            returnDarkRight = false;
            $('#dark-half').css({'transition': 'all 2s ease'});
            setTimeout(()=>{finishedAudioAnimate = true}, 3000);
        }, 3500);
    }

    earDropHover = true;

    if (earDropHover && !isDown && !isToggled) {

        $('#img2').css({'opacity': '0'});

        setTimeout(()=>{
            let xA = 1345;
            let yA = 980;

            let followMouth = setInterval(()=>{

                if (xA > 2500) {
                    clearInterval(followMouth);
                    return;
                }

                storedLines.push({
                    x1: 1345,
                    y1: 980,
                    x2: xA,
                    y2: 980
                });

                // storedLines.push({
                //     x1: 1345,
                //     y1: 980,
                //     x2: xA,
                //     y2: yA
                // });

                xA += 3.85;
                yA -= 1;

                redrawStoredLines();
            }, 5)
        },1);
    }
}
// });

$(document).on('mouseenter', 'div#z', function(e) {
    clickEffect(e);
    // setTimeout(()=>{
        $('#img-oil').css({'transition': 'all .5s ease', 'opacity': '1'});
    // }, 200);
    setTimeout(()=>{
        $('#img-oil').css({'transition': 'all 6s ease', 'opacity': '0'});
    }, 1500);
});
// $(document).on('mouseleave', 'div#z', function(e) {
// });

function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    let tempX = e.pageX;
    let tempY = e.pageY;
    let scrollX = $('.img-contain').scrollLeft();
    let scrollY = $('#page-contain').scrollTop();
    let iX = scrollX + tempX;
    let iY = scrollY + tempY;
    let stopX = iX;
    let stopY = iY;

    if (iX > 479 && iX < 585 && iY > 638 && iY < 766) {
        enter2 = true;
        iX = 548;
        iY = 696;
    }

    if (enter1 && enter2) {
        storedLines.push({
            x1: 940,
            y1: 655,
            x2: iX,
            y2: iY
        });
    }

    enter1 = false;
    enter2 = false;
    $('#img2').css({'opacity': '0'});
    redrawStoredLines();

    isDown = false;
    isHover = false;
}

function handleMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();

    if(!isDown){return;}

    isDown = false;

    redrawStoredLines();
}

function redrawStoredLines() {

    tattooCtx.clearRect(0, 0, tattooCanvas.width, tattooCanvas.height);

    if (storedLines.length == 0) {
        return;
    }

    // redraw each stored line
    for (let i = 0; i < storedLines.length; i++) {
        tattooCtx.beginPath();
        tattooCtx.moveTo(storedLines[i].x1, storedLines[i].y1);
        tattooCtx.lineTo(storedLines[i].x2, storedLines[i].y2);
        tattooCtx.stroke();
    }
}

});
