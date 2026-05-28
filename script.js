document.addEventListener("DOMContentLoaded", () => {

    // --- Smooth Scroll Navigation Feature ---
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // --- Modal Elements ---
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    // --- Open Modal Function (used by all cards) ---
    function openModal(card) {
        const imgUrl = card.getAttribute('data-image');
        const title = card.querySelector('h3').innerText;
        const desc = card.querySelector('p').innerText;

        if (imgUrl) {
            modalImg.src = imgUrl;
            modalTitle.innerText = title;
            modalDesc.innerText = desc;
            modal.style.display = "flex";
        }
    }

    // --- Close Modal ---
    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = "none";
        modalImg.src = "";
    });

    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            modalImg.src = "";
        }
    });

    // --- Portfolio Grid Filtering ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".glass-card");
    const closeAllBtn = document.getElementById("close-all");

    // Hide all cards initially
    projectCards.forEach(card => {
        card.style.display = "none";
        card.classList.remove("active");
        // Attach modal click listener to EVERY card here (inside DOMContentLoaded)
        card.addEventListener('click', () => openModal(card));
    });
    filterButtons.forEach(btn => btn.classList.remove("active"));

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedFilter = button.getAttribute("data-filter");

            // Toggle: clicking active filter collapses all
            if (button.classList.contains("active")) {
                button.classList.remove("active");
                projectCards.forEach(card => {
                    card.classList.remove("active");
                    card.style.display = "none";
                });
                return;
            }

            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                card.classList.remove("active");
                card.style.display = "none";

                if (selectedFilter === "all" || cardCategory === selectedFilter) {
                    card.style.display = "block";
                    setTimeout(() => card.classList.add("active"), 50);
                }
            });

            setTimeout(() => window.dispatchEvent(new Event('portfolioUpdate')), 60);
        });
    });

    if (closeAllBtn) {
        closeAllBtn.addEventListener("click", () => {
            projectCards.forEach(card => {
                card.classList.remove("active");
                card.style.display = "none";
            });
            filterButtons.forEach(btn => btn.classList.remove("active"));
        });
    }
});