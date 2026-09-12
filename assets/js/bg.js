const seguranca = document.querySelector('.seguranca');
const segurancaImg = document.querySelector('.seguranca-img');

function atualizarParallax() {
    const rect = seguranca.getBoundingClientRect();
    const offset = rect.top * 0.3;
    segurancaImg.style.transform = `translateY(${offset}px)`;
}

window.addEventListener('scroll', atualizarParallax, { passive: true });
window.addEventListener('touchmove', atualizarParallax, { passive: true });

atualizarParallax();