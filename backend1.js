const express = require('express');
const app = express();

app.use(express.json());

const pessoas = [];

app.post('/registrar', (req, res) => {
  const { nome, tipo, especialidade } = req.body;

  if (tipo !== 'medico' && tipo !== 'cliente') {
    return res.status(400).json({ erro: 'Tipo inválido' });
  }

  

  pessoas.push(pessoa);
  res.status(201).json({ mensagem: 'Pessoa registrada com sucesso!', pessoa });
});

app.get('/pessoas', (req, res) => {
  res.json(pessoas);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});

const pessoa = {
  nome: form.nome.value,
  tipo: form.tipo.value,
  especialidade: form.tipo.value === 'medico' ? form.especialidade.value : null,
  senha: form.senha.value 
};