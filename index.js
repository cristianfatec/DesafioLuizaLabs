const express = require('express'); // Importa o módulo Express
const mongoose = require('mongoose');
require('dotenv').config();

const server = express(); // Cria uma instância do servidor Express

const funcionarioRoutes = require('./routes/funcionarioRoutes');

// Middleware
server.use(
    express.urlencoded({
        extended: true,
    })
);

server.use(express.json());

// Criando um endpoint para minhas APIs
server.use('/funcionario', funcionarioRoutes);

// Conexão com MongoDB Atlas antes da criação do dotenv
const DB_USER = 'cristianfatec';
const DB_PASSWORD = encodeURIComponent('DUKsblsEw5cdrXpB');
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@devweb2.cszmxqb.mongodb.net/?retryWrites=true&w=majority&appName=DevWeb2`
)
.then(() => {
    console.log('Conectado ao MongoDB!');
})
.catch((err) => {
    console.log(err);
});


server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});