// DOM Elements
const loginContainer = document.getElementById('loginContainer');
const signupContainer = document.getElementById('signupContainer');
const switchToSignup = document.getElementById('switchToSignup');
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const loginTab2 = document.getElementById('loginTab2');
const signupTab2 = document.getElementById('signupTab2');

// Function to show login form
function showLogin() {
    loginContainer.style.display = 'block';
    signupContainer.style.display = 'none';
    
    // Update tab states
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
}

// Function to show signup form
function showSignup() {
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'block';
    
    // Update tab states
    signupTab2.classList.add('active');
    loginTab2.classList.remove('active');
}

// Event Listeners for tab switching
signupTab.addEventListener('click', showSignup);
loginTab2.addEventListener('click', showLogin);

// Event listener for "Sign Up" link in login form
switchToSignup.addEventListener('click', (e) => {
    e.preventDefault();
    showSignup();
});

// Form submission handlers
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const username = e.target.querySelector('input[type="text"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    const remember = e.target.querySelector('input[type="checkbox"]').checked;
    
    // Basic validation
    if (!username.trim() || !password.trim()) {
        alert('Please fill in all fields');
        return;
    }
    
    // Here you would normally send the data to your backend
    console.log('Login attempt:', { username, password, remember });
    alert('Login functionality would be implemented here');
    
    // Example of what you might do:
    // loginUser(username, password, remember);
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const email = e.target.querySelector('input[type="email"]').value;
    const username = e.target.querySelector('input[type="text"]').value;
    const password = e.target.querySelector('input[type="password"]:nth-of-type(1)').value;
    const confirmPassword = e.target.querySelector('input[type="password"]:nth-of-type(2)').value;
    const termsAccepted = e.target.querySelector('input[type="checkbox"]').checked;
    
    // Basic validation
    if (!email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    if (!termsAccepted) {
        alert('Please accept the Terms & Conditions');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Here you would normally send the data to your backend
    console.log('Signup attempt:', { email, username, password, termsAccepted });
    alert('Signup functionality would be implemented here');
    
    // Example of what you might do:
    // registerUser(email, username, password);
});

// Add floating animation to form containers
function addFloatingAnimation() {
    const containers = document.querySelectorAll('.form-container');
    containers.forEach((container, index) => {
        container.style.animation = `float ${6 + index}s ease-in-out infinite`;
    });
}

// Add smooth transitions for form switching
function addSmoothTransitions() {
    const containers = document.querySelectorAll('.form-container');
    containers.forEach(container => {
        container.style.transition = 'opacity 0.3s ease-in-out';
    });
}

// Input focus effects
function addInputEffects() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
}

// Button hover effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.tab-btn, .submit-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

// Initialize all effects when page loads
document.addEventListener('DOMContentLoaded', function() {
    addFloatingAnimation();
    addSmoothTransitions();
    addInputEffects();
    addButtonEffects();
    
    // Set initial state
    showLogin();
    
    console.log('Glassmorphism Login/Signup interface loaded successfully!');
});

// Password strength indicator (optional enhancement)
function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    const strengthLevels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return {
        score: strength,
        text: strengthLevels[strength] || 'Very Weak'
    };
}

// Utility function for future API integration
async function loginUser(username, password, remember) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, remember })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            // Redirect or update UI
        } else {
            const error = await response.json();
            alert(error.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Network error. Please try again.');
    }
}

// Utility function for future API integration
async function registerUser(email, username, password) {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, username, password })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('Registration successful:', data);
            alert('Account created successfully! Please login.');
            showLogin();
        } else {
            const error = await response.json();
            alert(error.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('Network error. Please try again.');
    }
}