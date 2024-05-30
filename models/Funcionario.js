const mongoose = require('mongoose');

const FuncionarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cargo: {
        type: String,
        required: true
    },
    salario: {
        type: Number,
        required: true
    },
    desligado: {
        type: Boolean,
        required: true
    }
});

const Funcionario = mongoose.model('Funcionario', FuncionarioSchema);

module.exports = Funcionario;
