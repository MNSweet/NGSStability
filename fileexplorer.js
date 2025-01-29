// Initialize the app
document.getElementById('close-notification').addEventListener('click', () => {
	document.getElementById('notification').classList.add('hidden');
	document.getElementById('file-renamer').classList.remove('hidden');
});

// Handle folder selection
document.getElementById('select-folder').addEventListener('click', async () => {
	// Placeholder for folder selection logic
	const folderHandle = await window.showDirectoryPicker();
	if (folderHandle) {
		document.getElementById('selected-folder').textContent = folderHandle.name;
		loadFiles(folderHandle);
	}
});

// Load and display files in the selected folder
async function loadFiles(folderHandle) {
	const fileListSection = document.getElementById('file-list-section');
	const fileList = document.getElementById('file-list');
	fileList.innerHTML = '';
	for await (const entry of folderHandle.values()) {
		if (entry.kind === 'file' && entry.name.endsWith('.pdf')) {
			const li = document.createElement('li');
			li.innerHTML = `<label><input type="checkbox" class="file-checkbox" checked> ${entry.name}</label>`;
			fileList.appendChild(li);
		}
	}
	fileListSection.classList.remove('hidden');
	if (fileList.children.length > 0) {
		fileListSection.classList.remove('hidden');
		document.getElementById('rename-options').classList.remove('hidden');
	} else {
		alert('No PDF files found in the selected folder.');
	}
}

// Handle preset selection and regex input
document.getElementById('preset-select').addEventListener('change', (e) => {
	const customRegexSection = document.getElementById('custom-regex');
	customRegexSection.classList.toggle('hidden', e.target.value !== 'custom');
});

// Handle preview generation
function updatePreview(fileName, regex, replacement) {
	const previewBefore = document.getElementById('preview-before');
	const previewAfter = document.getElementById('preview-after');
	const match = fileName.match(new RegExp(regex));
	if (match) {
		previewBefore.innerHTML = highlightMatches(fileName, match);
		previewAfter.innerHTML = fileName.replace(new RegExp(regex), replacement);
	}
}

// Highlight matches in the preview
function highlightMatches(text, matches) {
	let highlighted = text;
	matches.forEach((match, index) => {
		if (index > 0) {
			highlighted = highlighted.replace(match, `<span style="background-color: yellow;">${match}</span>`);
		}
	});
	return highlighted;
}

// Handle undo functionality
document.getElementById('undo-rename').addEventListener('click', () => {
	if (confirm('Are you sure you want to undo the last rename?')) {
		// Placeholder for undo logic
		alert('Undo operation completed.');
	}
});

//--

document.querySelectorAll('[name="rename-type"]').forEach((radio) => {
	radio.addEventListener('change', () => {
		const activeIndicator = document.getElementById('active-indicator');
		const selected = document.querySelector('[name="rename-type"]:checked + label');
		if (selected) {
			activeIndicator.style.width = `${selected.offsetWidth}px`;
			activeIndicator.style.transform = `translateX(${selected.offsetLeft}px)`;
		}
	});
});

// Handle preset selection for Preset 1
document.getElementById('preset-select').addEventListener('change', (e) => {
	const selectedPreset = e.target.value;
	const fileList = document.querySelectorAll('#file-list li');
	const previewFile = fileList.length > 0 ? fileList[0].textContent.trim() : '';

	if (selectedPreset === 'preset1' && previewFile) {
		const regex = /^([\w_]+)-\d{2}_\d{2}_\d{4}-([\d]+)\.pdf$/;
		const replacement = `RES ${document.querySelector('[name="rename-type"]:checked').value} ${new Date().toISOString().split('T')[0]} $1.pdf`;
		updatePreview(previewFile, regex, replacement);
	}
});

// Update the active indicator on page load
window.addEventListener('load', () => {
	const selected = document.querySelector('[name="rename-type"]:checked + label');
	const activeIndicator = document.getElementById('active-indicator');
	if (selected) {
		activeIndicator.style.width = `${selected.offsetWidth}px`;
		activeIndicator.style.transform = `translateX(${selected.offsetLeft}px)`;
	}
});


