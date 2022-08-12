
function selectPlayerPet(){
  alert("Choosed")  
}

function startGame() {
    let playersPetButton = document.getElementById('button-pets')
    playersPetButton.addEventListener('click', selectPlayerPet)
}

window.addEventListener('load', startGame)