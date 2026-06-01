// Event form handling
document.getElementById('eventForm')?.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = {
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    location: document.getElementById('location').value,
    category: document.getElementById('category').value,
    capacity: document.getElementById('capacity').value,
    organizer: document.getElementById('organizer').value,
    description: document.querySelector('textarea').value,
  };

  // Store in localStorage
  const storageKey = 'universityEvents';
  const events = JSON.parse(localStorage.getItem(storageKey) || '[]');
  events.push(formData);
  localStorage.setItem(storageKey, JSON.stringify(events));

  alert('Event added successfully! Redirecting to events page.');
  window.location.href = 'showevents.html';
});
