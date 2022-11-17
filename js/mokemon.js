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

//TODO: Add Attacks for each cobymon

function randomNumber (min, max ){
  return Math.floor(Math.random() * (max - min + 1) + min ) 
}

function selectPlayerPet(){    
    //sectionAttack.style.display = 'flex'     
    showMapSection.style.display = 'flex'
    sectionPet.style.display = 'none'

    let imagePet = new Image()
    imagePet.src = capipepo.photo
    canvas2d.drawImage(imagePet, 20,20,100,100)

    if(inputHipoge.checked){
      petNamePlayer.innerHTML=inputHipoge.id
      petPlayer = inputHipoge.id
    } else if(inputRatigueya.checked){
      petNamePlayer.innerHTML = inputRatigueya.id
      petPlayer = inputRatigueya.id
    } else if(inputCapipepo.checked){
      petNamePlayer.innerHTML=inputCapipepo.id
      petPlayer = inputCapipepo.id
    } else if(inputLangostelvis.checked){
      petNamePlayer.innerHTML=inputLangostelvis.id
      petPlayer = inputLangostelvis.id
    } else if(inputTucalpma.checked){
      petNamePlayer.innerHTML = inputTucalpma.id
      petPlayer = inputTucalpma.id
    } else if(inputPydos.checked){
      petNamePlayer.innerHTML = inputPydos.id
      petPlayer = inputPydos.id
    } else {
      alert('You must select a pet ')
      resetGame()
      return;
    }  
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

window.addEventListener('load', startGame)