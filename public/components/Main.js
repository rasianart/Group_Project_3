import React from '../../node_modules/react'
import Circles from './Circles'

let $gal,
    galW,
    galH,
    galSW,
    galSH,
    wDiff,
    hDiff, // widths difference ratio
    mPadd, // Mousemove Padding
    damp, // Mousemove response softness
    dampX,
    dampY,
    mX,
    mY, // Real mouse position
    mX2,
    mY2, // Modified mouse position
    posX,
    posY,
    mmAA,
    mmAAH, // The mousemove available area
    mmAAr,
    mmAArH; // get available mousemove fidderence ratio



export default class App extends React.Component{
    constructor(props) {
    super(props);
        this.state = {activate: false};
    }

    componentDidMount = () => {

        $gal = document.getElementById('img-contain'),
        galW = 1224,
        galH = $gal.offsetHeight,
        galSW = $gal.scrollWidth * 2,
        galSH = $gal.scrollHeight * 2,
        wDiff = (galSW / galW) - 1,
        hDiff = (galSH / galH) - 1, // widths difference ratio
        mPadd = 0, // Mousemove Padding
        damp = 3500, // Mousemove response softness
        dampX = 0,
        dampY = 0,
        mX = 0,
        mY = 0, // Real mouse position
        mX2 = 0,
        mY2 = 0, // Modified mouse position
        posX = 27,
        posY = 231,
        mmAA = galW - (mPadd * 2),
        mmAAH = galH - (mPadd * 2), // The mousemove available area
        mmAAr = (galW / mmAA),
        mmAArH = (galH / mmAAH); // get available mousemove fidderence ratio

        let container = document.getElementById('img-contain');
        container.scrollTop = 800;
        container.scrollLeft = 400;

        let initWait = setInterval(() => {
            damp--;
            if (damp < 1650) {
                stopInt();
            }
        }, 10);

        let stopInt = () => {
            clearInterval(initWait);
        }

        setInterval(() => {
            if (this.state.activate === true) {

                posX += (mX2 - posX - 550) / damp; // zeno's paradox equation "catching delay"
                $gal.scrollLeft = posX * wDiff;

                posY += (mY2 - posY - 250) * 5 / damp; // zeno's paradox equation "catching delay"
                $gal.scrollTop = posY * hDiff;
            }
        }, 10);
    }

    mouseMove = (e) => {
        e.persist();
        let img = document.getElementById('img-contain');
        let body = document.getElementsByTagName('body')[0];
        mX = e.pageX - body.offsetLeft - img.offsetLeft;
        // console.log(mX);
        mX2 = Math.min(Math.max(0, mX - mPadd), mmAA) * mmAAr;
        mY = e.pageY - body.offsetTop - img.offsetTop;
        mY2 = Math.min(Math.max(0, mY - mPadd), mmAAH) * mmAArH;

        this.setState({activate: true});
    }

    render = () => {

        return (
            <div id="page-contain">
                <div id="img-contain">
                    <img id="img" className="lazy" src="../images/manlying4.jpg" width="2448" height="1730" onMouseMove={this.mouseMove}></img>
                    <img id="twins" className="imgs lazy" src="./images/teen2s2.png" width="2448" height="1730" onMouseMove={this.mouseMove}></img>
                    <img id="face2" className="imgs lazy" src="./images/man2.png" width="2448" height="1730" onMouseMove={this.mouseMove}></img>
                    <img id="sculpt" className="imgs lazy" src="./images/sculpt.jpg" width="2448" height="1730" onMouseMove={this.mouseMove}></img>
                </div>
            </div>
        )
    }
};
