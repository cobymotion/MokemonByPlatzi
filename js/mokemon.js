const sectionAttack = document.getElementById('select-attack')
const sectionRestart = document.getElementById('reload')
const playersPetButton = document.getElementById('button-pets')
const fireAttackButton = document.getElementById('button-fire')
const waterAttackButton = document.getElementById('button-water')
const earthAttackButton = document.getElementById('button-earth')
const resetButton = document.getElementById('button-restart')

const sectionPet = document.getElementById('select-pet')

const petNamePlayer = document.getElementById('petNamePlayer')

const petNameEnemy = document.getElementById('petNameEnemy')

const msgResult = document.getElementById('msgResult')
const msgPlayerAttack = document.getElementById('msgPlayerAttack')
const msgEnemyAttack = document.getElementById('msgEnemyAttack')

const spanPlayerLifes = document.getElementById('playerLifes')
const spanEnemyLifes = document.getElementById('enemyLifes')  

const messageSection = document.getElementById('msgResult')  
const cardsContainer = document.getElementById('cards-container')  

const cobymons = []
let cobymonsOptions
let playerAttack 
let enemyAttack
let playerLifes = 3
let enemyLifes = 3

let inputHipoge 
let inputRatigueya 
let inputCapipepo 
let inputLangostelvis 
let inputTucalpma
let inputPydos 


class Cobymon {

  constructor(name, photo, life){
    this.name = name
    this.photo = photo
    this.life = life
    this.attacks = []
  }

}

const hipoge = new Cobymon('Hipoge','/assets/poke1.png',5)
const capipepo = new Cobymon('Capipepo','/assets/poke2.png',5)
const ratigueya = new Cobymon('Ratigueya','/assets/poke3.png',5)
const langostelvis = new Cobymon('Langostelvis','/assets/poke4.png',5)
const tucalpma = new Cobymon('Tucalpma','/assets/poke5.png',5)
const pydos = new Cobymon('Pydos','/assets/poke6.png',5)

hipoge.attacks.push(
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
)

capipepo.attacks.push(
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
)

ratigueya.attacks.push(
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
)

langostelvis.attacks.push(
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
)

tucalpma.attacks.push(
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
)

pydos.attacks.push(
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
)

cobymons.push(hipoge, capipepo,ratigueya,langostelvis,tucalpma,pydos)

function startGame() {    
  sectionAttack.style.display = 'none' 
  sectionRestart.style.display = 'none' 

  cobymons.forEach((cobymon) => {
    cobymonsOptions = `
        <input type="radio" name="mascota" id="${cobymon.name}">
        <label for="${cobymon.name}" class="card-mokepon">
            <p>${cobymon.name}</p>
            <img src="${cobymon.photo}" alt="${cobymon.name}"/>
        </label>
    `;
    cardsContainer.innerHTML += cobymonsOptions

  })

  inputHipoge = document.getElementById('Hipoge')
  inputRatigueya = document.getElementById('Ratigueya')
  inputCapipepo = document.getElementById('Capipepo')
  inputLangostelvis = document.getElementById('Langostelvis')
  inputTucalpma = document.getElementById('Tucalpma')
  inputPydos = document.getElementById('Pydos')  

  playersPetButton.addEventListener('click', selectPlayerPet)
  fireAttackButton.addEventListener('click', attackFire)
  waterAttackButton.addEventListener('click', attackWater)
  earthAttackButton.addEventListener('click', attackEarth)
  resetButton.addEventListener('click', resetGame)    
}

//TODO: Add Attacks for each cobymon

function randomNumber (min, max ){
  return Math.floor(Math.random() * (max - min + 1) + min ) 
}

function selectPlayerPet(){    
    sectionAttack.style.display = 'flex'     
    sectionPet.style.display = 'none'

    if(inputHipoge.checked){
      petNamePlayer.innerHTML=inputHipoge.id
    } else if(inputRatigueya.checked){
      petNamePlayer.innerHTML = inputRatigueya.id
    } else if(inputCapipepo.checked){
      petNamePlayer.innerHTML=inputCapipepo.id
    } else if(inputLangostelvis.checked){
      petNamePlayer.innerHTML=inputLangostelvis.id
    } else if(inputTucalpma.checked){
      petNamePlayer.innerHTML = inputTucalpma.id
    } else if(inputPydos.checked){
      petNamePlayer.innerHTML = inputPydos.id
    } else {
      alert('You must select a pet ')
    }  
    selectEnemyPet()
}

function selectEnemyPet() {
  const numberPet = randomNumber(0,cobymons.length -1)  
  petNameEnemy.innerHTML = cobymons[numberPet].name;
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