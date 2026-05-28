// Defines the interaction logic for the blue effect
function initEffects() {
    const olioWrapper = document.getElementById('olio-wrapper');

    if (!olioWrapper) return;

    // Functions to trigger the animation class
    const activateEffect = () => olioWrapper.classList.add('touch-effect');
    const deactivateEffect = () => olioWrapper.classList.remove('touch-effect');

    // Desktop hover events
    olioWrapper.addEventListener('mouseenter', activateEffect);
    olioWrapper.addEventListener('mouseleave', deactivateEffect);
    
    // Mobile touch events
    olioWrapper.addEventListener('touchstart', activateEffect, { passive: true });
    olioWrapper.addEventListener('touchend', deactivateEffect);
    olioWrapper.addEventListener('touchcancel', deactivateEffect);
}

// --- 3D Bending Scroll Reveal Tracking Engine ---
function initScrollReveal() {
    const checkReveal = () => {
        // Triggers the unbend animation right at the bottom 90% boundary of the screen
        const triggerBottom = window.innerHeight * 0.9;
        const revealElements = document.querySelectorAll(".reveal-element");

        revealElements.forEach(el => {
            // Only process computations on visible category subsets
            if (el.style.display !== "none") {
                const elTop = el.getBoundingClientRect().top;
                
                if (elTop < triggerBottom) {
                    el.classList.add("active"); // Straightens up
                } else {
                    el.classList.remove("active"); // Re-bends if scrolled away
                }
            }
        });
    };

    window.addEventListener("scroll", checkReveal);
    window.addEventListener("resize", checkReveal);
    
    // Initial check loop initialization
    checkReveal();
}

// Instantiate listeners once context mounts securely
document.addEventListener("DOMContentLoaded", () => {
    initEffects();
    initScrollReveal();
});