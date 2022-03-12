//config inicial
const mongoose = require('mongoose')
const express = require('express')
const app = express()




// forma de ler json / middl
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

//rotas da API
const funcionarioRoutes = require('./routes/funcionarioroutes')
app.use('/cadastro', funcionarioRoutes)

//rota inicial / endpoint 
app.get('/', (req, res) => { //requisição de buscar
    //mostrar req
    res.json({ message: "funcionou a busca" }) //minha respota para minha requisição '/' vai ser em json
})



// entregar uma porta
const DB_USER = 'diogolimalucas'
const DB_PASSWORD = encodeURIComponent("12345")
mongoose.
    connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apibackendapp.z8eom.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
    .then(() => {  //quando a conexão da certo
        console.log("200, conectado ao MongoDb")
        app.listen(3000) //escutar a porta 3000
    })
    .catch((err) => console.log(err)) // quando a conexão nao foi estabelecida
