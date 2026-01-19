// Espera a página carregar
document.addEventListener('DOMContentLoaded', function() {
    
    // Pega os botões de comprar
    const botoesComprar = document.querySelectorAll('.botao-comprar');
    const botaoCarregar = document.querySelector('.botao-carregar');
    
    // Adiciona função de comprar em cada botão
    botoesComprar.forEach(function(botao) {
        botao.addEventListener('click', function() {
            mostrarMensagem('Produto adicionado ao carrinho!');
        });
    });

    // Função que mostra mensagem na tela
    function mostrarMensagem(texto) {
        const mensagem = document.createElement('div');
        mensagem.textContent = texto;
        mensagem.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #7fba3d;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 1000;
        `;
        
        document.body.appendChild(mensagem);
        
        setTimeout(function() {
            mensagem.remove();
        }, 2000);
    }

    // Função do botão carregar mais produtos
    if (botaoCarregar) {
        botaoCarregar.addEventListener('click', function() {
            carregarMaisProdutos();
        });
    }

    // Carrega mais produtos na página
    function carregarMaisProdutos() {
        const listaProdutos = document.querySelector('.lista-produtos');
        
        for (let i = 0; i < 3; i++) {
            const novoProduto = criarProduto();
            listaProdutos.appendChild(novoProduto);
        }
        
        mostrarMensagem('Mais produtos carregados!');
    }

    // Cria um novo card de produto
    function criarProduto() {
        const article = document.createElement('article');
        article.className = 'card-produto';
        
        article.innerHTML = `
            <div class="imagem-produto">
                <img src="https://via.placeholder.com/200x200/e8e8e8/666666?text=Produto" alt="Novo Produto">
            </div>
            <h3>Nome do Produto</h3>
            <p class="preco">R$ 99,90</p>
            <button class="botao-comprar">Comprar</button>
        `;
        
        const botao = article.querySelector('.botao-comprar');
        botao.addEventListener('click', function() {
            mostrarMensagem('Produto adicionado ao carrinho!');
        });
        
        return article;
    }

});