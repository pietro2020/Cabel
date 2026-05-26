const carrosselContainer = document.querySelector('.produtos-carrossel');
const catalogo = document.querySelector('.produtos-catalogo');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

const originalCards = Array.from(catalogo.children).map(c => c.cloneNode(true));
const totalOriginal = originalCards.length;
let currentIndex = 0;
let isTransitioning = false;
let visiveis = 3;

function getVisivel() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
}

function rebuild() {
    isTransitioning = false;
    visiveis = getVisivel();

    catalogo.innerHTML = '';

    // clones do fim (antes)
    originalCards.slice(-visiveis).forEach(c => {
        catalogo.appendChild(c.cloneNode(true));
    });

    // originais
    originalCards.forEach(c => {
        catalogo.appendChild(c.cloneNode(true));
    });

    // clones do início (depois)
    originalCards.slice(0, visiveis).forEach(c => {
        catalogo.appendChild(c.cloneNode(true));
    });

    currentIndex = visiveis;
    moverSemAnimar();
}

function getCardWidth() {
    return catalogo.children[0].offsetWidth + 24;
}

function moverSemAnimar() {
    catalogo.style.transition = 'none';
    catalogo.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
    void catalogo.offsetWidth;
}

function moverComAnimar() {
    catalogo.style.transition = 'transform 0.5s ease';
    catalogo.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
}

btnNext.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    moverComAnimar();
});

btnPrev.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    moverComAnimar();
});

catalogo.addEventListener('transitionend', () => {
    if (currentIndex >= totalOriginal + visiveis) {
        currentIndex = visiveis;
        moverSemAnimar();
    } else if (currentIndex <= visiveis - 1) {
        currentIndex = totalOriginal + visiveis - 1;
        moverSemAnimar();
    }
    isTransitioning = false;
});

window.addEventListener('resize', rebuild);
rebuild();