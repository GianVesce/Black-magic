// INSPIRED FROM: https://youtu.be/kbKtFN71Lfs

let points = []; // List of the points of the shape
let currentPoint; // The current point chosen

// Parameters
const framesPerSec = 144;
let pointsPerFrame = 1;
let distanceScaling = 2;
let nPoints = 3;
let r = 390;
let angle = 0;


// Sliders
let nPointsSlider;
let distanceScalingSlider;
let pointsPerFrameSlider;
let rSlider;
let angleSlider;

function setup() {
	createCanvas(800, 800);

	let button = createButton('Reset');

	nPointsSlider = createSlider(3, 12, nPoints, 1);
	nPointsSlider.parent( createDiv('Numero di punti: '));
	nPointsSlider.input(updateNPoints);

	distanceScalingSlider = createSlider(1, 20, distanceScaling, 0.001);
	distanceScalingSlider.parent(createDiv('Distanza tra i punti: '));
	distanceScalingSlider.input(updateDistance);

	pointsPerFrameSlider = createSlider(1, 200, pointsPerFrame);
	pointsPerFrameSlider.parent(createDiv('Punti per frame: '));
	pointsPerFrameSlider.input(updatePointsPerFrame);

	rSlider = createSlider(50, 390, r, 1);
	rSlider.parent(createDiv('Raggio: '));
	rSlider.input(updateRadius);

	angleSlider = createSlider(angle, 360);
	angleSlider.parent(createDiv('Angolo: '));
	angleSlider.input(updateAngle);

	button.mousePressed(reset);
	reset();

	currentPoint = createVector(random(width), random(height));

	point(currentPoint.x, currentPoint.y);
	frameRate(framesPerSec);
}

function draw() {
	for(i = 0; i < pointsPerFrame; i++) {
		// Choose a random point from the list
		let chosenPoint = points[Math.floor(random(nPoints))];

		// Calculate the middle point based on the scaling
		let unitVector = p5.Vector.sub(currentPoint, chosenPoint);
		let dist = chosenPoint.dist(currentPoint);
		unitVector.setMag(dist / distanceScaling);
		currentPoint = createVector(chosenPoint.x + unitVector.x, chosenPoint.y + unitVector.y);

		point(currentPoint.x, currentPoint.y)
	}
}

function reset() {
	initPoints(nPoints)
	background(0);

	stroke(255);
	strokeWeight(10);
	
	points.forEach(p => {
		point(p.x, p.y)
	});

	strokeWeight(1);
}

function initPoints(nPoints) {
	points = [];
	for (let a = 0; a < TWO_PI; a += TWO_PI / nPoints) {
		let x = r * cos(a + angle) + width/2;
		let y = r * sin(a + angle) + height/2;
		points.push(createVector(x, y));
	}

	// points.push(createVector(width/2, height/6));
	// points.push(createVector(width * 5 / 6, height * 5 / 6));
	// points.push(createVector(width / 6, height * 5 / 6));
}

function updateNPoints() {
	nPoints = nPointsSlider.value();
	reset();
}

function updateDistance() {
	distanceScaling = distanceScalingSlider.value();
	reset();
}

function updatePointsPerFrame() {
	pointsPerFrame = pointsPerFrameSlider.value();
}

function updateRadius() {
	r = rSlider.value();
	reset();
}

function updateAngle() {
	angle = angleSlider.value() * PI / 180;
	console.log(angle);
	reset();
}