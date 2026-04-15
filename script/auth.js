function getUsers() {
    try {
        return JSON.parse(localStorage.getItem("dc_users")) || [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem("dc_users", JSON.stringify(users));
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("dc_current_user")) || null;
    } catch {
        return null;
    }
}

function setCurrentUser(user) {
    const { password, ...safe } = user;
    localStorage.setItem("dc_current_user", JSON.stringify(safe));
}

function logout() {
    localStorage.removeItem("dc_current_user");
    window.location.href = "login.html";
}

function checkAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = "login.html";
        return null;
    }
    return user;
}

function hashPassword(password) {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const chr = password.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash.toString(36) + "_" + password.length;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function setError(fieldId, groupId, message) {
    const errorEl = document.getElementById(fieldId);
    const groupEl = document.getElementById(groupId);
    if (errorEl) errorEl.textContent = message;
    if (groupEl) {
        const input = groupEl.querySelector(".input-field");
        if (input) {
            input.classList.toggle("error", !!message);
            input.classList.remove("success");
        }
    }
}

function setSuccess(groupId) {
    const groupEl = document.getElementById(groupId);
    if (groupEl) {
        const input = groupEl.querySelector(".input-field");
        if (input) {
            input.classList.add("success");
            input.classList.remove("error");
        }
    }
}

function clearError(fieldId, groupId) {
    setError(fieldId, groupId, "");
}

function showFormError(id, message) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.classList.toggle("visible", !!message);
}

function showToast(message, type = "success") {
    const existing = document.querySelector(".toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => toast.classList.add("show"));
    });

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 350);
    }, 2800);
}

function checkPasswordStrength(password) {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
}

function updateStrengthBar(password) {
    const fill = document.getElementById("strengthFill");
    const label = document.getElementById("strengthLabel");
    if (!fill || !label) return;

    if (!password) {
        fill.style.width = "0%";
        fill.style.backgroundColor = "transparent";
        label.textContent = "";
        return;
    }

    const score = checkPasswordStrength(password);
    const levels = [
        { width: "20%", color: "#e6535a", text: "Weak" },
        { width: "40%", color: "#f5a623", text: "Fair" },
        { width: "60%", color: "#f5a623", text: "Fair" },
        { width: "80%", color: "#34c97e", text: "Good" },
        { width: "100%", color: "#34c97e", text: "Strong" },
    ];
    const level = levels[Math.min(score - 1, 4)] || { width: "0%", color: "transparent", text: "" };
    fill.style.width = level.width;
    fill.style.backgroundColor = level.color;
    label.textContent = level.text;
    label.style.color = level.color;
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const isHidden = input.type === "password";
    input.type = isHidden ? "text" : "password";
    btn.style.opacity = isHidden ? "1" : "0.5";
}

function handleLogin() {
    showFormError("loginError", "");
    clearError("emailError", "emailGroup");
    clearError("passwordError", "passwordGroup");

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    const remember = document.getElementById("rememberMe").checked;

    let valid = true;

    if (!email) {
        setError("emailError", "emailGroup", "Email address is required.");
        valid = false;
    } else if (!isValidEmail(email)) {
        setError("emailError", "emailGroup", "Please enter a valid email address.");
        valid = false;
    } else {
        setSuccess("emailGroup");
    }

    if (!password) {
        setError("passwordError", "passwordGroup", "Password is required.");
        valid = false;
    } else {
        setSuccess("passwordGroup");
    }

    if (!valid) return;

    const btn = document.getElementById("loginBtn");
    const spinner = document.getElementById("loginSpinner");
    const btnText = btn.querySelector(".btn-text");

    btn.disabled = true;
    spinner.classList.add("visible");
    btnText.textContent = "Signing in…";

    setTimeout(() => {
        const users = getUsers();
        const hashed = hashPassword(password);
        const user = users.find(u => u.email === email.toLowerCase() && u.password === hashed);

        if (!user) {
            spinner.classList.remove("visible");
            btn.disabled = false;
            btnText.textContent = "Sign In";
            showFormError("loginError", "Incorrect email or password. Please try again.");
            setError("emailError", "emailGroup", " ");
            setError("passwordError", "passwordGroup", " ");
            return;
        }

        // Save session
        setCurrentUser(user);
        if (remember) {
            localStorage.setItem("dc_remember_email", email.toLowerCase());
        } else {
            localStorage.removeItem("dc_remember_email");
        }

        btn.classList.add("success");
        btnText.textContent = "✓ Signed in!";
        showToast("Welcome back, " + user.firstName + "!", "success");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 900);

    }, 800);
}

