// JavaScript для анимации появления элементов при прокрутке
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (position < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
});
