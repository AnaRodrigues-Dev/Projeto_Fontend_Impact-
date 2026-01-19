const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const togglePasswordBtn = document.querySelector('.toggle-password');
const toggleConfirmPasswordBtn = document.querySelector('.toggle-confirm-password');
const messageDiv = document.getElementById('message');

togglePasswordBtn.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePasswordBtn.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
});

toggleConfirmPasswordBtn.addEventListener('click', () => {
  const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
  confirmPasswordInput.type = type;
  toggleConfirmPasswordBtn.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
});

const telefoneInput = document.getElementById('telefone');
telefoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  
  if (value.length <= 11) {
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
  }
  
  e.target.value = value;
});

function handleCadastro() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const termsAccepted = document.getElementById('terms').checked;
  const btnCadastro = document.querySelector('button[onclick="handleCadastro()"]');

  messageDiv.classList.remove('hidden', 'success', 'error');

  if (!nome || !email || !telefone || !password || !confirmPassword) {
    messageDiv.textContent = 'Por favor, preencha todos os campos.';
    messageDiv.classList.add('error');
    return;
  }

  if (!email.includes('@')) {
    messageDiv.textContent = 'Por favor, insira um email válido.';
    messageDiv.classList.add('error');
    return;
  }

  if (password.length < 6) {
    messageDiv.textContent = 'A senha deve ter no mínimo 6 caracteres.';
    messageDiv.classList.add('error');
    return;
  }

  if (password !== confirmPassword) {
    messageDiv.textContent = 'As senhas não coincidem.';
    messageDiv.classList.add('error');
    return;
  }

  if (!termsAccepted) {
    messageDiv.textContent = 'Você deve aceitar os termos e condições.';
    messageDiv.classList.add('error');
    return;
  }

  localStorage.setItem('nomeUsuario', nome);
  localStorage.setItem('emailUsuario', email);
  localStorage.setItem('telefoneUsuario', telefone);

  if (btnCadastro) {
    btnCadastro.disabled = true;
    btnCadastro.textContent = 'Cadastrando...';
    btnCadastro.style.opacity = '0.7';
  }

  messageDiv.textContent = `Cadastro realizado com sucesso! Bem-vindo(a), ${nome}!`;
  messageDiv.classList.add('success');

  setTimeout(() => {
    window.location.href = 'home.html';
  }, 1000);
}

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleCadastro();
  });
});