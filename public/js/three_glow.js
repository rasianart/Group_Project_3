var container, scene, camera, renderer, controls, stats;
var clock = new THREE.Clock();
var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
var cube;
var initTrue = false;
var materialQueue = [];
var sphereQueue = [];
var particleGroup, particleAttributes;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
let hoverObj;
var width = screen.width;
var height = screen.height;
let posX;
let poxY;

$(document).one('mousemove', function(e) {

    posX = e.pageX;
    poxY = e.pageY;
    init();
    animate();

    // setTimeout(function() {
    //     setInterval(function() {
    //         opac = opac - .001;
    //         // materialQueue[0].material.opacity = opac;
    //         sphereQueue[0].material.opacity = opac;
    //     }, 1);
    // }, 1500);
    // setTimeout(function() {
    //     setInterval(function() {
    //         let opac = 1;
    //         setInterval(function() {
    //             opac = opac - .001;
    //             // materialQueue[0].material.opacity = opac;
    //             if (sphereQueue[0]) {
    //                 sphereQueue[0].material.opacity = opac;
    //             }
    //         }, 1);
    //         // materialQueue.shift();
    //         sphereQueue.shift();
    //     }, 1000);
    // }, 2000);

    // setTimeout(function() {
    //     setInterval(function() {
    //         let opac = 1;
    //         setInterval(function() {
    //             opac = opac - .1;
    //             if (materialQueue[0]) {
    //                 materialQueue[0].material.opacity = opac;
    //             }
    //             // sphereQueue[0].material.opacity = opac;
    //         }, 1);
    //         materialQueue.shift();
    //         // sphereQueue.shift();
    //     }, 10);
    // }, 100);
});

