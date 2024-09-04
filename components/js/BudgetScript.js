// Get the forms
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

// Add event listeners for form submissions
loginForm.addEventListener('submit', handleLogin);
signupForm.addEventListener('submit', handleSignup);

// Function to handle login
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Send a request to your Node.js server to handle the login logic
  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'Logged in successfully') {
        // Handle successful login
      } else {
        // Handle login error
        alert(data.message);
      }
    })
    .catch(error => console.error(error));
}

// Function to handle signup
function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  // Send a request to your Node.js server to handle the signup logic
  fetch('http://localhost:5000/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.message === 'User created successfully') {
        // Handle successful signup
      } else {
        // Handle signup error
        alert(data.message);
      }
    })
    .catch(error => console.error(error));
}