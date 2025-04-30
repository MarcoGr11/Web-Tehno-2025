const lamp = document.getElementById('lamp');
const lampType = document.getElementById('lampType');
const toggleBtn = document.getElementById('toggleBtn');
const brightnessBtn = document.getElementById('brightnessBtn');

let isOn = false;
let timeout;

function updateLampClass() {
    lamp.className = `lamp ${lampType.value} ${isOn ? 'on' : 'off'}`;
}

function toggleLamp() {
    isOn = !isOn;
    updateLampClass();
    resetTimeout();
}

function setBrightness() {
    const level = prompt("Введіть рівень яскравості (від 1 до 100):", "100");
    if (level !== null) {
        let value = parseInt(level);
        if (!isNaN(value) && value >= 1 && value <= 100) {
            lamp.style.filter = `brightness(${value}%)`;
        } else {
            alert("Некоректне значення. Введіть число від 1 до 100.");
        }
    }
    resetTimeout();
}

function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        isOn = false;
        updateLampClass();
    }, 5 * 60 * 1000); // 5 хвилин
}

lampType.addEventListener('change', updateLampClass);
toggleBtn.addEventListener('click', toggleLamp);
brightnessBtn.addEventListener('click', setBrightness);

updateLampClass();
