//impotações
const mongoose = require('mongoose')
//import validator from "validar-telefone";   deu pau essa importação tambem



const router = require('express').Router()
const Funcionario = require('../models/Funcionario')//acessando meu model

router.post('/cadastrar', async (req, res) => { //pq vou enviar dados 
    //uso async pq tenho que esperar o tempo x para chegar os dados

    //req.body o que eu espero que venha {nome:"diogo", cargo:"café", dtNasc: 2001-06-14}
    const { nome, cargo, dtNasc, telefone, senha, cep, rua, numero, bairro, cidade, estado } = req.body //criei 3 variaveis com o descontruindo o body


    //criando validações
    
    //nome
    if (!nome) {
        res.status(400).json({ error: 'O nome é obrigatorio!' }) //quando o recurso nao foi criado com sucesso
        return //colo para ele parar aqui e nao passar para as outras verificações caso essa nao seja verdadeira
    }


    //cargo
    if (!cargo) {
        res.status(400).json({ error: 'O cargo é obrigatorio!' }) //quando o recurso nao foi criado com sucesso
        return
    }

    //data de nascimento
    if (!dtNasc) {
        res.status(400).json({ error: 'É obrigatorio informar a idade' }) //quando o recurso nao foi criado com sucesso
        return
    }
    else{
        var dataAtual = new Date()

        var dataUser = new Date(dtNasc)

        var verificaIdade = verificaIdades(dataUser)

        function verificaIdades(dataUser = new Date()) {
            var dataAtual = new Date()
            if ((dataAtual.getFullYear() - dataUser.getFullYear() == 18)) {
                if ((dataUser.getMonth() + 1) >= (dataAtual.getMonth() + 1)) {
                    if ((dataUser.getDate() > dataAtual.getDate())) {
                        res.status(400).json({ error: 'O funcionario nao pode ser menor de idade' })
                        return
                    }
                    
                }
            } else if ((dataAtual.getFullYear() - dataUser.getFullYear() < 18)) {
                res.status(400).json({ error: 'O funcionario nao pode ser menor de idade' })
                return
            }
        }
    }

    //telefone utlizo uma biblioteca para validar o telefone
    // if(!validator(telefone) ){
    //     res.status(400).json({ error: 'É necessario um telefone válido!' })
    // }

    //senha : sem validação, criação do usuario
    if(!senha ){
        res.status(400).json({ error: 'É obrigatorio uma senha!' }) //colocar um minimo de caracter
        return
    }
    
    //cep
    if(!cep){
        res.status(400).json({ error: 'É obrigatorio um cep válido!' })
        return
    }

    //bairro
    if(!bairro){
        res.status(400).json({ error: 'É obrigatorio escre' })
        return
    }
    






    //crio um objeto com todos os atributos que eu estrai da requisição
    // let data = new Date("06 14 2001 ");
    // let dataFormatada = (data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate()));

    let nomeCompleto = nome.split(" ")
    let login = `${nomeCompleto[0]}.${nomeCompleto[1]}`

    let endereco = {
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
    }

    const funcionario = {
        nome,
        cargo,
        endereco,
        dtNasc,
        telefone,
        senha,
        login
    }

    //adicionando uma entidade ao meu banco de dados

    //para fazer isso utilizo o try/catch pois a requisição pode falhar
    try {
        //vou esperar a requisiação terminar e crio meu dados com o objeto criado acima
        await Funcionario.create(funcionario)
        console.log("Dados inserido com sucesso")
        res.status(201).json({ message: 'Funcionario inserido com sucesso', funcionario }) //dado criado com sucesso
  
    } catch (error) {
        res.status(500).json({ error: error }) //se houver algum error de servidor
        return
    }

})

//leitura de dados
router.get('/funcionarios', async (req, res) => {
    //console.log("chegou ate aqui")
    try {
        const funcionario = await Funcionario.find() // buscar meus dados

        res.status(200).json(funcionario)

    } catch (error) {
        res.status(500).json({ error: error }) //se houver algum error de servidor
        return
    }
})

router.get('/funcionarios/:id', async(req, res) =>{ //buscar funcionarios pelo id
    
    //extrair o dado da requisição
    const id = req.params.id
    if (!mongoose.isValidObjectId(id)) return Error({ status: 422 })  //tento transformar em um objeto id aqui


    //console.log("busca id")
    try{
        const funcionario = await Funcionario.findOne({_id: id}) //porcurando no meu banco o funcionario pelo id
        res.status(200).json(funcionario)
        
        if(!funcionario){
            res.status(400).json({message: "funcionario nao encontrado"})
            return
        }

    }catch(error){
        res.status(500).json({ error: error })
        return
    }
})


//atualização de dados(PUT, PATCH)

//patch atualização parcial nos meu dados do funcionario
router.patch('/atualizar/:id', async(req, res) =>{
    console.log("entrou aq")
    //extrair o dado da requisição
    const id = req.params.id
    if (!mongoose.isValidObjectId(id)) return Error({ status: 422 }) ////tento transformar em um objeto id aqui

    const { nome, cargo, dtNasc, telefone, senha, cep, rua, numero, bairro, cidade, estado } = req.body

    let endereco = {
        cep,
        rua,
        numero,
        bairro,
        cidade,
        estado
    }

    const funcionario = {
        nome,
        cargo,
        endereco,
        dtNasc,
        telefone,
        senha
   
    }

    try{

        const atualizarFuncionario = await Funcionario.updateOne({_id:id}, funcionario)
        
        if(atualizarFuncionario.matchedCount ===0 ){ //valido se o usuario existe ou nao 
            res.status(400).json({message: "funcionario nao encontrado"})
            return
        }

        res.status(200).json(funcionario)

    }catch{
        
        res.status(400).json({ error: "funcionario nao encontrado" })
        return
    }
})



//deletar funcionarios

router.delete("/deletar/:id", async(req, res) =>{
    const id =  req.params.id
    
    const funcionario = await Funcionario.findOne({_id: id}) //procurando no meu banco o funcionario pelo id
    if(!funcionario){
        res.status(400).json({message: "funcionario nao encontrado"})
        return
    }
    if (!mongoose.isValidObjectId(id)) return Error({ messae: "error"}) ////tento transformar em um objeto id aqui


    try{

        
        await Funcionario.deleteOne({_id:id})
        res.status(200).json({message: "Funcionario excluido com sucesso!"})

    }catch(error){
        res.status(500).json({error: error})
    }

})

module.exports = router