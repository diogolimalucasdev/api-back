//aqui eu vou criar uma entidade Funcionario
const mongoose = require('mongoose') // importei o mongoose

//criando a entidade

const Funcionario = mongoose.model('Funcionario',{
    nome: String,
    cargo: String,
    dtNasc: String,
    endereco: Object,
    telefone: Number,
    senha: String,
    login: String


})
module.exports = Funcionario //exportando o meu model Funcionario