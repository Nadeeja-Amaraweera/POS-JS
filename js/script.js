
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
    }, 3000);
}

if (errorCloseBtn) {
    errorCloseBtn.addEventListener("click", hideError);
}

// login to dashboard
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        showpage("login-section", "dashboard-section");
    } else {
        showError("Invalid username or password. Please try again.");
        hideErrorAuto();
    }
}

function showpage(hidepage, showpage) {
    document.getElementById(hidepage).style.display = "none";
    document.getElementById(showpage).style.display = "block";
}
