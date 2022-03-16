//impotações
import validator from "validar-telefone";



const router = require('express').Router()
const Funcionario = require('../models/Funcionario')
const Pessoa = require('../models/Funcionario') //acessando meu model

router.post('/', async (req, res) => { //pq vou enviar dados 
    //uso async pq tenho que esperar o tempo x para chegar os dados

    //req.body o que eu espero que venha {nome:"diogo", cargo:"café", dtNasc: 2001-06-14}
    const { nome, cargo, dtNasc, telefone, senha, cep, rua, numero, bairro, cidade, estado } = req.body //criei 3 variaveis com o descontruindo o body


    //criando validações
    
    //nome
    if (!nome) {
        res.status(400).json({ error: 'O nome é obrigatorio!' }) //quando o recurso nao foi criado com sucesso
    }


    //cargo
    if (!cargo) {
        res.status(400).json({ error: 'O cargo é obrigatorio!' }) //quando o recurso nao foi criado com sucesso
    }

    //data de nascimento
    if (!dtNasc) {
        res.status(400).json({ error: 'É obrigatorio informar a idade' }) //quando o recurso nao foi criado com sucesso
    }
    else{
        var dataAtual = new Date()

        var dataUser = new Date(dtNasc)

        var verificaIdade = verificaIdade(dataUser)

        function verificaIdade(dataUser = new Date()) {
            var dataAtual = new Date()
            if ((dataAtual.getFullYear() - dataUser.getFullYear() == 18)) {
                if ((dataUser.getMonth() + 1) >= (dataAtual.getMonth() + 1)) {
                    if ((dataUser.getDate() > dataAtual.getDate())) {
                        res.status(400).json({ error: 'O funcionario nao pode ser menor de idade' })
                    }
                }
            } else if ((dataAtual.getFullYear() - dataUser.getFullYear() < 18)) {
                res.status(400).json({ error: 'O funcionario nao pode ser menor de idade' })
            }
        }
    }

    //telefone utlizo uma biblioteca para validar o telefone
    if(!validator(telefone) ){
        res.status(400).json({ error: 'É necessario um telefone válido!' })
    }

    //senha : sem validação, criação do usuario
    if(!senha ){
        res.status(400).json({ error: 'É obrigatorio uma senha!' }) //colocar um minimo de caracter
    }
    
    //cep
    if(!cep){
        res.status(400).json({ error: 'É obrigatorio um cep válido!' })
    }

    //bairro
    if(!bairro){
        res.status(400).json({ error: 'É obrigatorio escre' })
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
    }

})

//leitura de dados
router.get('/', async (req, res) => {
    try {
        const pessoas = await Pessoa.find() // buscar meus dados

        res.status(200).json(pessoas)

    } catch (error) {
        res.status(500).json({ error: error }) //se houver algum error de servidor
    }
})

module.exports = router