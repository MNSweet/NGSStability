
if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/NGSStability/sw.js')
	.then(registration => {
		console.log('Service Worker registered:', registration);
	})
	.catch(error => {
		console.error('Service Worker registration failed:', error);
	});
}

function updateScale() {
	let vh = window.innerHeight;
	let targetHeight = vh / 7; // Target height for each div
	let scaleHFactor = targetHeight / 228; // Scale factor based on current height

	let vw = window.innerWidth;
	let scaleWFactor = vw / (vw > 900 ? 2800 : 1500); // Scale factor based on current width

	let scaleFactor = Math.min(scaleHFactor,scaleWFactor);

	// Update CSS variable for transform scaling
	document.documentElement.style.setProperty('--vh-scale', `${scaleFactor}`);
}

updateScale();
window.addEventListener('resize', updateScale);