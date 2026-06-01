// Handle login form submission
function handleSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const pwd = document.getElementById('password').value;
  const role = document.querySelector('input[name="role"]:checked')?.value || 'student';

  if (!email || !pwd) {
    alert('Please enter email and password.');
    return false;
  }

  // Demo behavior: include selected role then navigate to event creation page
  alert('Signed in as ' + email + ' (' + role + ')\n(This is a demo page — integrate with your backend.)');

  // Redirect to add-event page (frontend demo)
  window.location.href = 'event.html?role=' + encodeURIComponent(role);
  return false;
}

// Toggle password visibility
function togglePassword() {
  const pw = document.getElementById('password');
  const btn = document.querySelector('.pw-toggle');

  if (pw.type === 'password') {
    pw.type = 'text';
    btn.textContent = 'Hide';
  } else {
    pw.type = 'password';
    btn.textContent = 'Show';
  }
}

// Redirect to signup page
function signUp() {
  window.location.href = 'signup.html';
}

// Portal switcher wiring: sync prominent buttons with hidden radios
(function () {
  const switcher = document.querySelector('.portal-switch');
  if (!switcher) return;

  switcher.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-role]');
    if (!btn) return;

    const role = btn.getAttribute('data-role');

    // toggle active class
    switcher.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // set hidden radio
    const radio = document.querySelector('input[name="role"][value="' + role + '"]');
    if (radio) radio.checked = true;
  });

  // initialize from radio if needed
  const current = document.querySelector('input[name="role"]:checked')?.value;
  if (current) {
    switcher.querySelectorAll('button').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-role') === current);
    });
  }
})();
