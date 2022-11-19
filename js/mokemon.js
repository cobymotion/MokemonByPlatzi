const sectionAttack = document.getElementById('select-attack')
const sectionRestart = document.getElementById('reload')
const playersPetButton = document.getElementById('button-pets')
const resetButton = document.getElementById('button-restart')
const sectionPet = document.getElementById('select-pet')
const petNamePlayer = document.getElementById('petNamePlayer')
const petNameEnemy = document.getElementById('petNameEnemy')
const msgPlayerAttack = document.getElementById('msgPlayerAttack')
const msgEnemyAttack = document.getElementById('msgEnemyAttack')
const spanPlayerLifes = document.getElementById('playerLifes')
const spanEnemyLifes = document.getElementById('enemyLifes')  
const messageSection = document.getElementById('msgResult')  
const cardsContainer = document.getElementById('cards-container')  
const attacksContainer = document.getElementById('div-attacks');
const showMapSection = document.getElementById('show-map')
const mapCanvas = document.getElementById('map')

const mapBackground = new Image()
mapBackground.src = '../assets/mokemap.png'

const cobymons = []
let buttons = [] 
let cobymonsOptions
let playerAttack 
let playerAttacks = []
let enemyAttack
let enemyAttacks = []
let enemyAttackNumber
let playerVictories = 0
let enemyVictories = 0
let petPlayer
let attacksHtml

let inputHipoge 
let inputRatigueya 
let inputCapipepo 
let inputLangostelvis 
let inputTucalpma
let inputPydos 

let canvas2d = mapCanvas.getContext("2d")
let interval 
let petSelected


class Cobymon {

  constructor(name, photo, life){
    this.name = name
    this.photo = photo
    this.life = life
    this.attacks = []
    this.x = 20
    this.y = 30 
    this.width = 60
    this.height = 60
    this.mapImage = new Image()
    this.mapImage.src = photo
    this.speedX = 0
    this.speedY = 0
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
  showMapSection.style.display = 'none'

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
  resetButton.addEventListener('click', resetGame)    
}


function randomNumber (min, max ){
  return Math.floor(Math.random() * (max - min + 1) + min ) 
}

function selectPlayerPet(){    
    //sectionAttack.style.display = 'flex'     
    showMapSection.style.display = 'flex'
    sectionPet.style.display = 'none'

    if(inputHipoge.checked){
      petNamePlayer.innerHTML=inputHipoge.id
      petPlayer = inputHipoge.id
      petSelected = hipoge
    } else if(inputRatigueya.checked){
      petNamePlayer.innerHTML = inputRatigueya.id
      petPlayer = inputRatigueya.id
      petSelected = ratigueya
    } else if(inputCapipepo.checked){
      petNamePlayer.innerHTML=inputCapipepo.id
      petPlayer = inputCapipepo.id
      petSelected = capipepo
    } else if(inputLangostelvis.checked){
      petNamePlayer.innerHTML=inputLangostelvis.id
      petPlayer = inputLangostelvis.id
      petSelected = langostelvis
    } else if(inputTucalpma.checked){
      petNamePlayer.innerHTML = inputTucalpma.id
      petPlayer = inputTucalpma.id
      petSelected = tucalpma
    } else if(inputPydos.checked){
      petNamePlayer.innerHTML = inputPydos.id
      petPlayer = inputPydos.id
      petSelected = pydos
    } else {
      alert('You must select a pet ')
      resetGame()
      return;
    }  
    startMap()

    selectEnemyPet()
    extractAttacks(petPlayer); 
    
}

function extractAttacks(petPlayer){
  let attacks; 
  for(let i=0;i< cobymons.length;i++){
    if(petPlayer === cobymons[i].name){
      attacks = cobymons[i].attacks;
    }
  }
  showAttacks(attacks);
}

function showAttacks(attacks){
  attacksHtml = ''
  attacks.forEach((attack)=>{
    attacksHtml += `
      <button id="${attack.id}" class="btn-attack btn-attack-code">${attack.nombre}</button>`;            
  })
  attacksContainer.innerHTML = attacksHtml;
  
  buttons = document.querySelectorAll('.btn-attack-code')
  attacksSequence();
}

function attacksSequence(){
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const textContent = e.target.textContent
      switch(textContent){
        case "🔥":
          playerAttacks.push('FIRE')
          button.style.background='#112f58'
          button.disabled=true
          break;
        case "💧":
          playerAttacks.push('WATER')
          button.style.background='#112f58'
          button.disabled=true
        break;
        case "🌱":
          playerAttacks.push('EARTH')
          button.style.background='#112f58'
          button.disabled=true
        break;
      }
      randomSelectEnemyAttack();
    })
  })
}

