const sectionAttack = document.getElementById('select-attack')
const sectionRestart = document.getElementById('reload')
const playersPetButton = document.getElementById('button-pets')
const fireAttackButton = document.getElementById('button-fire')
const waterAttackButton = document.getElementById('button-water')
const earthAttackButton = document.getElementById('button-earth')
const resetButton = document.getElementById('button-restart')

const sectionPet = document.getElementById('select-pet')
const inputHipoge = document.getElementById('Hipoge')
const inputRatigueya = document.getElementById('Ratigueya')
const inputCapipepo = document.getElementById('Capipepo')
const inputLangostelvis = document.getElementById('Langostelvis')
const inputTucalpma = document.getElementById('Tucalpma')
const inputPydos = document.getElementById('Pydos')
const petNamePlayer = document.getElementById('petNamePlayer')

const petNameEnemy = document.getElementById('petNameEnemy')

const msgResult = document.getElementById('msgResult')
const msgPlayerAttack = document.getElementById('msgPlayerAttack')
const msgEnemyAttack = document.getElementById('msgEnemyAttack')

const spanPlayerLifes = document.getElementById('playerLifes')
const spanEnemyLifes = document.getElementById('enemyLifes')  

const messageSection = document.getElementById('msgResult')  

let playerAttack 
let enemyAttack
let playerLifes = 3
let enemyLifes = 3

function startGame() {    
  sectionAttack.style.display = 'none' 
  sectionRestart.style.display = 'none' 
  playersPetButton.addEventListener('click', selectPlayerPet)
  fireAttackButton.addEventListener('click', attackFire)
  waterAttackButton.addEventListener('click', attackWater)
  earthAttackButton.addEventListener('click', attackEarth)
  resetButton.addEventListener('click', resetGame)    
}

function randomNumber (min, max ){
  return Math.floor(Math.random() * (max - min + 1) + min ) 
}

function selectPlayerPet(){    
    sectionAttack.style.display = 'flex'     
    sectionPet.style.display = 'none'
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
  const numberPet = randomNumber(1,6)  
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
  const attackNumber = randomNumber(1,3)
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
  const result = combat()

  const phrasePlayerAttack = document.createElement('p'); 
  const phraseEnemyAttack = document.createElement('p'); 

  msgResult.innerHTML = result
  phrasePlayerAttack.innerHTML = playerAttack
  phraseEnemyAttack.innerHTML = enemyAttack
  
  msgPlayerAttack.appendChild(phrasePlayerAttack)
  msgEnemyAttack.appendChild(phraseEnemyAttack)
  checkLifes()
}

function combat() {

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
  fireAttackButton.disabled=true  
  waterAttackButton.disabled=true  
  earthAttackButton.disabled=true
}

function messageFinal(resultEnd){
  messageSection.innerHTML = resultEnd  
  disableButton();   
  sectionRestart.style.display = 'block' 
}

function resetGame(){
  location.reload()
}



window.addEventListener('load', startGame)