// FUNCTIONS
function init()
{
	// SCENE
	scene = new THREE.Scene();
	// CAMERA
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 20000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(0,150,400);
	camera.lookAt(scene.position);

	// RENDERER
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true, alpha: true} );
	else
		renderer = new THREE.CanvasRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.setClearColor( 0xffffff, 0);
	container = document.getElementById( 'ThreeJS' );
	container.appendChild( renderer.domElement );

	// // STATS
	// stats = new Stats();
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.bottom = '0px';
	// stats.domElement.style.zIndex = 100;
	// container.appendChild( stats.domElement );

	// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);

	////////////
	// CUSTOM //
	////////////

	var particleTexture = THREE.ImageUtils.loadTexture( './images/spark.png' );
	particleGroup = new THREE.Object3D();
	particleAttributes = { startSize: [], startPosition: [], randomness: [] };

    let arrPath = [897,710,897,708,897,706,897,704,897,700,896,697,896,694,895,691,895,688,894,685,894,683,894,682,894,680,894,679,894,679,894,678,894,677,891,631,891,628,891,621,891,608,891,603,891,599,891,
        596,892,593,892,589,893,587,893,585,894,582,894,581,894,580,894,579,894,579,894,578,894,577,894,576,894,576,894,575,894,574,894,572,894,571,894,569,894,567,894,565,894,563,894,561,894,560,894,558,
        894,557,894,556,894,554,894,553,894,552,895,551,895,549,896,547,896,545,898,543,898,541,900,537,900,536,901,533,902,531,903,529,904,527,904,525,905,523,906,521,908,518,909,516,909,514,911,511,912,
        508,913,506,914,504,915,502,915,500,916,498,916,496,917,495,917,494,918,492,918,491,918,490,919,488,920,486,920,484,920,483,920,481,920,479,920,475,920,472,920,468,920,463,920,456,920,449,920,446,
        920,441,920,436,920,433,920,430,920,428,920,427,920,426,920,425,920,425,920,424,920,424,920,424,920,423,920,423,920,423,920,422,920,422,920,422,920,421,920,421,920,420,919,419,918,417,918,416,917,
        414,917,412,916,410,915,409,915,408,914,407,914,405,914,405,914,404,914,403,913,403,913,403,913,402,913,402,913,401,913,401,913,401,914,401,914,401,915,401,916,401,919,400,921,400,923,399,928,399,
        931,398,935,397,937,397,943,396,945,396,948,395,950,395,953,395,954,395,955,394,956,394,957,394,957,394,958,394,958,394,958,394,959,394,959,394,959,394,959,394,959,393,960,393,960,393,960,393,960,
        393,960,392,960,392,961,392,961,391,961,391,961,391,962,390,962,390,963,390,963,389,965,389,966,388,967,388,968,387,969,387,971,387,972,386,973,385,974,385,975,385,976,384,976,384,977,384,977,383,
        978,383,978,383,979,383,979,382,980,382,980,382,980,382,981,381,981,381,981,381,981,381,981,380,981,380,981,380,981,379,981,379,981,378,981,377,981,375,980,373,979,372,978,370,977,367,976,366,975,
        364,974,362,974,361,973,361,972,360,972,359,972,358,971,358,971,358,971,357,971,357,970,356,970,356,970,356,970,355,970,355,970,355,970,354,970,354,970,354,970,353,970,353,970,353,970,352,971,352,
        971,352,971,352,971,352,972,351,972,351,972,351,973,350,973,350,973,350,974,350,974,349,974,349,975,349,975,349,976,348,976,348,978,347,979,346,980,345,981,345,982,343,983,343,984,342,985,342,985,
        341,986,341,986,341,987,341,988,341,988,341,989,341,990,341,991,341,993,341,996,341,998,341,999,341,1002,342,1004,344,1006,345,1008,346,1012,348,1012,350,1014,351,1015,352,1016,353,1018,354,1018,354,1019,355,
        1020,355,1020,356,1021,356,1021,357,1022,357,1023,358,1023,359]

    var filteredX = arrPath.filter(function(element, index, array) {
      return (index % 2 === 0);
    });
    var filteredY = arrPath.filter(function(element, index, array) {
      return (index % 2 === 1);
    });

	var totalParticles = 100;
    var orbParticles = 5;
	var radiusRange = 50;

    // for( var i = 0; i < orbParticles; i++ )
	// {
    //     let spriteMaterial = new THREE.SpriteMaterial( { map: particleTexture, color: 0xffffff, transparent: true} );
    //     let sprite = new THREE.Sprite( spriteMaterial );
    //     let randBig = (Math.floor(Math.random() * 55) + 35);
    //     let randVol = (Math.floor(Math.random() * 25) + 1);
    //     // if (randBig === 6) {randVol = randVol + 30}
    //     sprite.scale.set( randBig, randBig, 1.0 ); // imageWidth, imageHeight
    //
    //     // sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, 0);
    //     console.log((filteredX[i] - 797), (filteredY[i] - 680), 0);
    //     sprite.position.set((filteredX[i] - 797), (filteredY[i] - 680), 0);
    //     sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles
    //     sphereQueue.push(sprite);
    //     particleGroup.add( sprite );
    //
    //   // add variable qualities to arrays, if they need to be accessed later
    //   particleAttributes.startPosition.push( sprite.position.clone() );
    //   particleAttributes.randomness.push( Math.random() );
    // }
	for( var i = 0; i < totalParticles; i++ )
	{
	    var spriteMaterial = new THREE.SpriteMaterial( { map: particleTexture, color: 0xffffff, transparent: true} );
		var sprite = new THREE.Sprite( spriteMaterial );
        let randBig = (Math.floor(Math.random() * 6) + 1);
        let randVol = (Math.floor(Math.random() * 35) + 15);
        if (randBig === 6) {randVol = randVol + 30}
		sprite.scale.set( 100, 100, 1.0 ); // imageWidth, imageHeight
		sprite.position.set( Math.random() - 0.5, Math.random() - 0.5, 0);
        sprite.position.set((filteredX[i] - 897), (filteredY[i] - 610), 0);
		sprite.material.blending = THREE.AdditiveBlending; // "glowing" particles
        materialQueue.push(sprite);
		particleGroup.add( sprite );

        // sprite.material.color.set(rgb(255,225,77));
		// add variable qualities to arrays, if they need to be accessed later
		particleAttributes.startPosition.push( sprite.position.clone() );
		particleAttributes.randomness.push( Math.random() );
	}
	particleGroup.position.y = 50;
    setTimeout(function() {
    	scene.add( particleGroup );
    }, 1000);

    // initialize object to perform world/screen calculations
	projector = new THREE.Projector();

	// when the mouse moves, call the given function
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}
//end init
function onDocumentMouseMove( event )
{
    setTimeout(function() {
        initTrue = true;
    },1000);

	// update the mouse variable
	mouse.x = ( event.clientX / 2448 ) * 2 - 1 - .3;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1.75;
    // console.log(mouse.x, mouse.y);
}

function animate()
{
    requestAnimationFrame( animate );
	render();
	update();
}

function update()
{
	var time = 4 * clock.getElapsedTime();

	for ( var c = 0; c < particleGroup.children.length; c ++ )
	{
		var sprite = particleGroup.children[ c ];
		// particle wiggle
		var wiggleScale = 2;
		sprite.position.x += wiggleScale * (Math.random() - 0.5);
		sprite.position.y += wiggleScale * (Math.random() - 0.5);
		sprite.position.z += wiggleScale * (Math.random() - 0.5);

        // if (!initTrue) {
            sprite.material.opacity = 0;
        // }
        // else {
        //     sprite.material.opacity = 1;
        // }

		var a = particleAttributes.randomness[c] + 1;
		var pulseFactor = Math.sin(a * time) * 0.1 + 0.9;
		sprite.position.x = particleAttributes.startPosition[c].x * pulseFactor;
		sprite.position.y = particleAttributes.startPosition[c].y * pulseFactor;
		sprite.position.z = particleAttributes.startPosition[c].z * pulseFactor;

        materialQueue.push(sprite);
	}

    raycaster.setFromCamera( mouse, camera );
	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children, true);

	for ( var i = 0; i < intersects.length; i++ ) {
		intersects[ i ].object.material.opacity = 1;
	}
    //  else {
    //     intersects[ i ].object.material.opacity = 1;
    // }

	// stats.update();
}

function render()
{
	    renderer.render( scene, camera );
}
