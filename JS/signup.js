const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const togglePasswordBtn = document.querySelector('.toggle-password');
const toggleConfirmPasswordBtn = document.querySelector('.toggle-confirm-password');
const messageDiv = document.getElementById('message');

// Toggle senha
togglePasswordBtn.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePasswordBtn.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
});

// Toggle confirmar senha
toggleConfirmPasswordBtn.addEventListener('click', () => {
  const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
  confirmPasswordInput.type = type;
  toggleConfirmPasswordBtn.textContent = type === 'password' ? 'Mostrar' : 'Ocultar';
});

// Máscara de telefone
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

  messageDiv.classList.remove('hidden', 'success', 'error');

  // Validação de campos vazios
  if (!nome || !email || !telefone || !password || !confirmPassword) {
    messageDiv.textContent = 'Por favor, preencha todos os campos.';
    messageDiv.classList.add('error');
    return;
  }

  // Validação de email
  if (!email.includes('@')) {
    messageDiv.textContent = 'Por favor, insira um email válido.';
    messageDiv.classList.add('error');
    return;
  }

  // Validação de senha
  if (password.length < 6) {
    messageDiv.textContent = 'A senha deve ter no mínimo 6 caracteres.';
    messageDiv.classList.add('error');
    return;
  }

  // Validação de confirmação de senha
  if (password !== confirmPassword) {
    messageDiv.textContent = 'As senhas não coincidem.';
    messageDiv.classList.add('error');
    return;
  }

  // Validação de termos
  if (!termsAccepted) {
    messageDiv.textContent = 'Você deve aceitar os termos e condições.';
    messageDiv.classList.add('error');
    return;
  }

  // Sucesso
  messageDiv.textContent = `Cadastro realizado com sucesso! Bem-vindo(a), ${nome}!`;
  messageDiv.classList.add('success');

  // Limpar formulário após 2 segundos
  setTimeout(() => {
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
    document.getElementById('terms').checked = false;
    messageDiv.classList.add('hidden');
  }, 2000);
}

// Enter para submeter
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleCadastro();
  });
});