function handleRegister() {
    showFormError("registerError", "");
    ["firstNameError", "lastNameError", "regEmailError", "regPasswordError", "confirmPasswordError"]
        .forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = "";
        });
    ["firstNameGroup", "lastNameGroup", "regEmailGroup", "regPasswordGroup", "confirmPasswordGroup"]
        .forEach(id => {
            const group = document.getElementById(id);
            if (group) {
                const input = group.querySelector(".input-field");
                if (input) {
                    input.classList.remove("error", "success");
                }
            }
        });

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    let valid = true;

    if (!firstName) {
        setError("firstNameError", "firstNameGroup", "First name is required.");
        valid = false;
    } else {
        setSuccess("firstNameGroup");
    }

    if (!lastName) {
        setError("lastNameError", "lastNameGroup", "Last name is required.");
        valid = false;
    } else {
        setSuccess("lastNameGroup");
    }

    if (!email) {
        setError("regEmailError", "regEmailGroup", "Email address is required.");
        valid = false;
    } else if (!isValidEmail(email)) {
        setError("regEmailError", "regEmailGroup", "Please enter a valid email address.");
        valid = false;
    } else {
        const users = getUsers();
        if (users.find(u => u.email === email.toLowerCase())) {
            setError("regEmailError", "regEmailGroup", "An account with this email already exists.");
            valid = false;
        } else {
            setSuccess("regEmailGroup");
        }
    }

    if (!password) {
        setError("regPasswordError", "regPasswordGroup", "Password is required.");
        valid = false;
    } else if (password.length < 6) {
        setError("regPasswordError", "regPasswordGroup", "Password must be at least 6 characters.");
        valid = false;
    } else {
        setSuccess("regPasswordGroup");
    }

    if (!confirmPassword) {
        setError("confirmPasswordError", "confirmPasswordGroup", "Please confirm your password.");
        valid = false;
    } else if (password !== confirmPassword) {
        setError("confirmPasswordError", "confirmPasswordGroup", "Passwords do not match.");
        valid = false;
    } else if (password.length >= 6) {
        setSuccess("confirmPasswordGroup");
    }

    if (!valid) return;

    const btn = document.getElementById("registerBtn");
    const spinner = document.getElementById("registerSpinner");
    const btnText = btn.querySelector(".btn-text");

    btn.disabled = true;
    spinner.classList.add("visible");
    btnText.textContent = "Creating account…";

    setTimeout(() => {
        const users = getUsers();
        const newUser = {
            id: Date.now().toString(),
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashPassword(password),
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        saveUsers(users);
        setCurrentUser(newUser);

        btn.classList.add("success");
        btnText.textContent = "✓ Account created!";
        showToast("Welcome, " + firstName + "! Account created.", "success");

        setTimeout(() => {
            window.location.href = "index.html";
        }, 900);

    }, 900);
}

document.addEventListener("DOMContentLoaded", function () {
    const page = window.location.pathname.split("/").pop().toLowerCase();

    if (page === "login.html" || page === "") {
        if (getCurrentUser()) {
            window.location.href = "index.html";
            return;
        }

        const remembered = localStorage.getItem("dc_remember_email");
        if (remembered) {
            const emailInput = document.getElementById("loginEmail");
            if (emailInput) {
                emailInput.value = remembered;
                document.getElementById("rememberMe").checked = true;
            }
        }

        document.addEventListener("keydown", function (e) {
            if (e.key === "Enter") handleLogin();
        });
    }

    if (page === "register.html") {
        if (getCurrentUser()) {
            window.location.href = "index.html";
            return;
        }

        const regPassword = document.getElementById("regPassword");
        if (regPassword) {
            regPassword.addEventListener("input", function () {
                updateStrengthBar(this.value);
            });
        }

        document.addEventListener("keydown", function (e) {
            if (e.key === "Enter") handleRegister();
        });
    }
});
