const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let professores = [
  {
    id: "1",
    nome: "Prof. Carlos",
    idade: 40,
    departamento: "Matemática",
    turmas: [
      {
        codigo: "9A",
        disciplina: "MAT101",
        alunos: ["João", "Maria", "Pedro"]
      },
      {
        codigo: "10A",
        disciplina: "MAT201",
        alunos: ["Ana", "Luiz"]
      }
    ]
  },
  {
    id: "2",
    nome: "Prof. Ana",
    idade: 35,
    departamento: "História",
    turmas: [
      {
        codigo: "9A",
        disciplina: "HIS101",
        alunos: ["João", "Pedro"]
      },
      {
        codigo: "10B",
        disciplina: "HIS201",
        alunos: ["Maria", "Carlos", "Luiza"]
      }
    ]
  },
  {
    id: "3",
    nome: "Prof. João",
    idade: 50,
    departamento: "Ciências",
    turmas: [
      {
        codigo: "9A",
        disciplina: "CIE101",
        alunos: ["João", "Maria"]
      },
      {
        codigo: "9B",
        disciplina: "CIE101",
        alunos: ["Pedro", "Luiz"]
      }
    ]
  }
];


app.get('/', (req, res) => {
  res.json({ 
    mensagem: "API de Gerenciamento de Professores está funcionando!",
    endpoints: [
      "GET /professores",
      "GET /professores/:id",
      "GET /professores/:id/turmas",
      "PUT /professores/:id",
      "POST /professores/:id/turmas",
      "GET /professores/departamento/:departamento",
      "DELETE /professores/:id"
    ]
  });
});


app.get('/professores/departamento/:departamento', (req, res) => {
  const { departamento } = req.params;
  
  const professoresDoDepartamento = professores.filter(
    p => p.departamento.toLowerCase() === departamento.toLowerCase()
  );
  
  if (professoresDoDepartamento.length === 0) {
    return res.status(404).json({ 
      mensagem: "Nenhum professor encontrado neste departamento" 
    });
  }
  
  res.json(professoresDoDepartamento);
});


app.get('/professores', (req, res) => {
  res.json(professores);
});


app.get('/professores/:id', (req, res) => {
  const { id } = req.params;
  const professor = professores.find(p => p.id === id);
  
  if (!professor) {
    return res.status(404).json({ mensagem: "Professor não encontrado" });
  }
  
  res.json(professor);
});


app.get('/professores/:id/turmas', (req, res) => {
  const { id } = req.params;
  const professor = professores.find(p => p.id === id);
  
  if (!professor) {
    return res.status(404).json({ mensagem: "Professor não encontrado" });
  }
  
  res.json(professor.turmas);
});


app.put('/professores/:id', (req, res) => {
  const { id } = req.params;
  const { nome, idade, departamento } = req.body;
  
  const professorIndex = professores.findIndex(p => p.id === id);
  
  if (professorIndex === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }
  
  
  if (nome) professores[professorIndex].nome = nome;
  if (idade) professores[professorIndex].idade = idade;
  if (departamento) professores[professorIndex].departamento = departamento;
  
  res.json(professores[professorIndex]);
});


app.post('/professores/:id/turmas', (req, res) => {
  const { id } = req.params;
  const { codigo, disciplina, alunos } = req.body;
  
  const professor = professores.find(p => p.id === id);
  
  if (!professor) {
    return res.status(404).json({ mensagem: "Professor não encontrado" });
  }
  
  const novaTurma = {
    codigo,
    disciplina,
    alunos: alunos || []
  };
  
  professor.turmas.push(novaTurma);
  
  res.status(201).json({
    mensagem: "Turma adicionada com sucesso",
    turma: novaTurma
  });
});

app.delete('/professores/:id', (req, res) => {
  const { id } = req.params;
  
  const professorIndex = professores.findIndex(p => p.id === id);
  
  if (professorIndex === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }
  
  const professorRemovido = professores.splice(professorIndex, 1);
  
  res.json({
    mensagem: "Professor removido com sucesso",
    professor: professorRemovido[0]
  });
});


app.use((req, res) => {
  res.status(404).json({ mensagem: "Rota não encontrada" });
});


app.listen(PORT, () => {
  console.log(' Servidor rodando com sucesso!');
  console.log(` Porta: ${PORT}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log('Endpoints disponíveis:');
  console.log('  GET    /professores');
  console.log('  GET    /professores/:id');
  console.log('  GET    /professores/:id/turmas');
  console.log('  PUT    /professores/:id');
  console.log('  POST   /professores/:id/turmas');
  console.log('  GET    /professores/departamento/:departamento');
  console.log('  DELETE /professores/:id');
  
});