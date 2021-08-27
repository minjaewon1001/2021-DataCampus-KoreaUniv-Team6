'use strict';

var activePBRButton;
var screenshotKey = false;
var playbackSpeedButtons = false;
var screenshotFunctionality = 0;

function CaptureScreenshot() {
	var appendixTitle = "screenshot.png";
	var title;
	var headerEls = document.querySelectorAll("h1.title");
	function SetTitle() {
		if (headerEls.length > 0) {
			title = headerEls[0].innerText.trim();
			return true;
		} else {
			return false;
		}
	}
	if (SetTitle() == false) {
		headerEls = document.querySelectorAll("h1.watch-title-container");

		if (SetTitle() == false)
			title = '';
	}
	var player = document.getElementsByClassName("video-stream")[0];
	var time = player.currentTime;
	title += " ";
	let minutes = Math.floor(time / 60)
	time = Math.floor(time - (minutes * 60));
	if (minutes > 60) {
		let hours = Math.floor(minutes / 60)
		minutes -= hours * 60;
		title += hours + "-";
	}
	title += minutes + "-" + time;
	title += " " + appendixTitle;

	var canvas = document.createElement("canvas");
	canvas.width = player.videoWidth;
	canvas.height = player.videoHeight;
	canvas.getContext('2d').drawImage(player, 0, 0, canvas.width, canvas.height);
	
	var downloadLink = document.createElement("a");
	downloadLink.download = title;
	var canvas = document.createElement('canvas');
	var video = document.querySelector('video');
	var ctx = canvas.getContext('2d');

	// Change the size here
	canvas.width = parseInt(video.offsetWidth);
	canvas.height = parseInt(video.offsetHeight);
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

	// Won't work on file:/// URLs. SecurityError: Tainted canvases may not be exported.
	var base64ImageData = canvas.toDataURL('image/jpeg');
	var filename = 'snap-' + canvas.width + 'x' + canvas.height + '-' + video.currentTime + '.jpg';

	// Wrap <img> in link to download image because 
	// the context menu Save Image as... is blocked for security reasons
	var a = document.createElement('a');
	a.download = filename;
	a.href = base64ImageData;

	canvas.toBlob(async function (blob) {
		if (screenshotFunctionality === 0 || screenshotFunctionality === 2) {
			// download
			downloadLink.href = URL.createObjectURL(blob);
			downloadLink.click();
		}

		if (screenshotFunctionality === 1 || screenshotFunctionality === 2) {
			// clipboard
			const clipboardItemInput = new ClipboardItem({ "image/png": blob });
			await navigator.clipboard.write([clipboardItemInput]);
		}
	}, 'image/png');
	
	var img = document.createElement('img');
	img.src = base64ImageData;
	img.alt = filename;
	img.title = 'Click to save ' + filename;
	// --------------------------------------
	(function NewWindow(window, document) {
		
		//var options = 'top=100, left=300, width=500, height=600, toolbar=no, menubar=no, location=no, status=no, scrollbars=no, resizable=no';
		//window.open('http://54.180.35.136:23023/form', 'target').document.body.appendChild(a).appendChild(img);
		window.open('http://54.180.35.136:8000/form', 'target').document.body.appendChild(img);
	})(window, document);
	var win = NewWindow(win, document)
}


function AddScreenshotButton() {
	var ytpRightControls = document.getElementsByClassName("ytp-right-controls")[0];
	if (ytpRightControls) {
		ytpRightControls.prepend(screenshotButton);
	}

	chrome.storage.sync.get('playbackSpeedButtons', function(result) {
		if (result.playbackSpeedButtons) {
			ytpRightControls.prepend(speed3xButton);
			ytpRightControls.prepend(speed25xButton);
			ytpRightControls.prepend(speed2xButton);
			ytpRightControls.prepend(speed15xButton);
			ytpRightControls.prepend(speed1xButton);

			var playbackRate = document.getElementsByTagName('video')[0].playbackRate;
			switch (playbackRate) {
				case 1:
					speed1xButton.classList.add('SYTactive');
					activePBRButton = speed1xButton;
					break;
				case 2:
					speed2xButton.classList.add('SYTactive');
					activePBRButton = speed2xButton;
					break;
				case 2.5:
					speed25xButton.classList.add('SYTactive');
					activePBRButton = speed25xButton;
					break;
				case 3:
					speed3xButton.classList.add('SYTactive');
					activePBRButton = speed3xButton;
					break;
			}
		}
	});
}

var screenshotButton = document.createElement("button");
screenshotButton.className = "screenshotButton ytp-button";
screenshotButton.style.width = "auto";
screenshotButton.innerHTML = "Who is he/she?";
screenshotButton.style.cssFloat = "left";
screenshotButton.onclick = CaptureScreenshot;

var speed1xButton = document.createElement("button");
speed1xButton.className = "ytp-button SYText";
speed1xButton.innerHTML = "1×";
speed1xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 1;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed15xButton = document.createElement("button");
speed15xButton.className = "ytp-button SYText";
speed15xButton.innerHTML = "1.5×";
speed15xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 1.5;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed2xButton = document.createElement("button");
speed2xButton.className = "ytp-button SYText";
speed2xButton.innerHTML = "2×";
speed2xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 2;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed25xButton = document.createElement("button");
speed25xButton.className = "ytp-button SYText";
speed25xButton.innerHTML = "2.5×";
speed25xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 2.5;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

var speed3xButton = document.createElement("button");
speed3xButton.className = "ytp-button SYText";
speed3xButton.innerHTML = "3×";
speed3xButton.onclick = function() {
	document.getElementsByTagName('video')[0].playbackRate = 3;
	activePBRButton.classList.remove('SYTactive');
	this.classList.add('SYTactive');
	activePBRButton = this;
};

activePBRButton = speed1xButton;

chrome.storage.sync.get(['screenshotKey', 'playbackSpeedButtons', 'screenshotFunctionality'], function(result) {
	screenshotKey = result.screenshotKey;
	playbackSpeedButtons = result.playbackSpeedButtons;
	if (result.screenshotFunctionality === undefined)
		screenshotFunctionality = 0;
	else
    	screenshotFunctionality = result.screenshotFunctionality;
});

document.addEventListener('keydown', function(e) {
	if (document.activeElement.contentEditable === 'true' || document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA' || document.activeElement.contentEditable === 'plaintext')
		return true;

	if (playbackSpeedButtons) {
		switch (e.key) {
			case 'q':
				speed1xButton.click();
				e.preventDefault();
				return false;
			case 's':
				speed15xButton.click();
				e.preventDefault();
				return false;
			case 'w':
				speed2xButton.click();
				e.preventDefault();
				return false;
			case 'e':
				speed25xButton.click();
				e.preventDefault();
				return false;
			case 'r':
				speed3xButton.click();
				e.preventDefault();
				return false;
		}
	}

	if (screenshotKey && e.key === 'p') {
		CaptureScreenshot();
		e.preventDefault();
		return false;
	}
});

AddScreenshotButton();