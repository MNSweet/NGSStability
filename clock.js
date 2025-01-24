// Helper function to format date as MM DD YYYY
function formatDate(date) {
	const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
	const [month, day, year] = new Intl.DateTimeFormat('en-US', options)
		.format(date)
		.split('/');
	return `${month} ${day} ${year}`;
}

// Set date values
const today = new Date();
const sixtyDaysAgo = new Date(today);
sixtyDaysAgo.setDate(today.getDate() - 60);

const ninetyDaysAgo = new Date(today);
ninetyDaysAgo.setDate(today.getDate() - 90);

// Update display rows
function renderDateParts(rowId, dateStr) {
	const row = document.getElementById(rowId);

	row.querySelector('.date').textContent = dateStr;
}

renderDateParts('today', formatDate(today));
renderDateParts('sixty', formatDate(sixtyDaysAgo));
renderDateParts('ninety', formatDate(ninetyDaysAgo));

let reset = setInterval(function() {

	const suffixes = [...Array.from({ length: 10 }, (_, i) => i.toString())];
	const classRegex = new RegExp(`^display-no-(${suffixes.join('|')})$`);

	document.querySelectorAll('[class*="display-no-"]').forEach(element => {
		element.classList.forEach(cls => {
			if (classRegex.test(cls)) {
				element.classList.remove(cls);
			}
		});
	});

	renderDateParts('today', formatDate(today));
	renderDateParts('sixty', formatDate(sixtyDaysAgo));
	renderDateParts('ninety', formatDate(ninetyDaysAgo));
}, 1000 * 60 * 60 * 4);

document.querySelector('#colorToggle').addEventListener("click", (e) => {
	if (e.target.checked) {
		document.body.classList.add('color');
		localStorage.setItem('colorMode', 'true');
	} else {
		document.body.classList.remove('color');
		localStorage.setItem('colorMode', 'false');
	}
});
window.addEventListener('DOMContentLoaded', () => {
	const savedColorMode = localStorage.getItem('colorMode') === 'true';
	const checkbox = document.querySelector('#colorToggle');
	
	// Apply saved state
	checkbox.checked = savedColorMode;
	if (savedColorMode) {
		document.body.classList.add('color');
	}
});

document.querySelector('#segmentDisplay').addEventListener("click", (e) => {
	if (e.target.checked) {
		document.body.classList.add('segmentDisplayMode');
		localStorage.setItem('viewmode', 'true');
	} else {
		document.body.classList.remove('segmentDisplayMode');
		localStorage.setItem('viewmode', 'false');
	}
});
window.addEventListener('DOMContentLoaded', () => {
	const savedColorMode = localStorage.getItem('viewmode') === 'true';
	const checkbox = document.querySelector('#segmentDisplay');
	
	// Apply saved state
	checkbox.checked = savedColorMode;
	if (savedColorMode) {
		document.body.classList.add('segmentDisplayMode');
	}
});