window.onload = function() {

	var startButton = document.getElementById('start');
	startButton.addEventListener('click', startHandler, false);

	var timeDisplay = document.getElementById('time');

	var times = 0, clockTimeId;

	function startHandler() {
		clockTimeId = setTimeout(function start() {
			times++;
			timeDisplay.innerHTML = getClockText(Math.floor(times / 60), times % 60);
			clockTimeId = setTimeout(start, 1000);
		}, 1000);
	}

	var resetButton = document.getElementById('reset');
	resetButton.addEventListener('click', function() {
		clearTimeout(clockTimeId);
		timeDisplay.innerHTML = getClockText(0,0);
		times = 0;
		startRandom();
	}, false);

	function getClockText(minutes, seconds) {

		var minutes = minutes >= 10 ? minutes : '0' + minutes,
			seconds = seconds >= 10 ? seconds : '0' + seconds;

		return minutes + ':' + seconds;
	}

	var direct = [
		[0],
		[2, 4],
		[1, 3, 5],
		[2, 6],
		[1, 5, 7],
		[2, 4, 6, 8],
		[3, 5, 9],
		[4, 8],
		[7, 9, 5],
		[8, 6]
	];

	var posXY = [
		[0],
		[0, 0],
		[160, 0],
		[320, 0],
		[0, 160],
		[160, 160],
		[320, 160],
		[0, 320],
		[160, 320],
		[320, 320]
	];

	var nowPos = [];
	startRandom();

	var gameElement = document.getElementById('gameContainer');
	gameElement.addEventListener('click', function(event) {
		var target_id = parseInt(event.target.id.toString().replace('d', ''));

		if (target_id !== 9) {
			canMove(target_id);
		}
	}, false);


	function canMove(id) {
		var xIndex = nowPos.indexOf(9);
		var yIndex = nowPos.indexOf(id);

		if (!!~direct[yIndex].indexOf(xIndex)) {
			move(xIndex, yIndex, 9, id);
			if(check()) {
				timeDisplay.innerHTML = '你在用时 ' + getClockText(times / 60, times % 60) + ' 后获胜。';
			}
		}
	}

	function move(xIndex, yIndex, xValue, yValue) {
		nowPos[xIndex] = yValue;
		nowPos[yIndex] = xValue;

		document.getElementById('d' + xValue).style.left = posXY[yIndex][0] + 'px';
		document.getElementById('d' + xValue).style.top = posXY[yIndex][1] + 'px';

		document.getElementById('d' + yValue).style.left = posXY[xIndex][0] + 'px';
		document.getElementById('d' + yValue).style.top = posXY[xIndex][1] + 'px';
	}

	function check() {
		var result = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		var flag = true;

		result.forEach(function(value, index) {
			if (value !== nowPos[index]) {
				flag = false;
			}
		});

		return flag;
	}

	function startRandom() {

		nowPos = [];
		for(var i = 0; i < 9; i++) {
			nowPos.push(i + 1);
		}
		nowPos.sort(function() {
			return Math.random() - 0.5;
		});

		nowPos.unshift(0);

		for(var i = 1; i <= 9; i++) {
			document.getElementById('d' + nowPos[i]).style.left = posXY[i][0] + 'px';
			document.getElementById('d' + nowPos[i]).style.top = posXY[i][1] + 'px';
		} 
	}
};