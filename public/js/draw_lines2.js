$(document).ready(function() {

var tattooCanvas = document.getElementById("tattooCanvas");
var tattooCtx = tattooCanvas.getContext("2d");
var tattooCanvasOffset = $("#tattooCanvas").offset();
var offsetX = tattooCanvasOffset.left;
var offsetY = tattooCanvasOffset.top;
var storedLines = [];
var startX = 0;
var startY = 0;
var isDown;
var isHover = false;
var isMoved = false;
let completeAbout = false;
let completeListen = false;
let completeZ = false;
let holdX;
let holdY;
let initMenuButton = false;
let isToggled = false;
let enter1 = false;
let enter2 = false;
let onHover = false;
let audio = new Audio('../audio/beep.mp3');
audio.volume = .10;


tattooCtx.strokeStyle = "white";
tattooCtx.lineWidth = 3;

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
    isToggled = !isToggled
    if (!isToggled) {
        $('#tattooCanvas').css({'opacity': '1'});
    } else {
        $('#tattooCanvas').css({'opacity': '0'});
    }
}

$(document).on('keypress', function(e) {
    e.preventDefault();
    if (e.which === 122) {
        isToggled = !isToggled;
        fadeOutLines();
    }
});

$(document).on('click', 'div#z', () => {
    isToggled = !isToggled;
    enter1 = false;
    enter2 = false;
    fadeOutLines();
});

$(document).on('click', 'div#return-button', () => {
    isToggled = !isToggled;
    fadeOutLines();
});

$(document).on('click', 'li.blooming-menu__item', function(e) {
    isToggled = !isToggled;
    fadeOutLines();
});

function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();

    if (isHover) {
        return;
    }

    isDown = true;

        let tempX = e.pageX;
        let tempY = e.pageY;
        let scrollX = $('#img-contain').scrollLeft();
        let scrollY = $('#img-contain').scrollTop();
        let iX = scrollX + tempX;
        let iY = scrollY + tempY;
        holdX = iX;
        holdY = iY;
        // console.log(iX, iY);
        if (isDown) {
            if (iX > 479 && iX < 585 && iY > 638 && iY < 766) {
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
    let scrollX = $('#img-contain').scrollLeft();
    let scrollY = $('#img-contain').scrollTop();
    let iX = scrollX + tempX;
    let iY = scrollY + tempY;
    // console.log(iX, iY);
    if (!isMoved) {
        startX = 940;
        startY = 655;
    }

    isMoved = true;

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
        $('#marker1').css({
            'margin-left': '490px',
            'margin-top': '640px',
            'opacity': '1'
        });
        $('#ear-circle').css({
            'margin-left': '1315px',
            'margin-top': '650px',
            'opacity': '1'
        });
        $('#head-circle').css({
            'margin-left': '1100px',
            'margin-top': '350px',
            'opacity': '1'
        });
    }

    if (isHover && iX > 965) {
        !completeAbout && $('#near-sight-text').css({'opacity': '0'});
        !completeListen && $('#hear').css({'opacity': '1'});
    } else if (isHover && iX < 935) {
        !completeAbout && $('#near-sight-text').css({'opacity': '1'});
        !completeListen && $('#hear').css({'opacity': '0'});
    } else {
        $('#near-sight-text').css({'opacity': '1'});
        $('#hear').css({'opacity': '1'});
    }

    if (!completeZ) {
        if (isHover && iY < 630 && iX > 935) {
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
        !completeAbout && $('#marker1').css({'opacity': '0'});
        !completeListen && $('#ear-circle').css({'opacity': '0'});
        !completeZ && $('#head-circle').css({'opacity': '0'});
        return;
    }

    //connect outer sight
    if (iX > 479 && iX < 585 && iY > 638 && iY < 766 && isHover && !isDown && !isToggled) {

        storedLines.push({
            x1: 940,
            y1: 655,
            x2: 548,
            y2: 696
        });
        isHover = false;
        $('#img2').css({'opacity': '0'});
        redrawStoredLines();
        let mouthSphere = $('<div id="mouth-sphere"></div>').appendTo('#img-contain');
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

            tattooCtx.strokeStyle = "white";
            tattooCtx.lineWidth = 2;

            let xA = 548;
            let yA = 696;

            let followMouth = setInterval(()=>{

                if (xA > 840 && yA > 940) {
                    $('#about-text-holder').data('text', 'active');
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
    if (iX > 1300 && iX < 1360 && iY > 650 && iY < 710 && isHover && !isDown && !isToggled) {

        storedLines.push({
            x1: 940,
            y1: 655,
            x2: 1345,
            y2: 680
        });
        isHover = false;
        $('#img2').css({'opacity': '0'});
        redrawStoredLines();
        let mouthSphere = $('<div id="ear-drop"></div>').appendTo('#img-contain');
        $('#hear').data('activate', 'complete');
        completeListen = true;
        enter1 = false;
        enter2 = false;
        setTimeout(()=>{
            mouthSphere.css({
                'width': '75px',
                'height': '75px',
                'border': '2px solid white',
                'margin-left': '1308px',
                'margin-top': '940px'
            });

            audio.play();

            tattooCtx.strokeStyle = "white";
            tattooCtx.lineWidth = 2;

            let xA = 1345;
            let yA = 680;

            let followMouth = setInterval(()=>{

                if (xA > 840 && yA > 940) {
                    return;
                }
                storedLines.push({
                    x1: 1345,
                    y1: 680,
                    x2: 1345,
                    y2: yA
                });
                xA = xA + 1.2;
                yA++;
                redrawStoredLines();
            }, 3)
        },1);
    }

    //connect head
    if (iX > 1100 && iX < 1200 && iY > 350 && iY < 450 && isHover && !isDown && !isToggled) {

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


function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    let tempX = e.pageX;
    let tempY = e.pageY;
    let scrollX = $('#img-contain').scrollLeft();
    let scrollY = $('#img-contain').scrollTop();
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

    let tempX = e.pageX;
    let tempY = e.pageY;
    let scrollX = $('#img-contain').scrollLeft();
    let scrollY = $('#img-contain').scrollTop();
    let iX = scrollX + tempX;
    let iY = scrollY + tempY;

    redrawStoredLines();
}

function redrawStoredLines() {

    tattooCtx.clearRect(0, 0, tattooCanvas.width, tattooCanvas.height);

    if (storedLines.length == 0) {
        return;
    }

    // redraw each stored line
    for (var i = 0; i < storedLines.length; i++) {
        tattooCtx.beginPath();
        tattooCtx.moveTo(storedLines[i].x1, storedLines[i].y1);
        tattooCtx.lineTo(storedLines[i].x2, storedLines[i].y2);
        tattooCtx.stroke();
    }
}

});
