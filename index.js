const express = require('express'); 
const mongoose = require('mongoose');
require('dotenv').config();

const server = express(); 

const funcionarioRoutes = require('./routes/funcionarioRoutes');

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Criando um endpoint para minhas APIs
server.use('/funcionario', funcionarioRoutes);

// Conexão com MongoDB Atlas usando dotenv
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const DB_NAME = process.env.DB_NAME;
mongoose.connect(
    // `mongodb+srv://${DB_USER}:${DB_PASSWORD}@devweb2.cszmxqb.mongodb.net/?retryWrites=true&w=majority&appName=DevWeb2`,
    
    `mongodb+srv://cristianfatec:DUKsblsEw5cdrXpB@devweb2.cszmxqb.mongodb.net/?retryWrites=true&w=majority&appName=DevWeb2`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
.then(() => {
    console.log('Conectado ao MongoDB!');
})
.catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

console.log(`DB_USER: ${process.env.DB_USER}`);
console.log(`DB_PASSWORD: ${process.env.DB_PASSWORD}`);
console.log(`DB_NAME: ${process.env.DB_NAME}`);


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
