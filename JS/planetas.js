let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async() => {
    try {
        await loadPlanets(currentPageUrl)
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards!') 
        }
    
    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((planet) => {
            const card = document.createElement("div");
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg')`  
            card.className = "planet-cards"; 

            const planetNameBG = document.createElement("div")
            planetNameBG.className = "cards-name-bg"

            const planetName = document.createElement("span")
            planetName.className = "cards-name"
            planetName.innerText = `${planet.name}`

            planetNameBG.appendChild(planetName)
            card.appendChild(planetNameBG)
            
            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''
            
                const planetImage = document.createElement("div")
                planetImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg`
                planetImage.className = "cards-image"
            
                const name = document.createElement("span")
                name.className = "card-details"
                name.innerText = `Nome: ${planet.name}`
            
                const planetClimate = document.createElement("span")
                planetClimate.className = "card-details"
                planetClimate.innerText = `Clima: ${convertClimate(planet.climate)}`
            
                const diameter = document.createElement("span")
                diameter.className = "card-details"
                diameter.innerText = `Diâmetro: ${planet.diameter}`
            
                const terrain = document.createElement("span")
                terrain.className = "card-details"
                terrain.innerText = `Terreno: ${convertTerrain(planet.terrain)}`
            
                modalContent.appendChild(planetImage)
                modalContent.appendChild(name)
                modalContent.appendChild(planetClimate)
                modalContent.appendChild(diameter)
                modalContent.appendChild(terrain)
            }

            const mainContent = document.getElementById('main-content');
            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        
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
          
          await loadPlanets(responseJson.next)
    
        } catch (error) {
            console.log(error)
            alert('Erro ao carregar a próxima página.')
        }
    }                              
    
    async function loadPreviousPage() {
    
        try {
          const response = await fetch(currentPageUrl)
          const responseJson = await response.json()
          
          await loadPlanets(responseJson.previous)
    
        } catch (error) {
            console.log(error)
            alert('Erro ao carregar a página anterior.')
        }
    } 
    
    function hideModal() {
        const modal = document.getElementById("modal")
        modal.style.visibility = "hidden"
    }

    function convertClimate(planetClimate) {
        const climas = {
            arid: "arido",
            temperate: "temperado",
            frozen: "gelado",
            murky: "obscuro",
            windy: "ventoso",
            frigid: "frigido"
        };

        return climas[planetClimate.toLowerCase()] || planetClimate;
    }

    function convertTerrain(terrain) {
        const terrenos = {
            desert: "deserto",
            ocean: "oceanico"
        };

        return terrenos[terrain.toLowerCase()] || terrain;
    }

  