const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors());
app.use(express.json())

const players = []

class Player{
    constructor(id){
        this.id = id
    }

    setMokepon(mokemon){
        this.mokemon = mokemon
    }

    updatePosition(x,y){ 
        this.x = x
        this.y = y
    }
}

class Mokepon{
    constructor(nombre)
    {
        this.nombre = nombre 
    }
}

app.get('/join',(req,res)=>{
    const id = `${Math.random()}`
    const player = new Player(id)
    player.updatePosition(1,1)
    players.push(player)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send(id)
})

app.post('/mokemon/:playerId', (req,res) => {
    const playerId = req.params.playerId || ''
    const mokemonObj = req.body || ''
    const mokemon = new Mokepon(mokemonObj.name)
    const playerIndex = players.findIndex((player) => player.id === playerId)
    if(playerIndex>=0){
        players[playerIndex].setMokepon(mokemon)
    } else {
        console.log('No existe el usaurio')
    }    
    res.end()
} )

app.post('/mokemon/:playerId/:positions', (req,res) => {
    const playerId = req.params.playerId || ''
    const x = req.body.x || 0
    const y = req.body.y || 0
    const playerIndex = players.findIndex((player) => player.id === playerId)
    if(playerIndex>=0){
        players[playerIndex].updatePosition(x,y)
    } else {
        console.log('No existe el usaurio')
    }

    const enemys = players.filter((player) => player.id !== playerId)   
    console.log("-----------------------------------------------")
    console.log(enemys)
    res.send({enemys})

});

app.listen(8080, () => {
    console.log('started server')
})