
let playerAttack 
let enemyAttack
let playerLifes = 3
let enemyLifes = 3

function randomNumber (min, max ){
  return Math.floor(Math.random() * (max - min + 1) + min ) 
}

function selectPlayerPet(){
  
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
  let messageSection = document.getElementById('messages')  
  
  let phrase = document.createElement('p'); 
  phrase.innerHTML = 'Your pet attacked with '+ playerAttack +', The enemy´s pet attacked with ' + enemyAttack + ' -- ' + result
  messageSection.appendChild(phrase)

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

function startGame() {
    let playersPetButton = document.getElementById('button-pets')
    playersPetButton.addEventListener('click', selectPlayerPet)
    let fireAttackButton = document.getElementById('button-fire')
    fireAttackButton.addEventListener('click', attackFire)
    let waterAttackButton = document.getElementById('button-water')
    waterAttackButton.addEventListener('click', attackWater)
    let earthAttackButton = document.getElementById('button-earth')
    earthAttackButton.addEventListener('click', attackEarth)
}

window.addEventListener('load', startGame)