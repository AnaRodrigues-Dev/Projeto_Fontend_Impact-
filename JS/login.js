const passwordInput = document.getElementById('password');
const toggleBtn = document.querySelector('.toggle-password');
const messageDiv = document.getElementById('message');

toggleBtn.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  toggleBtn.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
});

function handleLogin() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const btnLogin = document.querySelector('button[onclick="handleLogin()"]');

  messageDiv.classList.remove('hidden', 'success', 'error');

  if (!email || !password) {
    messageDiv.textContent = 'Por favor, preencha todos os campos.';
    messageDiv.classList.add('error');
    return;
  }

  if (!email.includes('@')) {
    messageDiv.textContent = 'Por favor, insira um email válido.';
    messageDiv.classList.add('error');
    return;
  }

  const nomeUsuario = localStorage.getItem('nomeUsuario') || email.split('@')[0];
  const emailCadastrado = localStorage.getItem('emailUsuario');

  if (emailCadastrado && emailCadastrado !== email) {
    messageDiv.textContent = 'Email ou senha incorretos.';
    messageDiv.classList.add('error');
    return;
  }

  localStorage.setItem('nomeUsuario', nomeUsuario);
  localStorage.setItem('emailUsuario', email);
  
  if (btnLogin) {
    btnLogin.disabled = true;
    btnLogin.textContent = 'Entrando...';
    btnLogin.style.opacity = '0.7';
  }

  messageDiv.textContent = 'Login realizado com sucesso!';
  messageDiv.classList.add('success');
  
  setTimeout(() => {
    window.location.href = 'home.html';
  }, 1000);
}

document.getElementById('email').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleLogin();
});

document.getElementById('password').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleLogin();
});