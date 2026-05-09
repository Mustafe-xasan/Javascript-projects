const images = [
    "./assets/car1.jpg",
    "./assets/car2.jpg",
    "./assets/car3.jpg"
];

let currentIndex = 0;

const slide = document.getElementById('slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

nextBtn.addEventListener('click', function () {
    currentIndex++;

    if (currentIndex >= images.length) {
        currentIndex = 0; 
    }

    slide.src = images[currentIndex];
});

prevBtn.onclick = function () {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    slide.src = images[currentIndex];
};

console.log("Slider loaded with " + images.length + " images!");
