const sliderTrack = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('dots');

let currentIndex = 0;
const totalSlides = slides.length;

// Конфігурація
const config = {
    autoplay: true,
    autoplayInterval: 3000,
    showArrows: true,
    showDots: true,
    transitionDuration: 500
};

let autoplayTimer;

function updateSlider() {
    sliderTrack.style.transitionDuration = config.transitionDuration + 'ms';
    sliderTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

function goToSlide(index) {
    currentIndex = (index + totalSlides) % totalSlides;
    updateSlider();
}

function createDots() {
    dotsContainer.innerHTML = '';
    if (!config.showDots) return;
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    updateDots();
}

function updateDots() {
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function startAutoplay() {
    if (!config.autoplay) return;
    autoplayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
    }, config.autoplayInterval);
}

function stopAutoplay() {
    clearInterval(autoplayTimer);
}

// Керування клавішами
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
});

// Події наведення миші
sliderTrack.addEventListener('mouseenter', stopAutoplay);
sliderTrack.addEventListener('mouseleave', startAutoplay);

// Події стрілок
if (config.showArrows) {
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
} else {
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
}

// Ініціалізація
createDots();
updateSlider();
startAutoplay();