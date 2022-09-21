
let playerAttack 
let enemyAttack
let playerLifes = 3
let enemyLifes = 3

function randomNumber (min, max ){
  return Math.floor(Math.random() * (max - min + 1) + min ) 
}

function selectPlayerPet(){
  
    let sectionAttack = document.getElementById('select-attack')
    sectionAttack.style.display = 'flex' 

    let sectionPet = document.getElementById('select-pet')
    sectionPet.style.display = 'none'

    let inputHipoge = document.getElementById('Hipoge')
    let inputRatigueya = document.getElementById('Ratigueya')
    let inputCapipepo = document.getElementById('Capipepo')
    let inputLangostelvis = document.getElementById('Langostelvis')
    let inputTucalpma = document.getElementById('Tucalpma')
    let inputPydos = document.getElementById('Pydos')
    let petNamePlayer = document.getElementById('petNamePlayer')

    if(inputHipoge.checked){
      petNamePlayer.innerHTML="Hipoge"
    } else if(inputRatigueya.checked){
      petNamePlayer.innerHTML = "Ratigueya"
    } else if(inputCapipepo.checked){
      petNamePlayer.innerHTML="Capipepo"
    } else if(inputLangostelvis.checked){
      petNamePlayer.innerHTML="Langostelvis"
    } else if(inputTucalpma.checked){
      petNamePlayer.innerHTML = "Tucalpma"
    } else if(inputPydos.checked){
      petNamePlayer.innerHTML = "Pydos"
    } else {
      alert('You must select a pet ')
    }  
    selectEnemyPet()
}

function selectEnemyPet() {
  let numberPet = randomNumber(1,6)
  let petNameEnemy = document.getElementById('petNameEnemy')
  if(numberPet == 1){
    petNameEnemy.innerHTML="Hipoge"
  } else if(numberPet == 2){
    petNameEnemy.innerHTML = "Ratigueya"
  } else if(numberPet == 3){
    petNameEnemy.innerHTML="Capipepo"
  } else if(numberPet == 4){
    petNameEnemy.innerHTML="Langostelvis"
  } else if(numberPet == 5){
    petNameEnemy.innerHTML = "Tucalpma"
  } else {
    petNameEnemy.innerHTML = "Pydos"
  }
}

function attackFire(){
  playerAttack = "FIRE"
  console.log(playerAttack)
  randomSelectEnemyAttack()
}

function attackWater(){
  playerAttack = "WATER"
  console.log(playerAttack)
  randomSelectEnemyAttack()
}

function attackEarth(){
  playerAttack = "EARTH"
  console.log(playerAttack)
  randomSelectEnemyAttack()
}

function randomSelectEnemyAttack() {
  let attackNumber = randomNumber(1,3)
  if(attackNumber == 1){
    enemyAttack = "FIRE"
  } else if(attackNumber==2){
    enemyAttack = "WATER"
  } else {
    enemyAttack = "EARTH"
  }
  updateMessages()
}

function updateMessages(){
  let result = combat()

  let msgResult = document.getElementById('msgResult')
  let msgPlayerAttack = document.getElementById('msgPlayerAttack')
  let msgEnemyAttack = document.getElementById('msgEnemyAttack')  
  
  
  let phrasePlayerAttack = document.createElement('p'); 
  let phraseEnemyAttack = document.createElement('p'); 

  msgResult.innerHTML = result
  phrasePlayerAttack.innerHTML = playerAttack
  phraseEnemyAttack.innerHTML = enemyAttack
  

  msgPlayerAttack.appendChild(phrasePlayerAttack)
  msgEnemyAttack.appendChild(phraseEnemyAttack)
  checkLifes()
}

function combat() {

  let spanPlayerLifes = document.getElementById('playerLifes')
  let spanEnemyLifes = document.getElementById('enemyLifes')  

  if(playerAttack == enemyAttack){
    return 'Draw 😬'; 
  } else if((playerAttack=='FIRE' && enemyAttack=='EARTH')
            || (playerAttack=='EARTH' && enemyAttack=='WATER')
            || (playerAttack=='WATER' && enemyAttack=='FIRE')){
              enemyLifes--; 
              spanEnemyLifes.innerHTML = enemyLifes              
              return 'Won 🎉'; 
            }
            else {
              playerLifes--;
              spanPlayerLifes.innerHTML = playerLifes 
              return 'LOST 😵';
            }
}

function checkLifes(){
  if(enemyLifes==0){
    messageFinal("Congratulation!! You won")    
  } else if(playerLifes == 0)
  {
    messageFinal("Auch!! You lost")
  }
}

function disableButton() {
  let fireAttackButton = document.getElementById('button-fire')
  fireAttackButton.disabled=true
  let waterAttackButton = document.getElementById('button-water')
  waterAttackButton.disabled=true
  let earthAttackButton = document.getElementById('button-earth')
  earthAttackButton.disabled=true
}

function messageFinal(resultEnd){
  let messageSection = document.getElementById('msgResult')  

  messageSection.innerHTML = resultEnd  
  disableButton(); 
  let sectionRestart = document.getElementById('reload')
  sectionRestart.style.display = 'block' 
}

function resetGame(){
  location.reload()
}

function startGame() {

    let sectionAttack = document.getElementById('select-attack')
    sectionAttack.style.display = 'none' 

    let sectionRestart = document.getElementById('reload')
    sectionRestart.style.display = 'none' 

    let playersPetButton = document.getElementById('button-pets')
    playersPetButton.addEventListener('click', selectPlayerPet)
    let fireAttackButton = document.getElementById('button-fire')
    fireAttackButton.addEventListener('click', attackFire)
    let waterAttackButton = document.getElementById('button-water')
    waterAttackButton.addEventListener('click', attackWater)
    let earthAttackButton = document.getElementById('button-earth')
    earthAttackButton.addEventListener('click', attackEarth)
    let resetButton = document.getElementById('button-restart')
    resetButton.addEventListener('click', resetGame)    

}

window.addEventListener('load', startGame)