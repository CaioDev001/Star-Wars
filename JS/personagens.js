let currentPageUrl = 'https://swapi.dev/api/people/' 

window.onload = async() => {     //onload significa sempre que a página carregar
    try {
        await loadCharacters(currentPageUrl)    // Enviando a URL
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards!')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button') 

    nextButton.addEventListener('click', loadNextPage)          // O que vai acontecer caso um evento aconteça, o evento seria o 'click', sempre que
    backButton.addEventListener('click', loadPreviousPage)      // clicarem no botão, a função loadNextPage, que ainda não foi criada, será ativada.
};                                                          

async function loadCharacters(url) {            // Recebendo a URL
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''  // Limpar os resultados anteriores, basicamente limpar os resultados da página 1 e colocar os próximos

    try {
        const response = await fetch(url);             // Utilizando a URL, variável representando o resultado da requisição
        const responseJson = await response.json();    // Convertendo o resultado em Json
        
        responseJson.results.forEach((character) => {     // A função anônima vai iterar sobre o objeto do array, e cada objeto é um personagem
            const card = document.createElement("div")     // o .results está ligado com a documentação da API, o objeto que contém as informações dos personagens chama-se "results"  
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg')`  // Aqui temos uma expressão regular, basicamente procura um padrão dentro das URLs e nos retorna o valor desejado
            card.className = "cards"                                                                                 // Esta expressão regular em específico busca o ID de cada personagem, para nos gerar a imagem correta

            const characterNameBG = document.createElement("div")
            characterNameBG.className = "cards-name-bg"

            const characterName = document.createElement("span")
            characterName.className = "cards-name"
            characterName.innerText = `${character.name}`   // .name também segue a regra de documentação da API
            
            characterNameBG.appendChild(characterName)      // Colocando uma div dentro da outra, para isso serve o appendChild
            card.appendChild(characterNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''
            
                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/characters/${character.url.replace(/\D/g, "")}.jpg`
                characterImage.className = "cards-image"
            
                const name = document.createElement("span")
                name.className = "card-details"
                name.innerText = `Nome: ${character.name}`
            
                const characterHeight = document.createElement("span")
                characterHeight.className = "card-details"
                characterHeight.innerText = `Altura: ${convertHeight(character.height)}`
            
                const mass = document.createElement("span")
                mass.className = "card-details"
                mass.innerText = `Peso: ${convertMass(character.mass)}`
            
                const eyeColor = document.createElement("span")
                eyeColor.className = "card-details"
                eyeColor.innerText = `Cor dos Olhos: ${convertEyeColor(character.eye_color)}`
            
                const birthYear = document.createElement("span")
                birthYear.className = "card-details"
                birthYear.innerText = `Nascimento: ${convertBirthYear(character.birth_year)}`
            
                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(characterHeight)
                modalContent.appendChild(mass)
                modalContent.appendChild(eyeColor)
                modalContent.appendChild(birthYear)        
            } 

            const mainContent = document.getElementById('main-content');
            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')   // Repetimos as variáveis devido ao escopo, como estão agora 
        const backButton = document.getElementById('back-button')   // dentro de uma função diferente, serão usadas com outro objetivo.

        nextButton.disabled = !responseJson.next        // .next de acordo com a documentação da API, a sintaxe indica que caso haja uma próxima página, o botão ficará habilitado
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        
        currentPageUrl = url

    } catch (error) {
        console.log(error)
    }
}
        
async function loadNextPage() {             // Essa função foi feita para prevenir erros, pois a função loadNextPage gera uma nova requisição para a 
    if (!currentPageUrl) return;            // API baseada na página 2, e se a URL da página não foi novamente ativada, não faz sentido a função existir

    try {
      const response = await fetch(currentPageUrl)
      const responseJson = await response.json()
      
      await loadCharacters(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a próxima página.')
    }
}                              

async function loadPreviousPage() {

    try {
      const response = await fetch(currentPageUrl)
      const responseJson = await response.json()
      
      await loadCharacters(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior.')
    }
} 

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

function convertEyeColor(eyeColor) {
    const cores = {
        blue: "azul",
        brown: "castanho",
        green: "verde",
        yellow: "amarelo",
        black: "preto",
        pink: "rosa",
        red: "vermelho",
        orange: "laranja",
        hazel: "avela",
        unknown: "desconhecida"
    };

    return cores[eyeColor.toLowerCase()] || eyeColor;
}

function convertHeight(height) {
    if (height === "unknown") {
        return "desconhecida"
    }

    return (height / 100).toFixed(2);
}

function convertMass(mass) {
    if (mass === "unknown") {
        return "desconhecido"
    }

    return `${mass} kg`
}

function convertBirthYear(birthYear) {
    if (birthYear === "unknown") {
        return "desconhecido"
    }

    return birthYear
}