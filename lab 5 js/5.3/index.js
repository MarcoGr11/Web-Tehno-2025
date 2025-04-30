// Цифровий годинник
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// Таймер зворотного відліку
let countdownInterval;
function startCountdown() {
    clearInterval(countdownInterval);
    const target = new Date(document.getElementById("targetTime").value);
    countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = target - now;
        if (diff <= 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").textContent = "Час вичерпано!";
            return;
        }
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);
        document.getElementById("countdown").textContent = `${d}д ${h}г ${m}х ${s}с`;
    }, 1000);
}

// Календар
const calendar = document.getElementById("calendar");
calendar.addEventListener("change", () => {
    const date = new Date(calendar.value);
    const year = date.getFullYear();
    const month = date.toLocaleString("uk-UA", { month: "long" });
    document.getElementById("calendarOutput").textContent = `Обрано: ${month}, ${year}`;
});

// День народження
function calculateBirthday() {
    const birthday = new Date(document.getElementById("birthday").value);
    const now = new Date();
    const nextBDay = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());
    if (nextBDay < now) nextBDay.setFullYear(nextBDay.getFullYear() + 1);
    const diff = nextBDay - now;
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    document.getElementById("birthdayOutput").textContent = `До дня народження: ${months} міс, ${days} дн, ${hours} г, ${minutes} хв, ${seconds} сек`;
}
