const trilho =
document.querySelector('.cards-inner');
const cards = document.querySelectorAll('.card');
const btnPrev = document.querySelector('.seta-prev');
const bntNext = document.querySelector('.seta-next');

let index = 0;

function atualizarCarrossel() {
    const larguraJanela = window.innerWidth;

    if (larguraJanela < 1024) {
        const deslocamento = index * 100;
        trilho.style.transform = `translateX(-${deslocamento}%)`;

    } else {
        trilho.style.transform = 'translateX(0)';
    }
}

bntNext.addEventListener('click', () => {
    if (index < cards.length -1) {
        index++;
        atualizarCarrossel();
    } else {
        index = 0;
        atualizarCarrossel();
    }
});

btnPrev.addEventListener('click', () => {
    if (index > 0) {
        index--;
        atualizarCarrossel();
    } else {
        index = cards.length -1;
        atualizarCarrossel();
    }
});