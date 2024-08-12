const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    if (name && email && password) {
        localStorage.setItem('user', JSON.stringify({ name, email, password }));
        alert('Registrasi berhasil! Silakan masuk.');
        container.classList.remove('active');
    } else {
        alert('Mohon isi semua field.');
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && email === storedUser.email && password === storedUser.password) {
        alert('Login berhasil!');
        // Redirect atau lakukan aksi login di sini
    } else {
        alert('Email atau password salah.');
    }
});
