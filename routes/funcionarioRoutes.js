const router = require('express').Router();
const Funcionario = require('../models/Funcionario');

// Listar todas as informações de todos os funcionários
router.get('/', async (req, res) => {
    try {
        const funcionarios = await Funcionario.find();
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// Listar todas as informações de um funcionário específico
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const funcionario = await Funcionario.findById(id);
        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ error });
    }
});

// POST (INSERT) Inserindo um novo funcionário no MongoDB
router.post('/', async (req, res) => {
    const { nome, cargo, salario, desligado } = req.body;
    if (!nome || !cargo || !salario || desligado === undefined) {
        return res.status(422).json({ error: 'Informar o nome, cargo, salário e desligado é obrigatório' });
    }

    const funcionario = {
        nome,
        cargo,
        salario,
        desligado,
    };

    try {
        await Funcionario.create(funcionario);
        res.status(201).json({ message: 'Funcionário cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

/// Atualizar um funcionário específico
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!updates || Object.keys(updates).length === 0) {
        return res.status(422).json({ error: 'Dados de atualização são obrigatórios' });
    }

    try {
        const funcionario = await Funcionario.findByIdAndUpdate(id, updates, { new: true });
        if (!funcionario) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        res.status(200).json({ message: 'Funcionário atualizado com sucesso!', funcionario });
    } catch (error) {
        res.status(500).json({ error });
    }
});

// DELETE (Excluir um funcionário específico pelo nome)
router.delete('/', async (req, res) => {
    const { nome } = req.body;

    if (!nome) {
        return res.status(422).json({ error: 'Informar o nome é obrigatório' });
    }

    try {
        const result = await Funcionario.deleteOne({ nome: nome });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Funcionário não encontrado' });
        }
        res.status(200).json({ message: 'Funcionário excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
