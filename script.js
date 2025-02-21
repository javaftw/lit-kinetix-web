document.addEventListener('DOMContentLoaded', () => {
    const background = document.getElementById('background');
    const slides = document.querySelectorAll('.slide');

    // Set initial background
    background.style.backgroundImage = `url('img/1.png')`;

    // Intersection Observer to change background based on visible slide
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the slide is in view
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Get the slide’s index (1-based for image naming)
                const slideIndex = Array.from(slides).indexOf(entry.target) + 1;
                background.style.backgroundImage = `url('img/${slideIndex}.png')`;
                background.style.opacity = 1; // Fade in
            } else {
                background.style.opacity = 0; // Fade out when leaving
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    slides.forEach(slide => observer.observe(slide));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1); // Remove #
            const targetSlide = document.getElementById(targetId);
            targetSlide.scrollIntoView({ behavior: 'smooth' });
        });
    });
});