// Mostrar/Ocultar Senha Principal
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
});

// Mostrar/Ocultar Confirmar Senha
const confirmPasswordInput = document.getElementById('confirmPassword');
const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

toggleConfirmPassword.addEventListener('click', () => {
    const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
    toggleConfirmPassword.classList.toggle('fa-eye');
    toggleConfirmPassword.classList.toggle('fa-eye-slash');
});

// Validação e Força da Senha
const reqLength = document.getElementById('req-length');
const reqUppercase = document.getElementById('req-uppercase');
const reqNumber = document.getElementById('req-number');
const reqSpecial = document.getElementById('req-special');

const bars = [
    document.getElementById('bar1'),
    document.getElementById('bar2'),
    document.getElementById('bar3'),
    document.getElementById('bar4')
];

passwordInput.addEventListener('input', (e) => {
    const value = e.target.value;
    
    // Regras de validação
    const hasLength = value.length >= 8;
    const hasUppercase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    // Atualizar UI dos requisitos
    updateRequirementStatus(reqLength, hasLength);
    updateRequirementStatus(reqUppercase, hasUppercase);
    updateRequirementStatus(reqNumber, hasNumber);
    updateRequirementStatus(reqSpecial, hasSpecial);

    // Calcular força da senha (0 a 4)
    let strength = 0;
    if (hasLength) strength++;
    if (hasUppercase) strength++;
    if (hasNumber) strength++;
    if (hasSpecial) strength++;

    // Atualizar barras de força
    updateStrengthBars(strength);
});

function updateRequirementStatus(element, isValid) {
    if (isValid) {
        element.classList.add('valid');
        element.classList.remove('invalid');
    } else {
        element.classList.remove('valid');
        element.classList.add('invalid');
    }
}

function updateStrengthBars(strength) {
    // Cores correspondentes à força
    const colors = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];
    
    bars.forEach((bar, index) => {
        if (index < strength) {
            bar.style.backgroundColor = colors[strength - 1];
        } else {
            bar.style.backgroundColor = '#1f2937';
        }
    });
}

// Manipulação do Formulário e Recuperação de Senha
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, verifique.');
        return;
    }

    alert('Conta criada com sucesso!');
    // Aqui você pode adicionar sua lógica de envio via Fetch API para o backend.
});

// Ação do link de recuperar senha
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Digite seu e-mail cadastrado para recuperação de senha:');
    if (email) {
        alert(`Instruções de recuperação enviadas para: ${email}`);
    }
});