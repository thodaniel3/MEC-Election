import { supabase } from './supabase.js';

const cardsContainer = document.getElementById('cards');
const refreshBtn = document.getElementById('refreshBtn');

// FIXED LEVEL STRUCTURE
const levels = [
  "100",
  "200",
  "300",
  "400A",
  "400B"
];

async function fetchVoteCounts() {
  cardsContainer.innerHTML = "<p>Loading data...</p>";

  const { data, error } = await supabase
    .from('votes')
    .select('level');

  if (error) {
    console.error(error);
    cardsContainer.innerHTML = "<p>Error loading data</p>";
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

  // Count votes
  data.forEach(vote => {
    const level = vote.level;

    if (counts.hasOwnProperty(level)) {
      counts[level]++;
    }
  });

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

// Format display text
function formatLevel(level) {
  if (level === "400A") return "400 Level A";
  if (level === "400B") return "400 Level B";
  return `${level} Level`;
}

// Refresh button
refreshBtn.addEventListener('click', fetchVoteCounts);

// Load on page start
fetchVoteCounts();