

document.getElementById('formLogin').onsubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const nome = form.nome.value;
  const senha = form.senha.value;
 
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
  // Redirect based on role
  // append nome to redirect so site can show personalized message
  const nomeParam = encodeURIComponent(nome);
  if (resultado.tipo === 'medico') {
    window.location.href = `site_medico.html?nome=${nomeParam}`;
  } else {
    window.location.href = `site.html?nome=${nomeParam}`;
  }
};
