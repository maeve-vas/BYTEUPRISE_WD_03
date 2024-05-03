let timer;
let running = false;
let startTime;
let lapTimes = [];

document.getElementById('start').addEventListener('click', function() {
    if (!running) {
        startTimer();
    }
});

document.getElementById('stop').addEventListener('click', function() {
    if (running) {
        stopTimer();
    }
});

document.getElementById('lap').addEventListener('click', function() {
    if (running) {
        recordLap();
    }
});

document.getElementById('reset').addEventListener('click', function() {
    resetTimer();
});

function startTimer() {
    if (!startTime) {
        startTime = Date.now();
    } else {
        const elapsedTime = Date.now() - startTime;
        startTime = Date.now() - elapsedTime;
    }
   
    timer = setInterval(updateDisplay, 10);
    running = true;
}

function stopTimer() {
    clearInterval(timer);
    running = false;
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    document.querySelector('.display').textContent = 
        `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
}

function recordLap() {
    const elapsedTime = Date.now() - startTime;
    const lapMinutes = Math.floor(elapsedTime / (1000 * 60));
    const lapSeconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const lapMilliseconds = Math.floor((elapsedTime % 1000) / 10);
    const lapTime = `${String(lapMinutes).padStart(2, '0')}:${String(lapSeconds).padStart(2, '0')}:${String(lapMilliseconds).padStart(2, '0')}`;
    lapTimes.push(lapTime);
    const lapList = document.getElementById('lapList');
    const li = document.createElement('li');
    li.textContent = `Lap ${lapTimes.length}: ${lapTime}`;
    li.classList.add('lapTime');
    lapList.appendChild(li);
}

function resetTimer() {
    clearInterval(timer);
    running = false;
    document.querySelector('.display').textContent = '00:00:00';
    lapTimes = [];
    document.getElementById('lapList').innerHTML = '';
}
