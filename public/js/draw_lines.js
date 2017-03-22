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
let complete = false;
let holdX;
let holdY;
let audio;

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

    if (!isMoved) {
        startX = 940;
        startY = 655;
    }

    isMoved = true;

    if (!complete && iX > 900 && iX < 950 && iY > 630 && iY < 670) {
        isHover = true;
    }

    if (!isDown && !isHover) {
        return;
    }

    if (iX > 479 && iX < 585 && iY > 638 && iY < 766 && isHover && !isDown) {

        storedLines.push({
            x1: 940,
            y1: 655,
            x2: 548,
            y2: 696
        });
        isHover = false;
        redrawStoredLines();
        console.log('create');
        let mouthSphere = $('<div id="mouth-sphere"></div>').appendTo('#img-contain');
        complete = true;
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

    if (isDown) {
        redrawStoredLines();
        // draw the current line
        tattooCtx.beginPath();
        tattooCtx.moveTo(startX, startY);
        tattooCtx.lineTo(iX, iY);
        tattooCtx.stroke();
    } else if (isHover && !isDown) {

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
