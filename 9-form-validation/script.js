const showErr = (id, msg) => {
    const field = document.getElementById(id);
    const err = document.getElementById(id + "Error");
    err.innerText = msg;
    err.style.display = "block";
    field.parentElement.style.borderBottom = "1px solid red";
};

const clearErr = (id) => {
    const field = document.getElementById(id);
    const err = document.getElementById(id + "Error");
    err.style.display = "none";
    field.parentElement.style.borderBottom = "none";
};

const togglePass = (id, eyeIcon) => {
    const field = document.getElementById(id);
    if (field.type === "password") {
        field.type = "text";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    } else {
        field.type = "password";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    }
};

const handleRegister = (e) => {
    e.preventDefault();
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const p1 = document.getElementById("pass").value;
    const p2 = document.getElementById("confirm").value;
    let isOk = true;
    const nameRegex = /^[a-zA-Z0-9]{3,15}$/;
    if (!nameRegex.test(name)) {
        showErr("username", "Name must be 3-15 alphanumeric chars");
        isOk = false;
    }
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
        showErr("email", "Please enter a valid email address");
        isOk = false;
    }
    const passRegex = /^(?=.*[0-9]).{6,}$/;
    if (!passRegex.test(p1)) {
        showErr("pass", "Min 6 chars and at least 1 number");
        isOk = false;
    }
    if (p1 !== p2) {
        showErr("confirm", "Passwords do not match!");
        isOk = false;
    }
    if (isOk) {
        alert("Sign up successful! Welcome to Hage.");
    }
    return false;
};

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('hageForm');
    if (form) form.addEventListener('submit', handleRegister);
    ['username', 'email', 'pass', 'confirm'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', () => clearErr(id));
    });
    document.querySelectorAll('.toggle-eye').forEach(icon => {
        const input = icon.previousElementSibling;
        const id = input && input.id;
        if (id) icon.addEventListener('click', () => togglePass(id, icon));
    });
});
