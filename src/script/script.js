// cria a constante e capitura o elemento pelo id inserido no HTML
const characterId = document.getElementById('characterId');
const btnPesquisar = document.getElementById('btn-pesquisar');
const btnReset = document.getElementById('btn-reset');
const content = document.getElementById('content');
const containerResult = document.getElementById('result-style');
const image = document.getElementById('image');

// Função para consumir os dado da API
const fetchApi = (value) => {
    // Chama a api e busca o personagem pelo id, e cria uma promisse com os dados apenas daquele personagem 
    const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
        // Converte a promisse em outra promisse, mas no formato json
        .then((res) => res.json())
        // Recebe os Dados do json, data significa dados 
        .then((data) => {
            return data;
        });

    return result;
}
//Lista de chaves disponíveis
const keys = ['id', 'name', 'status', 'species', 'gender', 'origin', 'episode'];

const newKeys = {
    id: 'Id',
    name: 'Nome',
    status: 'Status',
    species: 'Espécie',
    gender: 'Gênero',
    origin: 'Planeta de Origem',
    episode: 'Participação em Episódios',
}

//Função para exibir o resultado na tela
const buildResult = (result) => {
    // cria um novo objeto
     return keys.map((key) => document.getElementById(key))
        .map((Element) => {
            if (Element.checked === true && (Array.isArray(result[Element.name])) === true) {
                const arrayLength = result[Element.name].length;
                console.log(arrayLength);
                const newElement = document.createElement('p');
                newElement.innerHTML = `${newKeys[Element.name]}: ${arrayLength}`;
                content.appendChild(newElement);
            }else if (Element.checked && (Element.name === 'origin')) {
                const newElement = document.createElement('p');
                newElement.innerHTML = `${newKeys[Element.name]} : ${result[Element.name].name}`;
                content.appendChild(newElement);
            }else if (Element.checked && typeof (result[Element.name]) !== 'object') {
                const newElement = document.createElement('p');
                newElement.innerHTML = `${newKeys[Element.name]} : ${result[Element.name]}`;
                content.appendChild(newElement);
            }
        });
}


// captura o click no botão pesquisar e cria a funcionalidade de pesquisar o personagem pelo id digitado pelo usuário.
// Usando o async para informar que a caotura do click no botão é uma função assincrona.
btnPesquisar.addEventListener('click', async (event) => {
    // Previne o padrão, ou seja, não permite uma atualização automática da página, fazendo com que as informações permaneção na tela
    event.preventDefault();
    // Chama a função fetchAPI e com o await informa que é preciso esperar pra depois realizar essa função. 

    if (characterId.value === '') {
        return content.innerHTML = "Você precisa inserir um Id de algum personagem";
    }
    const result = await fetchApi(characterId.value);
    if (content.firstChild === null) {
        containerResult.className = 'result-style';
        buildResult(result);
        image.src = `${result.image}`;
    }else {
        content.innerHTML = '';
        containerResult.className = 'result-style'; 
        buildResult(result);
        image.src = `${result.image}`;
    }
    
   
});

btnReset.addEventListener('click', () => location.reload());