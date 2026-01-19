const passwordInput = document.getElementById('password');
const toggleBtn = document.querySelector('.toggle-password');
const messageDiv = document.getElementById('message');

toggleBtn.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  toggleBtn.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
});

function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

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

  messageDiv.textContent = `Login realizado com sucesso!`;
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