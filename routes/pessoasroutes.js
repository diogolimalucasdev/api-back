const router = require('express').Router()
const Pessoa = require('../models/Pessoa') //acessando meu model

router.post('/',async (req, res) =>{ //pq vou enviar dados 
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
        nome,
        cargo,
        endereco,
        dtNasc
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

module.exports = router