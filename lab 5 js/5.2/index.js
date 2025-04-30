const lights = {
    red: document.getElementById("red"),
    yellow: document.getElementById("yellow"),
    green: document.getElementById("green"),
};

const statusText = document.getElementById("status");

let durations = {
    red: 5000,
    yellow: 3000,
    green: 7000,
};

let current = "red";
let interval;
let blinking = false;

function setActive(color) {
    for (const key in lights) {
        lights[key].classList.remove("active");
    }
    if (lights[color]) lights[color].classList.add("active");
    statusText.textContent = `Стан: ${color}`;
}

function nextState() {
    clearInterval(interval);
    switch (current) {
        case "red":
            current = "yellow";
            runState(current, durations.yellow);
            break;
        case "yellow":
            current = "green";
            runState(current, durations.green);
            break;
        case "green":
            blinkYellow(3);
            break;
        case "blinking":
            current = "red";
            runState(current, durations.red);
            break;
    }
}

function runState(state, time) {
    setActive(state);
    interval = setTimeout(nextState, time);
}

function blinkYellow(times) {
    blinking = true;
    current = "blinking";
    let count = 0;
    let on = false;
    const blink = setInterval(() => {
        on = !on;
        lights.yellow.classList.toggle("active", on);
        if (on) count++;
        if (count >= times) {
            clearInterval(blink);
            nextState();
        }
    }, 500);
}

function setDurations() {
    const red = parseInt(prompt("Тривалість червоного (мс):", durations.red));
    const yellow = parseInt(prompt("Тривалість жовтого (мс):", durations.yellow));
    const green = parseInt(prompt("Тривалість зеленого (мс):", durations.green));
    if (!isNaN(red)) durations.red = red;
    if (!isNaN(yellow)) durations.yellow = yellow;
    if (!isNaN(green)) durations.green = green;
}

// Почати
runState(current, durations.red);