document.addEventListener('DOMContentLoaded', async () => {
    const background = document.getElementById('background');
    const slides = document.querySelectorAll('.slide');
    const imagePaths = [
        'img/1.png',  // Home
        'img/2.png',  // Products
        'img/3.png',  // Downloads
        'img/4.png'   // Contact
    ];

    // Create a cache for preloaded images
    const imageCache = new Map();

    // Preload all background images
    const preloadImages = async () => {
        const loadPromises = imagePaths.map(path => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    imageCache.set(path, img);
                    resolve();
                };
                img.onerror = reject;
                img.src = path;
            });
        });
        
        try {
            await Promise.all(loadPromises);
            console.log('All images preloaded successfully');
        } catch (error) {
            console.error('Error preloading images:', error);
        }
    };

    // Wait for images to preload before continuing
    await preloadImages();

    // Set initial background image
    let currentImage = imagePaths[0];
    background.style.backgroundImage = `url('${currentImage}')`;
    background.style.opacity = 1;

    // Intersection Observer configuration
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
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
                // Check if image is in cache
                if (imageCache.has(newImage)) {
                    currentImage = newImage;
                    background.style.backgroundImage = `url('${newImage}')`;
                    background.style.opacity = 1;
                }
            }
        }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    slides.forEach(slide => observer.observe(slide));

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSlide = document.getElementById(targetId);
            targetSlide.scrollIntoView({ behavior: 'smooth' });
        });
    });
});