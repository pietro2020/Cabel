const coresMapa = {
    preto:    '#1a1a1a',
    azul:     '#1a56db',
    branco:   '#ffffff',
    verde:    '#16a34a',
    amarelo:  '#eab308',
    vermelho: '#dc2626',
    cinza:    '#9ca3af',
    marrom:   '#92400e',
};

const certsMapa = {
    'inmetro':       'img/certificados/logo/inmetro.png',
    'bureau veritas':'img/certificados/logo/bureau.png',
    'anatel':        'img/certificados/logo/anatel.png',
    'tuvnord':       'img/certificados/logo/tuvnord.png',
};

const especsMapa = [
    { chave: 'condutores',           label: 'Condutor' },
    { chave: 'condutoresAlimentacao',label: 'Condutor Alimentação' },
    { chave: 'condutoresCoaxial',    label: 'Condutor Coaxial' },
    { chave: 'isolacao',             label: 'Isolação' },
    { chave: 'cobertura',            label: 'Cobertura' },
    { chave: 'veias',                label: 'Veias' },
    { chave: 'nucleo',               label: 'Núcleo' },
    { chave: 'resolucao',            label: 'Resolução' },
    { chave: 'classe_de_tensao',     label: 'Classe de Tensão' },
    { chave: 'encordoamento',        label: 'Encordoamento' },
    { chave: 'temperatura_maxima',   label: 'Temperatura Máxima em Serviço Contínuo' },
    { chave: 'normas_aplicaveis',    label: 'Normas Aplicáveis' },
];

async function carregarProduto() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    const response = await fetch('cabos.json');
    const produtos = await response.json();
    const produto = produtos.find(p => p.id === id);

    const hero = document.querySelector('.produto-hero');
    hero.style.backgroundImage = `url('img/produto/${produto.id}.png')`;

    if (!produto) return;

    // Título e tipo
    document.title = `${produto.titulo} - Cabel`;
    document.getElementById('produto-tipo').textContent = produto.tipo.toUpperCase();

    const h1 = document.getElementById('produto-titulo');
    h1.innerHTML = `${produto.titulo} <span>${produto.subtitulo ?? ''}</span>`;

    document.getElementById('produto-texto').textContent = produto.texto;

    // Tabela de especificações
    const table = document.getElementById('specs-table');
    especsMapa.forEach(({ chave, label }) => {
        const valor = produto[chave];
        if (!valor || (Array.isArray(valor) && valor.length === 0)) return;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${label}</td>
            <td>${Array.isArray(valor) ? valor.join(', ') : valor}</td>
        `;
        table.appendChild(tr);
    });

    // Cores
    const coresSection = document.getElementById('cores-section');
    const coresLista = document.getElementById('cores-lista');

    if (produto.cores && produto.cores.length > 0) {
        produto.cores.forEach(cor => {
            const div = document.createElement('div');
            div.className = 'cor-item';
            div.innerHTML = `
                <div class="cor-circulo" style="background: ${coresMapa[cor] ?? cor}; ${cor === 'branco' ? 'border: 2px solid #ccc;' : ''}"></div>
                <span>${cor.charAt(0).toUpperCase() + cor.slice(1)}</span>
            `;
            coresLista.appendChild(div);
        });
    } else {
        coresSection.style.display = 'none';
    }

    // Certificados
    const certsSection = document.getElementById('certs-section');
    const certsLista = document.getElementById('certs-lista');

    if (produto.certificados && produto.certificados.length > 0) {
    produto.certificados.forEach(cert => {
        const src = certsMapa[cert.toLowerCase()];
        if (!src) return;

        const a = document.createElement('a');
        a.href = `img/certificados/doc/${cert}/${id}.pdf`;
        a.target = '_blank';

        const img = document.createElement('img');
        img.src = src;
        img.alt = cert;

        a.appendChild(img);
        certsLista.appendChild(a);
    });
} else {
    certsSection.style.display = 'none';
}

}

carregarProduto();