const qualidade = document.querySelector('.quantity');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

observer.observe(qualidade);