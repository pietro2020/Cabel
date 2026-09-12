async function carregarProdutos() {
    const response = await fetch('cabos.json');
    const produtos = await response.json();

    const energiaList = document.getElementById('energia-list');
    const telecomList = document.getElementById('telecom-list');

    produtos.forEach(produto => {
        const li = document.createElement('li');

        li.innerHTML = `
            <a href="produto.html?id=${produto.id}">
                <img src="img/catalogo/produtos/${produto.id}.png" alt="${produto.titulo}">
                <div class="card-info">
                    <span class="card-titulo">${produto.titulo}</span>
                    <span class="card-subtitulo">${produto.subtitulo ?? ''}</span>
                    <span class="ver-produto">Ver produto →</span>
                </div>
            </a>
        `;

        if (produto.tipo === 'energia') {
            energiaList.appendChild(li);
        } else if (produto.tipo === 'telecom') {
            telecomList.appendChild(li);
        }
    });
}

carregarProdutos();