function selectEnemyPet() {
  const numberPet = randomNumber(0,cobymons.length -1)  
  petNameEnemy.innerHTML = cobymons[numberPet].name;
  enemyAttackNumber = cobymons[numberPet].attacks;
}


function randomSelectEnemyAttack() {
  const attackNumber = randomNumber(0,enemyAttackNumber.length-1)
  if(attackNumber == 0 || attackNumber==1){
    enemyAttacks.push("FIRE")
  } else if(attackNumber==3 || attackNumber==4){
    enemyAttacks.push("WATER")
  } else {
    enemyAttacks.push("EARTH")
  }
  startCombat()
}

function startCombat(){
  if(enemyAttacks.length==5 || playerAttacks.length==5){
    combat()
  }
}

function updateMessages(){
  
  const phrasePlayerAttack = document.createElement('p'); 
  const phraseEnemyAttack = document.createElement('p'); 

  phrasePlayerAttack.innerHTML = playerAttack
  phraseEnemyAttack.innerHTML = enemyAttack
  
  msgPlayerAttack.appendChild(phrasePlayerAttack)
  msgEnemyAttack.appendChild(phraseEnemyAttack)
  spanPlayerLifes.innerHTML = playerVictories
  spanEnemyLifes.innerHTML = enemyVictories 
}

function combat() {
  playerVictories = 0
  enemyVictories = 0
  for(let i=0;i<playerAttacks.length; i++){
    playerAttack = playerAttacks[i]
    enemyAttack = enemyAttacks[i]
    console.log(playerAttack + " - " + enemyAttack)
    if(playerAttack == enemyAttack){
      console.log("Draw") 
    } else if((playerAttack=='FIRE' && enemyAttack=='EARTH')
              || (playerAttack=='EARTH' && enemyAttack=='WATER')
              || (playerAttack=='WATER' && enemyAttack=='FIRE')){
                playerVictories++   
                console.log('Won 🎉')            
              }
              else {
                enemyVictories++ 
                console.log('LOST 😵')
              }
    updateMessages()
  }
  checkVictories()
}

function checkVictories(){
  if(playerVictories>enemyVictories){
    messageFinal("Congratulation!! You won")    
  } else if(playerVictories==enemyVictories)
  {
    messageFinal("Draw, Luck for the next")
  }
  else {
    messageFinal("Auch!! You lost")
  }
}


function messageFinal(resultEnd){
  messageSection.innerHTML = resultEnd    
  sectionRestart.style.display = 'block' 
}

function resetGame(){
  location.reload()
}

function drawMap(){
  petSelected.x = petSelected.x + petSelected.speedX
  petSelected.y = petSelected.y + petSelected.speedY
  canvas2d.clearRect(0,0,map.width, map.height)
  canvas2d.drawImage(mapBackground, 0,0, map.width, map.height)
  canvas2d.drawImage(petSelected.mapImage, petSelected.x,petSelected.y,petSelected.width,petSelected.height)
}

function movePetRight(){
  petSelected.speedX = 5
} 

function movePetLeft(){
  petSelected.speedX = -5
}

function movePetUp(){
  petSelected.speedY = -5
}

function movePetDown(){
  petSelected.speedY = 5
}

function stopped(){
  petSelected.speedX = 0
  petSelected.speedY = 0
}

function pressedKey(event){
  switch(event.key){
    case 'a':
    case 'A':
    case 'ArrowLeft':
      movePetLeft();
      break;
    case 'w':
    case 'W':
    case 'ArrowUp':
      movePetUp();
      break;
    case 's':
    case 'S':
    case 'ArrowDown':
      movePetDown();
      break;
    case 'd':
    case 'D':
    case 'ArrowRight':
      movePetRight();
      break;
  }
}

function startMap(){
    
    map.width = 700
    map.height = 460
  intervalo = setInterval(drawMap, 50)
  window.addEventListener('keydown', pressedKey)
  window.addEventListener('keyup', stopped)
}

window.addEventListener('load', startGame)