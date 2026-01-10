const modal = document.getElementById('modal-ong');
const modalBody = document.getElementById('modal-body');
const btnFechar = document.querySelector('.close-modal');
const botoesSaibaMais = document.querySelectorAll('.btn-saiba');

const informacoesONGS = {
    0: {titulo: "ACNUR", cnpj: "02.531.026/0001-35.", texto: "ACNUR (Alto Comissariado das Nações Unidas para Refugiados) é a agência da ONU responsável por proteger e assistir pessoas forçadas a fugir de suas casas devido a guerras, conflitos, perseguições ou violações de direitos humanos, atuando globalmente para garantir sua segurança, direitos e um futuro digno, fornecendo ajuda humanitária, abrigo, comida, água e promovendo a reintegração em novas comunidades, operando com doações voluntárias e presente em diversos países, incluindo o Brasil.", linkDoar: "https://doar.acnurbrasil.org/page/ACNURBR/doe/fundo-de-emergencias?utm_source"},

    1: {titulo: "IRC", cnpj: "EIN: 13-5660870.(EUA)", texto: "O International Rescue Committee (IRC), ou Comitê Internacional de Resgate, consolidou-se em 2026 como uma das forças humanitárias mais críticas e influentes do planeta. Fundada originalmente em 1933 a pedido de Albert Einstein para ajudar oponentes de Adolf Hitler, a organização evoluiu de um grupo de assistência a refugiados europeus para uma operação global que, hoje, atua em mais de 40 países e 28 cidades dos Estados Unidos.", linkDoar: "https://help.rescue.org/donate"},

    2: {titulo: "ANISTIA INTERNACIONAL", cnpj: "05.151.353/0001-44.", texto: "A Anistia Internacional chega a 2026 como a maior organização de direitos humanos do mundo, com uma presença que abrange mais de 150 países e milhões de apoiadores. Ao contrário de organizações de assistência direta (como o IRC), a Anistia foca na investigação, denúncia e pressão política para combater abusos sistêmicos. ", linkDoar: "https://doe.anistia.org.br/doe/single_step?utm_source=google&utm_medium=cpc&utm_campaign={campaignname}&utm_term=anistia%20internacional&gad_source=1&gad_campaignid=23262107210&gbraid=0AAAAADn7Q05-QujbAafQ2vd8-ATJxhv2D&gclid=Cj0KCQiAyP3KBhD9ARIsAAJLnnaZ1qT_kjiv4InvdT-b-ZZu4TDODvoyQHK4v227QHzpHcyHj6FCkogaApqYEALw_wcB"},
    
};

botoesSaibaMais.forEach((botao, i) => {
    botao.addEventListener('click', (e) => {
        e.preventDefault();
        const info = informacoesONGS[i];

        modalBody.innerHTML = `
        <h3>${info.titulo}</h3>
        <p><strong>CNPJ:</strong>${info.cnpj}</p>
        <br>
        <p>${info.texto}</p>
        <br>
        <a href="${info.linkDoar}" target="_blank" class="btn-doar">Doar para esta causa</a>
        `;

        modal.style.display = "block";

    })
})
btnFechar.onclick = () => modal.style.display = "none";

window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
}