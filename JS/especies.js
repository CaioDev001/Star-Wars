let currentPageUrl = 'https://swapi.dev/api/species/'

window.onload = async() => {
    try {
        await loadSpecies(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards!');
    }
    
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadSpecies(url){
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try {
        const response = await fetch(url)
        const responseJson = await response.json();

        responseJson.results.forEach((specie) => {
            const card = document.createElement("div");
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/species/${specie.url.replace(/\D/g, "")}.jpg')`  
            card.className = "cards";

            const specieNameBG = document.createElement("div")
            specieNameBG.className = "cards-name-bg"

            const specieName = document.createElement("span")
            specieName.className = "cards-name"
            specieName.innerText = `${specie.name}`

            specieNameBG.appendChild(specieName)
            card.appendChild(specieNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''
            
                const specieImage = document.createElement("div")
                specieImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/species/${specie.url.replace(/\D/g, "")}.jpg`
                specieImage.className = "cards-image"

                const name = document.createElement("span")
                name.className = "card-details"
                name.innerText = `Nome: ${specie.name}`
            
                const classification = document.createElement("span")
                classification.className = "card-details"
                classification.innerText = `Classificacao: ${specie.classification}`
            
                const designation = document.createElement("span")
                designation.className = "card-details"
                designation.innerText = `Designacao: ${specie.designation}`

                modalContent.appendChild(specieImage)
                modalContent.appendChild(name)
                modalContent.appendChild(classification)
                modalContent.appendChild(designation)
            }

            const mainContent = document.getElementById('main-content');
            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        nextButton.style.visibility = responseJson.next? "visible" : "hidden"
        
        currentPageUrl = url

    } catch (error) {
        console.log(error)
    }
}

async function loadNextPage() {
    if (!currentPageUrl) return;
        try {
          const response = await fetch(currentPageUrl)
          const responseJson = await response.json()
          
          await loadSpecies(responseJson.next)
    
        } catch (error) {
            console.log(error)
            alert('Erro ao carregar a próxima página.')
        }
    }                                                          
    
async function loadPreviousPage() {
    try {
      const response = await fetch(currentPageUrl)
      const responseJson = await response.json()
      
      await loadSpecies(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior.')
    }
} 

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}

