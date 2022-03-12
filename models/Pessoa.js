//aqui eu vou criar uma entidade Pessoa
const mongoose = require('mongoose') // importei o mongoose

//criando a entidade

const Pessoa = mongoose.model('Pessoa',{
    nome: String,
    cargo: String,
    dtNasc: Date,
    endereco: String

})
module.exports = Pessoa //exportando o meu model Pessoa