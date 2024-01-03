let currentPageUrl = 'https://swapi.dev/api/vehicles/'

window.onload = async() => {
    try {
        await loadVehicles(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards!');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadVehicles(url){
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''

    try {
        const response = await fetch(url)
        const responseJson = await response.json();

        responseJson.results.forEach((vehicle) => {
            const card = document.createElement("div");
            card.style.backgroundImage = 
            `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.replace(/\D/g, "")}.jpg')`  
            card.className = "planet-cards";

            const vehicleNameBG = document.createElement("div")
            vehicleNameBG.className = "cards-name-bg"

            const vehicleName = document.createElement("span")
            vehicleName.className = "cards-name"
            vehicleName.innerText = `${vehicle.name}`

            vehicleNameBG.appendChild(vehicleName)
            card.appendChild(vehicleNameBG)

            card.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''
            
                const vehicleImage = document.createElement("div")
                vehicleImage.style.backgroundImage = 
                `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicle.url.replace(/\D/g, "")}.jpg`
                vehicleImage.className = "cards-image"

                const name = document.createElement("span")
                name.className = "card-details"
                name.innerText = `Nome: ${vehicle.name}`

                const manufacturer = document.createElement("span")
                manufacturer.className = "card-details"
                manufacturer.innerText = `Fabricante: ${vehicle.manufacturer}`

                const passengers = document.createElement("span")
                passengers.className = "card-details"
                passengers.innerText = `Passageiros: ${vehicle.passengers}`

                const vehicleClass = document.createElement("span")
                vehicleClass.className = "card-details"
                vehicleClass.innerText = `Classe: ${vehicle.vehicle_class}`

                modalContent.appendChild(vehicleImage)
                modalContent.appendChild(name)
                modalContent.appendChild(manufacturer)
                modalContent.appendChild(passengers)
                modalContent.appendChild(vehicleClass)
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
          
          await loadVehicles(responseJson.next)
    
        } catch (error) {
            console.log(error)
            alert('Erro ao carregar a próxima página.')
        }
    }                                                          
    
async function loadPreviousPage() {
    try {
      const response = await fetch(currentPageUrl)
      const responseJson = await response.json()
      
      await loadVehicles(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar a página anterior.')
    }
} 

function hideModal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}