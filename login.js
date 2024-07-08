// Tab switching
document.getElementById("login-tab").addEventListener("click", function() {
    switchTab('login');
});
document.getElementById("register-tab").addEventListener("click", function() {
    switchTab('register');
});

function switchTab(tab) {
    document.getElementById("login-form").classList.remove("active");
    document.getElementById("register-form").classList.remove("active");
    document.getElementById(tab + "-form").classList.add("active");
    document.getElementById("login-tab").classList.remove("active");
    document.getElementById("register-tab").classList.remove("active");
    document.getElementById(tab + "-tab").classList.add("active");
}

// Register function
async function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;
    const bcrypt = dcodeIO.bcrypt;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    switchTab('login');
}

// Login function
async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const userType = document.getElementById("user-type").value;
    const bcrypt = dcodeIO.bcrypt;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    if (userType === "admin") {
        // Admin credentials hardcoded
        const adminUsername = "admin";
        const adminPassword = "adminpassword";
        const hashedAdminPassword = "$2y$10$OKU7sn7Md4QPYU5GKqobROjJXVpCvpIDtE242mZBxRUwg5QNBd2Z2"; // hashed "adminpassword"
        
        if (username === adminUsername && await bcrypt.compare(password, hashedAdminPassword)) {
            alert("Admin login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid admin credentials!");
        }
    } else if (userType === "student") {
        // Student credentials hardcoded
        const studentUsername = "student";
        const studentPassword = "studentpassword";
        const hashedStudentPassword = "$2y$10$BbkcYJ0ShZ6uJuroURaTy.p324NkF2MIF8xJKLfQrn/LfKjz/aLNm"; // hashed "studentpassword"
        
        // Check hardcoded credentials first
        if (username === studentUsername && await bcrypt.compare(password, hashedStudentPassword)) {
            alert("Student login successful!");
            window.location.href = "studentIndex.html";
        } else {
            // Fetch students from localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let user = users.find(user => user.username === username);

            if (user && await bcrypt.compare(password, user.password)) {
                alert("Student login successful!");
                window.location.href = "studentIndex.html";
            } else {
                alert("Invalid student credentials!");
            }
        }
    }
}
