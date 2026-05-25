const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const overlay = document.querySelector('.nav-overlay');

toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    overlay.classList.toggle('open');
});

overlay.addEventListener('click', () => {
    nav.classList.remove('open');
    overlay.classList.remove('open');
});

const header = document.getElementById('header');
const content = document.querySelector('.content');

window.addEventListener('scroll', () => {
    if (window.innerWidth < 1024) return;

    if (window.scrollY > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


const sobreNos = document.querySelector('.sobre-nos');
const qualidade = document.querySelector('.quantity');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

observer.observe(sobreNos);
observer.observe(qualidade);