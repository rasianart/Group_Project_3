var bloomingMenu = new BloomingMenu({
    startAngle: 0,
    endAngle: 315,
    radius: 100,
    itemsNum: 8,
    fatherElement: document.getElementById('bloom-contain'),
})
// Prevents "elastic scrolling" on Safari
document.addEventListener('touchmove', function(event) {
    'use strict'
    event.preventDefault()
})

$(document).on('click', 'button.blooming-menu__main', function() {
    console.log('hit');
    $('.blooming-menu__item-btn').toggleClass('semi-trans');
})
