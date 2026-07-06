function criarSlider(sliderSelector, tempo = 8000){

    const slider = document.querySelector(sliderSelector);

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');

    let index = 0;
    let intervalo;

    /* ========================= */

    function mostrarSlide(novoIndex){

        slides[index].classList.remove('active');
        dots[index].classList.remove('active');

        index = novoIndex;

        if(index >= slides.length){
            index = 0;
        }

        if(index < 0){
            index = slides.length - 1;
        }

        slides[index].classList.add('active');
        dots[index].classList.add('active');

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