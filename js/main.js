
// Error Message Box
var errorBox = document.querySelector(".error-msg-box");
var errorCloseBtn = document.getElementById("error-close-btn");

function showError(message) {
    document.getElementById("error-text").textContent = message;
    errorBox.style.transform = "translate(-50%, -100%)";
    showErrorSlowly();
    hideErrorAuto();
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
    const username = document.getElementById("usernameField").value;
    const password = document.getElementById("passwordField").value;

    if (username === "a" && password === "a") {
        showpage("loginPage", "dashPage");
    } else {
        showError("Invalid username or password. Please try again.");
    }
}

// Change page
function showpage(hidepage, showpage) {
    document.getElementById(hidepage).classList.add("hidden");
    document.getElementById(showpage).classList.remove("hidden");
}

//  Load specific page in dashboard
function loadPage(pageId) {
    // Define all possible page IDs
    const pages = ['customerPage', 'itemsPage', 'ordersPage', 'loginPage'];

    // Loop through and hide EVERY page
    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add("hidden");
        }
    });

    // Show ONLY the requested page
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove("hidden");
        // Use 'flex' for the dashboard to keep the sidebar layout intact
    }



    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const pill = link.querySelector('.active-pill');

        // Check if this link corresponds to the clicked page
        if (link.getAttribute('onclick').includes(pageId)) {
            // APPLY ACTIVE STYLES
            link.classList.add('bg-gray-300', 'text-gray-800');
            link.classList.remove('text-gray-300', 'hover:bg-white/10');

            if (pill) pill.classList.remove('hidden'); // Show the pill
        } else {
            // RESET TO INACTIVE
            link.classList.remove('bg-gray-300', 'text-gray-800');
            link.classList.add('text-gray-300', 'hover:bg-white/10');

            if (pill) pill.classList.add('hidden'); // Hide the pill
        }
    });
}

// Load order page with specific content
function loadOrderPage(pageId) {
    // Hide all order-related pages first
    const orderPages = ['orderPlacePage', 'orderViewPage'];
    orderPages.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.add("hidden");
            el.style.display = "none";
        }
    });

    // Show the requested order page
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove("hidden");
        target.style.display = "flex";
    }

    // Update the active state of the order buttons
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        if (button.getAttribute('onclick').includes(pageId)) {
            button.classList.add('bg-indigo-600', 'text-white');
        } else {
            button.classList.remove('bg-indigo-600', 'text-white');
        }
    });

}


// Toggle password visibility
const passwordField = document.getElementById("passwordField");
const icon = document.getElementById("eyeIcon");

function togglePassword() {
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