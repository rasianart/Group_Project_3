import React from '../../node_modules/react'

let pxRatioH;
let pxRatioW;
let marker;
let marker1;


export default class Circles extends React.Component{

    componentDidMount = () => {
        pxRatioH = 1;
        pxRatioW = (window.outerWidth / 2448) * 1.9;
        marker = document.getElementById('marker1');
        marker1 = [parseInt(parseInt(marker.marginLeft * pxRatioW), parseInt(parseInt(marker.marginTop * pxRatioH)];
    }

    render = () => {

        return (
            <div>
                <div id="marker1"></div>
            </div>
        );
    }
}
