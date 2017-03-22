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
let complete1 = false;
let complete2 = false;
let complete3 = false;
let holdX;
let holdY;
let audio;
let isToggled = false;

let enter1 = false;
let enter2 = false;

tattooCtx.strokeStyle = "white";
tattooCtx.lineWidth = 3;


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
// $("#clear").click(function () {
//     storedLines.length = 0;
//     redrawStoredLines();
// });
$(document).on('keypress', function(e) {
    e.preventDefault();
    if (e.which === 122) {
        isToggled = !isToggled;
        storedLines.length = 0;
        redrawStoredLines();

    }
});

$(document).on('click', 'div#z', () => {
    isToggled = !isToggled;
    storedLines.length = 0;
    redrawStoredLines();
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

    // if (complete) {
    //     return;
    // }

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

    if ((!complete1 || !complete2 || !complete3) && iX > 900 && iX < 950 && iY > 630 && iY < 670) {
        isHover = true;
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
        $('#near-sight-text').css({'opacity': '0'});
        $('#hear').css({'opacity': '1'});
    } else if (isHover && iX < 935) {
        $('#near-sight-text').css({'opacity': '1'});
        $('#hear').css({'opacity': '0'});
    } else {
        $('#near-sight-text').css({'opacity': '1'});
        $('#hear').css({'opacity': '1'});
    }

    if (!complete3) {
        if (isHover && iY < 630 && iX > 935) {
            $('#z').css({'opacity': '1'});
        } else {
            $('#z').css({'opacity': '0'});
        }
    }

    if (iY > 950) {
        $('#near-sight-text').css({'opacity': '0'});
        $('#hear').css({'opacity': '0'});
    }

    if (!isDown && !isHover) {
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
        redrawStoredLines();
        let mouthSphere = $('<div id="mouth-sphere"></div>').appendTo('#img-contain');
        complete1 = true;
        enter1 = false;
        enter2 = false;
        setTimeout(()=>{
            mouthSphere.css({
                'width': '75px',
                'height': '75px',
                'border': '1px solid white',
                'margin-left': '800px',
                'margin-top': '900px'
            });

            audio = new Audio('../audio/beep.mp3');
            audio.volume = .25;
            audio.play();

            tattooCtx.strokeStyle = "white";
            tattooCtx.lineWidth = 2;

            let xA = 548;
            let yA = 696;

            let followMouth = setInterval(()=>{

                if (xA > 840 && yA > 940) {
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
                // isHover = false;
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
        redrawStoredLines();
        console.log('create');
        let mouthSphere = $('<div id="ear-drop"></div>').appendTo('#img-contain');
        complete2 = true;
        enter1 = false;
        enter2 = false;
        setTimeout(()=>{
            mouthSphere.css({
                'width': '75px',
                'height': '75px',
                'border': '1px solid white',
                'margin-left': '1308px',
                'margin-top': '940px'
            });

            audio = new Audio('../audio/beep.mp3');
            audio.volume = .25;
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
                // isHover = false;
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
        redrawStoredLines();
        complete3 = true;
        enter1 = false;
        enter2 = false;
        setTimeout(()=>{
            audio = new Audio('../audio/beep.mp3');
            audio.volume = .25;
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
    } else  {

        // redrawStoredLines();
        // // draw the current line
        // tattooCtx.beginPath();
        // tattooCtx.moveTo(startX, startY);
        // tattooCtx.lineTo(iX, iY);
        // tattooCtx.stroke();

        // storedLines.push({
        //     x1: startX,
        //     y1: startY,
        //     x2: iX,
        //     y2: iY
        // });
        //
        // let holdX2 = holdX;
        // let holdY2 = holdY;
        // let stopX2 = stopX;
        // let stopY2 = stopY;
        //
        // // console.log(holdY, stopY);
        // isDown = false;
        // isHover = false;
        // let followMouse = setInterval(()=>{
        //     console.log(holdX2, holdY2);
        //     // redrawStoredLines();
        //     if (holdX2 > 0 && holdY2 > 0) {
        //         storedLines = [];
        //         storedLines.push({
        //             x1: holdX2,
        //             y1: holdY2,
        //             x2: stopX2,
        //             y2: stopY2
        //         });
        //         redrawStoredLines();
        //         holdX2 = holdX2 + (stopX2/holdX2) ;
        //         holdY2 = holdX2 + (stopY2/holdY2);
        //     } else {
        //         return;
        //     }
        // }, 5);
    }
    enter1 = false;
    enter2 = false;
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
