function criarSlider(sliderSelector, tempo = 6200){

    const slider = document.querySelector(sliderSelector);

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');

    let index = 0;
    let intervalo;

    /* ========================= */

    function mostrarSlide(novoIndex){

        slides[index].classList.remove('active');
        dots[index].classList.remove('active');

        const videoAtual = slides[index].querySelector('video');

        if(videoAtual){
            videoAtual.pause();
        }

        index = novoIndex;

        if(index >= slides.length){
            index = 0;
        }

        if(index < 0){
            index = slides.length - 1;
        }

        slides[index].classList.add('active');
        dots[index].classList.add('active');

        const novoVideo = slides[index].querySelector('video');

        if(novoVideo){
            novoVideo.currentTime = 0;
            novoVideo.play();
        }
    }

    /* ========================= */

    function proximoSlide(){
        mostrarSlide(index + 1);
    }

    /* ========================= */

    function iniciarSlider(){
        intervalo = setInterval(proximoSlide, tempo);
    }

    /* ========================= */

    dots.forEach((dot, i) => {

        dot.addEventListener('click', () => {

            clearInterval(intervalo);

            mostrarSlide(i);

            iniciarSlider();

        });

    });

    /* ========================= */

    iniciarSlider();

}

criarSlider('.slider');
criarSlider('.slider-2');