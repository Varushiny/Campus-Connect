const storageKey = 'universityEvents';
const eventsList = document.getElementById('eventsList');
const searchInput = document.getElementById('searchInput');
const totalCount = document.getElementById('totalCount');
const todayCount = document.getElementById('todayCount');
const upcomingCount = document.getElementById('upcomingCount');

function loadEvents() {
  const raw = localStorage.getItem(storageKey) || '[]';
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function render() {
  const events = loadEvents();
  const query = searchInput?.value.trim().toLowerCase() || '';
  const filtered = query
    ? events.filter(
        (evt) =>
          (evt.title + ' ' + evt.location + ' ' + (evt.description || ''))
            .toLowerCase()
            .includes(query)
      )
    : events;

  eventsList.innerHTML = '';
  if (!filtered.length) {
    eventsList.innerHTML = `<div class="event-empty">${
      events.length
        ? 'No events match your search.'
        : 'No events available. Add events on the event page and refresh this page.'
    }</div>`;
  } else {
    filtered.sort(
      (a, b) =>
        new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time)
    );
    filtered.forEach((evt) => {
      const item = document.createElement('article');
      item.className = 'event-item';
      item.innerHTML = `
        <h3>${evt.title}</h3>
        <p>${evt.description || 'No description provided.'}</p>
        <div class="event-meta">
          <span><strong>Date:</strong> ${formatDate(evt.date)}</span>
          <span><strong>Time:</strong> ${evt.time}</span>
          <span><strong>Location:</strong> ${evt.location}</span>
        </div>
      `;
      eventsList.appendChild(item);
    });
  }
  updateStats(events);
}

function updateStats(events) {
  const today = new Date().toISOString().slice(0, 10);
  totalCount.textContent = events.length;
  todayCount.textContent = events.filter((evt) => evt.date === today).length;
  upcomingCount.textContent = events.filter((evt) => evt.date >= today).length;
}

render();
