//config inicial
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const Pessoa = require('./models/Pessoa') //acessando meu model



// forma de ler json / middl
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

//rota inicial / endpoint 
//rotas da API
app.post('/cadastro',async (req, res) =>{ //pq vou enviar dados 
    //uso async pq tenho que esperar o tempo x para chegar os dados

    //req.body o que eu espero que venha {nome:"diogo", cargo:"café", dtNasc: 2001-06-14}
    const{nome, cargo, dtNasc, endereco} = req.body //criei 3 variaveis com o descontruindo o body
    

    //criando validações

    if(!nome) {
        res.status(422).json({error: 'o nome é obrigatorio!'}) //quando o recurso nao foi criado com sucesso
    }

    //crio um objeto com todos os atributos que eu estrai da requisição
    let data = new Date("06 14 2001 ");
    let dataFormatada = (data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate() )) ;                
    const pessoa = {
        nome: "",
        cargo: "café",
        endereco: "rua dulce beatriz",
        dtNasc: dataFormatada
    }

    //adicionando uma entidade ao meu banco de dados
    
    //para fazer isso utilizo o try/catch pois a requisição pode falhar
    try{
        //vou esperar a requisiação terminar e crio meu dados com o objeto criado acima
        await Pessoa.create(pessoa)
        console.log("Dados inserido com sucesso")
        res.status(201).json({message: 'Funcionario inserido com sucesso', pessoa}) //dado criado com sucesso
    }catch(error){
        res.status(500).json({error: error}) //se houver algum error de servidor
    }

})

app.get('/home', (req, res) => {
    //requisição de buscar
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
