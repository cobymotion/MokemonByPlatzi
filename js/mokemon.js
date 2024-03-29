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
let cobyEnemymons = []
let playerId = null 
let enemyId = null
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

let widthMap = window.innerWidth - 20 

if(widthMap>800){
    widthMap = 680;
}

let heightMap = widthMap * 600 / 900

map.width = widthMap
map.height = heightMap


class Cobymon {

  constructor(name, photo, life, photomap, id=null){
    this.id = id
    this.name = name
    this.photo = photo
    this.life = life
    this.attacks = []
    this.width = 40
    this.height = 40
    this.x = randomNumber(0,widthMap - this.width)
    this.y = randomNumber(0,heightMap - this.height)
    this.mapImage = new Image()
    this.mapImage.src = photomap
    this.speedX = 0
    this.speedY = 0
  }

  drawMokemon() {
    canvas2d.drawImage(this.mapImage, this.x,this.y,this.width,this.height)
  }
  

}

const hipoge = new Cobymon('Hipoge','/assets/poke1.png',5, '/assets/poke1.png')
const capipepo = new Cobymon('Capipepo','/assets/poke2.png',5,'/assets/poke2.png')
const ratigueya = new Cobymon('Ratigueya','/assets/poke3.png',5,'/assets/poke3.png')
const langostelvis = new Cobymon('Langostelvis','/assets/poke4.png',5,'/assets/poke4.png')
const tucalpma = new Cobymon('Tucalpma','/assets/poke5.png',5,'/assets/poke5.png')
const pydos = new Cobymon('Pydos','/assets/poke6.png',5,'/assets/poke6.png')

// attacks 

const ATTACK_HIPOGE = [
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
]

const ATTACK_CAPIPEPO = [
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
]

const ATTACK_RATIGUEYA = [
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
]

const ATTACK_LANGOSTELVIS = [
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
]

const ATTACK_TUCALPMA = [
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
]

const ATTACK_PYDOS = [
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'🌱', id:'button-earth'},
  {nombre:'💧', id:'button-water'},
  {nombre:'🔥', id:'button-fire'}
]

hipoge.attacks.push(...ATTACK_HIPOGE)
capipepo.attacks.push(...ATTACK_CAPIPEPO)
ratigueya.attacks.push(...ATTACK_RATIGUEYA)
langostelvis.attacks.push(...ATTACK_LANGOSTELVIS)
tucalpma.attacks.push(...ATTACK_TUCALPMA)
pydos.attacks.push(...ATTACK_PYDOS)

cobymons.push(hipoge, capipepo,ratigueya,langostelvis,tucalpma,pydos)

// Enemies


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
  
  joinToGame();
}

function joinToGame(){
    fetch('http://localhost:8080/join')
        .then(function (res) {
            console.log(res);
            if(res.ok){
                res.text()
                .then(function(data){
                    console.log(data)
                    playerId = data
                })
            }
        })
}

function randomNumber (min, max ){
  return Math.floor(Math.random() * (max - min + 1) + min ) 
}

function selectPlayerPet(){    
        
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

    sendSelectedPet(petSelected)

    startMap()
    extractAttacks(petPlayer); 
    
}

function sendSelectedPet(petSelected){
  fetch(`http://localhost:8080/mokemon/${playerId}`,{
    method:'post',
    headers:{'Content-type':'application/json'},
    body: JSON.stringify(petSelected)
  } 
  )
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
      if(playerAttacks.length==5){
        sendAttacks();
      }
      
    })
  })
}

function sendAttacks() {
    console.log("Envio de ataques                                     -----------------------------------------")
    console.log(playerAttacks)
    fetch(`http://localhost:8080/mokemon/${playerId}/attacks`,{
      method:'post',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify({attacks: playerAttacks})		
	});

  interval = setInterval(getAttacksEnemy, 50);
}

function getAttacksEnemy(){
  fetch(`http://localhost:8080/mokemon/${enemyId}/attacks`)
  .then(function (res) {
    if(res.ok){
      res.json().then(function({attacks}){
          if(attacks.length==5){ 
            enemyAttacks = attacks
            combat();
          }
      })
    }
  })
}

function selectEnemyPet(enemy) {
  petNameEnemy.innerHTML = enemy.name;
  enemyAttackNumber = enemy.attacks;
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
  clearInterval(interval);
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
    petSelected.drawMokemon()
    sendPosition(petSelected.x,petSelected.y)
    console.log("----------------------------")
    console.log(cobyEnemymons)
    console.log("----------------------------")
    cobyEnemymons.forEach(function (mokeponItem){
      if(mokeponItem){
        mokeponItem.drawMokemon()      
        checkCollision(mokeponItem)
      }
    })    
}

function sendPosition(x,y){
  fetch(`http://localhost:8080/mokemon/${playerId}/positions`,{
    method:'post',
    headers:{'Content-type':'application/json'},
    body: JSON.stringify({
      x,
      y
    })
  } 
  ).then(function(res){
    if(res.ok){
       res.json()
       .then(function({enemys}){          
            cobyEnemymons =  enemys.map(function(enemy){                      
            let mokemonName = enemy.mokemon?.nombre ?? "";
            let mokemonEnemy=null
            console.log(mokemonName)
            if(mokemonName==="Hipoge"){
                mokemonEnemy = new Cobymon('Hipoge','/assets/poke1.png',5, '/assets/poke1.png', enemy.id)
            } else if(mokemonName==="Capipepo"){
                mokemonEnemy = new Cobymon('Capipepo','/assets/poke2.png',5,'/assets/poke2.png', enemy.id)
            } else if(mokemonName==="Ratigueya"){
                mokemonEnemy=new Cobymon('Ratigueya','/assets/poke3.png',5,'/assets/poke3.png', enemy.id)
            } else if(mokemonName==="Langostelvis"){
                mokemonEnemy=new Cobymon('Langostelvis','/assets/poke4.png',5,'/assets/poke4.png', enemy.id)
            } else if(mokemonName==="Tucalpma"){
                mokemonEnemy=new Cobymon('Tucalpma','/assets/poke5.png',5,'/assets/poke5.png', enemy.id)
            } else if(mokemonName==="Pydos"){
                mokemonEnemy=new Cobymon('Pydos','/assets/poke6.png',5,'/assets/poke6.png', enemy.id)
            }
            console.log(mokemonEnemy)
            if(mokemonEnemy!=null){
                console.log("pinto")
                mokemonEnemy.x = enemy.x;
                mokemonEnemy.y = enemy.y;
                return mokemonEnemy            
            }          
          })
       })
    }
  })

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
    
    
    interval = setInterval(drawMap, 50)
    window.addEventListener('keydown', pressedKey)
    window.addEventListener('keyup', stopped)
}

function checkCollision(enemy){
    const upEnemy = enemy.y
    const downEnemy = enemy.y + enemy.height
    const leftEnemy = enemy.x 
    const rightEnemy = enemy.x + enemy.width
    /// 
    const upPet = petSelected.y
    const downPet = petSelected + petSelected.height
    const leftPet = petSelected.x 
    const rightPet = petSelected.x + petSelected.width

    if(downPet < upEnemy || upPet > downEnemy || rightPet < leftEnemy || leftPet > rightEnemy){
        return;
    }else {
        stopped();
        clearInterval(interval);
		    enemyId = enemy.id
        showMapSection.style.display = 'none'
        sectionAttack.style.display = 'flex' 
        selectEnemyPet(enemy)
    }
}

window.addEventListener('load', startGame)