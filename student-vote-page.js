import { supabase } from './supabase.js';

const cardsContainer = document.getElementById('cards');
const totalVotesEl = document.getElementById('totalVotes');
const refreshBtn = document.getElementById('refreshBtn');

// Fixed levels
const levels = ["100", "200", "300", "400A", "400B"];

// Check admin login
async function checkAdmin() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert("You must login as admin");
    window.location.href = "admin-login.html";
    return null;
  }

  return user;
}

async function fetchVoteCounts() {
  cardsContainer.innerHTML = "<p>Loading...</p>";

  const user = await checkAdmin();
  if (!user) return;

  // ✅ CORRECT JOIN
  const { data, error } = await supabase
    .from('votes')
    .select(`
      user_id,
      students!votes_user_id_fkey (
        level
      )
    `);

  if (error) {
    console.error(error);
    cardsContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
    return;
  }

  // Initialize counts
  const counts = {
    "100": 0,
    "200": 0,
    "300": 0,
    "400A": 0,
    "400B": 0
  };

  let total = 0;

  data.forEach(vote => {
    const level = vote.students?.level;

    if (level && counts.hasOwnProperty(level)) {
      counts[level]++;
      total++;
    }
  });

  totalVotesEl.textContent = total;
  renderCards(counts);
}

function renderCards(counts) {
  cardsContainer.innerHTML = "";

  levels.forEach(level => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <div class="level">${formatLevel(level)}</div>
      <div class="count">${counts[level]}</div>
    `;

    cardsContainer.appendChild(card);
  });
}

function formatLevel(level) {
  if (level === "400A") return "400 Level A";
  if (level === "400B") return "400 Level B";
  return `${level} Level`;
}

// Refresh button
refreshBtn.addEventListener('click', fetchVoteCounts);

// Load page
fetchVoteCounts();