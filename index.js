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
    console.log(players)
    res.end()
} )

app.listen(8080, () => {
    console.log('started server')
})