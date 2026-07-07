fetch('https://api.jikan.moe/v4/top/anime')
.then((response) => response.json())
.then((data) => {
    const topAnime = data.data.filter((anime) => anime.score > 9); // filtro dos cards com score >9
    console.log(topAnime);

const container = document.getElementById('container'); // onde os cards vão entrar

topAnime.forEach((anime) => {
    const card = document.createElement('div'); // caixa do card

    const imagem = document.createElement('img');
    imagem.src = anime.images.jpg.image_url;

    imagem.addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');

        sidebar.innerHTML = `
        <h2>${anime.title}</h2>
        <p>Rating: ${anime.rating}</p>
        <p>Data de lançamento: ${anime.aired.string}</p>
        <p>Género: ${anime.genres.map((genero) => genero.name).join(', ')}</p>
    `;
    
    sidebar.classList.remove('escondido');
});
    

    const titulo = document.createElement('h3');
    titulo.textContent = anime.title;

    card.appendChild(imagem);
    card.appendChild(titulo);

    container.appendChild(card); // mete o card completo dentro do container
});
});

const anoAtual = new Date().getFullYear(); // ano atual, automático
document.getElementById('footer').textContent = `© ${anoAtual} Laura Baptista`;