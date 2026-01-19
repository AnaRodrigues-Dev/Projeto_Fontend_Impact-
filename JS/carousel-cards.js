 function inicializarCarrossel(secaoId) {
    const secao = document.getElementById(secaoId);
    if (!secao) return;

    const trilho = secao.querySelector('.cards-inner');
    const cards = secao.querySelectorAll('.card');
    const btnPrev = secao.querySelector('.seta-prev');
    const btnNext = secao.querySelector('.seta-next');

    let index = 0;


        function atualizarCarrossel() {
            if (window.innerWidth < 1024) {

                if (index >= cards.length) index = 0;
                if (index < 0) index = cards.length - 1;
                
                const deslocamento = index * 100;
                trilho.style.transform = `translateX(-${deslocamento}%)`;
            } else {
                trilho.style.transform = 'translateX(0)';
            }
        }

        
        if (btnNext) {
        btnNext.addEventListener('click', () => {
            index++;
            atualizarCarrossel();
        });
    }
         
        if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            index--;
            atualizarCarrossel();
        });
    }
         window.addEventListener('resize', atualizarCarrossel);
}

inicializarCarrossel('direitoshumanos')
inicializarCarrossel('meioambiente')
inicializarCarrossel('educacao')
inicializarCarrossel('saude')
inicializarCarrossel('combateafome')
     