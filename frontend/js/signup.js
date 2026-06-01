// Signup form handling
function handleSignup(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;

  if (password !== confirm) {
    alert('Passwords do not match!');
    return false;
  }

  alert('Your account has been created. This is a demo page. Redirecting to login...');
  window.location.href = 'login.html';
  return false;
}
