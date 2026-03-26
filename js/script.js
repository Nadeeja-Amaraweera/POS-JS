
// Error Message Box
var errorBox = document.querySelector(".error-msg-box");
var errorCloseBtn = document.getElementById("error-close-btn");

function showError(message) {
    errorBox.style.transform = "translate(-50%, -100%)";
    showErrorSlowly();
}

function hideError() {
    errorBox.style.transform = "translate(-50%, -600%)";
    showErrorSlowly();
}

function showErrorSlowly() {
    errorBox.style.transition = "transform 0.5s ease-in-out";
}

function hideErrorAuto() {
    setTimeout(function () {
        hideError();
    },3000);
}

if (errorCloseBtn) {
    errorCloseBtn.addEventListener("click", hideError);
}

// login to dashboard
function login() {
    const username = document.getElementById("usernameField").value;
    const password = document.getElementById("passwordField").value;

    if (username === "a" && password === "a") {
        showpage("loginPage", "dashPage");
    } else {
        showError("Invalid username or password. Please try again.");
        hideErrorAuto();
    }
}

// Change page
function showpage(hidepage, showpage) {
    document.getElementById(hidepage).style.display = "none";
    document.getElementById(showpage).style.display = "flex";
}

// Toggle password visibility
const passwordField = document.getElementById("passwordField");
const icon = document.getElementById("eyeIcon");

function togglePassword(){
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordField.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}


// Role Selection
function selectRole(btn) {
    document.querySelectorAll(".role-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
}
