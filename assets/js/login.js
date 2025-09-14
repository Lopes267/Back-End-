const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.onsubmit = async function (e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('#email').value.trim().toLowerCase();
    const senha = form.querySelector('#password').value;

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });

      const resultado = await res.json();

      // 🔍 Debug no navegador
      console.log("Resposta /login:", res.status, resultado);

      if (!resultado.success) {
        const status = document.getElementById('loginStatus');
        if (status) {
          status.style.color = 'red';
          status.textContent = resultado.message || 'Usuário ou senha incorretos.';
        }
        return;
      }

      // Redireciona baseado no tipo
      const nomeParam = encodeURIComponent(resultado.nome || '');
      if (resultado.tipo === 'medico') {
        window.location.href = `index.html?nome=${nomeParam}`;
      } else {
        window.location.href = `dashboard-paciente.html?nome=${nomeParam}`;
      }

    } catch (err) {
      console.error("Erro na requisição de login:", err);
      const status = document.getElementById('loginStatus');
      if (status) {
        status.style.color = 'red';
        status.textContent = 'Erro de conexão com o servidor.';
      }
    }
  };
}

// Cadastrar como cliente button
const btn = document.getElementById('btnCadastrar');
if (btn) {
  btn.addEventListener('click', () => {
    window.location.href = 'teste.html?tipo=cliente';
  });
}
