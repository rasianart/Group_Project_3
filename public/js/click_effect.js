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

$(document).on('click', function(e) {

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
