// js/script.js
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // relative to document viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of the section is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    // Optional: stop observing the element once it's visible to fire animation only once
                    observer.unobserve(entry.target);
                }
                // No 'else' needed if we only want the animation to fire once
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach(section => {
            // Initial state for animation
            section.style.opacity = 0;
            section.style.transform = 'translateY(30px)'; // Start slightly lower
            section.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
            observer.observe(section);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        // Make all sections visible immediately
        sections.forEach(section => {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        });
        console.log('IntersectionObserver not supported, animations disabled.');
    }

    // The glowing text effect is handled by CSS animation.
});

