// login.js

document.getElementById('formLogin').onsubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const nome = form.nome.value;
  const senha = form.senha.value;
  // Envia para o backend para validação
  const res = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, senha })
  });
  const resultado = await res.json();
  if (!resultado.success) {
    document.getElementById('mensagem').innerText = resultado.message || 'Usuário ou senha incorretos.';
    return;
  }
  // Redireciona para site.html se login for bem-sucedido
  window.location.href = 'site.html';
};
