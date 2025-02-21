document.addEventListener('DOMContentLoaded', () => {
    const background = document.getElementById('background');
    const slides = document.querySelectorAll('.slide');
    const imagePaths = [
        'img/1.png',  // Home
        'img/2.png',  // Products
        'img/3.png',  // Downloads
        'img/4.png'   // Contact
    ]; // Adjust paths to your image locations

    // Preload all background images
    imagePaths.forEach(path => {
        const img = new Image();
        img.src = path;
    });

    // Set initial background image immediately
    background.style.backgroundImage = `url('${imagePaths[0]}')`;
    background.style.opacity = 1;

    // Intersection Observer to change background
    const observerOptions = {
        root: null,           // Use viewport as root
        rootMargin: '0px',    // No margin
        threshold: 0.5        // Trigger when 50% of slide is visible
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const slideIndex = Array.from(slides).indexOf(entry.target);
                background.style.backgroundImage = `url('${imagePaths[slideIndex]}')`;
                background.style.opacity = 1; // Ensure visibility
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    slides.forEach(slide => observer.observe(slide));
});