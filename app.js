var CANVAS_HEIGHT = 700;
var CANVAS_WIDTH = 1300;
var MIN_FONT_SIZE = 16;


function loadData() {
	$.get("rolling_count.json", processData);

	function processData(data) {
		var delay = 500;
		// Sorting data by dates (property)
		var dates = Object.keys(data);
		for (var i=0; i<dates.length; i++) {
			date = dates[i];
			setTimeout(updateData, delay, data[date], date);
			delay += 500;
		}
	}
}

loadData();

var currentData = {};


function updateData(todayData, date) {
	for(var i in currentData) {
		if(todayData[i] === undefined) {
			delete currentData[i];
		}
	}

	function getRandom(a,b) {
		return Math.random() * (b - a) + a;
	}

	for(var i in todayData) {
		if(currentData[i] === undefined) {
			currentData[i] = {
				x: getRandom(0, CANVAS_WIDTH - 200),
				y: getRandom(100, CANVAS_HEIGHT - 100),
				views: todayData[i]
			}
		} else {
			currentData[i].views = todayData[i];

		}
	}

	render(date);
}

function render(date) {
	var canvas = document.getElementById("myCanvas");
	canvas.height = CANVAS_HEIGHT;
	canvas.width = CANVAS_WIDTH;
	var context = canvas.getContext("2d");
	var calendar = document.getElementById("calendar");

	context.clearRect(0, 0, canvas.width, canvas.height);

	function formatDate(date) {
		var d = new Date(date.substring(0,4)+'-'+date.substring(4,6)+'-'+date.substring(6,8));
		return d.toDateString();
	}

	function getFontSize(views) {
		return Math.round(MIN_FONT_SIZE + views/100000);
	}

	function drawText(text, fontSize, x, y) {
		context.font = "normal lighter " + fontSize + "px sans-serif";
		context.fillText(text, x, y);
	}

	calendar.innerText = formatDate(date);
	for (var i in currentData) {
		drawText(i, getFontSize(currentData[i].views), currentData[i].x, currentData[i].y);
	}
} 

