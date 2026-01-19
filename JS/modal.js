const modal = document.getElementById('modal-ong');
const modalBody = document.getElementById('modal-body');
const btnFechar = document.querySelector('.close-modal');
const botoesSaibaMais = document.querySelectorAll('.btn-saiba');

botoesSaibaMais.forEach((botao) => {
    botao.addEventListener('click', (e) => {
        e.preventDefault();
        
        const titulo = botao.getAttribute('data-titulo');
        const texto = botao.getAttribute('data-texto');
        const linkDoar = botao.getAttribute('data-link');
        
        modalBody.innerHTML = `
            <h3>${titulo}</h3>
            <p>${texto}</p>
            <br>
            <a href="${linkDoar}" target="_blank" class="btn-doar">Doar para esta causa</a>
        `;
        modal.style.display = "block";
    });
});

btnFechar.onclick = () => modal.style.display = "none";

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

};