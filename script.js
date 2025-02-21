document.addEventListener('DOMContentLoaded', () => {
    const background = document.getElementById('background');
    const slides = document.querySelectorAll('.slide');
    const imagePaths = [
        'img/1.png',  // Home
        'img/2.png',  // Products
        'img/3.png',  // Downloads
        'img/4.png'   // Contact
    ];

    // Preload all background images
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
    });

    // Set initial background image immediately
    let currentImage = imagePaths[0];
    background.style.backgroundImage = `url('${currentImage}')`;
    background.style.opacity = 1;

    // Intersection Observer to change background based on the most visible slide
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] // Multiple thresholds for accuracy
    };

    const observerCallback = (entries) => {
        let maxRatio = 0;
        let targetSlide = null;
        entries.forEach(entry => {
            if (entry.intersectionRatio > maxRatio) {
                maxRatio = entry.intersectionRatio;
                targetSlide = entry.target;
            }
        });
        if (targetSlide) {
            const slideIndex = Array.from(slides).indexOf(targetSlide);
            const newImage = imagePaths[slideIndex];
            if (newImage !== currentImage) {
                currentImage = newImage;
                background.style.backgroundImage = `url('${newImage}')`;
                background.style.opacity = 1;
            }
        }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    slides.forEach(slide => observer.observe(slide));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSlide = document.getElementById(targetId);
            targetSlide.scrollIntoView({ behavior: 'smooth' });
        });
    });
});