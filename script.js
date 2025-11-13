document.addEventListener('DOMContentLoaded', () => {

    // === Animate skill bars when they enter the viewport ===
    const fills = document.querySelectorAll('.skill-fill');

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const width = fill.dataset.width;

                    // Animate the bar only once
                    if (!fill.style.width || fill.style.width === '0px' || fill.style.width === '0%') {
                        fill.style.width = width;
                    }
                }
            });
        }, { threshold: 0.6 });

        fills.forEach(fill => observer.observe(fill));

    } else {
        // Fallback for older browsers — instantly set the width
        fills.forEach(fill => {
            const width = fill.dataset.width;
            fill.style.width = width;
        });
    }


    // === Smooth scrolling for internal anchor links ===
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Ignore non-anchor or empty "#"
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });


    // === Language switching ===
    function setLang(lang) {
        // Update all elements that have data-en / data-de attributes
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = el.getAttribute('data-' + lang);
            if (text) {
                el.innerHTML = text.trim();
            }
        });

        // Highlight currently active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const btnLang = btn.dataset.lang ||
                            btn.textContent.trim().toLowerCase();

            if (btnLang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Store selected language (optional)
        try {
            localStorage.setItem('lang', lang);
        } catch (e) {
            // Ignore storage errors (private mode, browser restrictions)
        }
    }

    // Make setLang globally available in case HTML uses onclick="setLang('en')"
    window.setLang = setLang;


    // Add click event to language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const btnLang =
                btn.dataset.lang ||
                btn.textContent.trim().toLowerCase();

            setLang(btnLang);
        });
    });


    // Load saved language or use English by default
    let initialLang = 'en';
    try {
        const saved = localStorage.getItem('lang');
        if (saved === 'en' || saved === 'de') {
            initialLang = saved;
        }
    } catch (e) {
        // Ignore storage read errors
    }

    setLang(initialLang);
});
