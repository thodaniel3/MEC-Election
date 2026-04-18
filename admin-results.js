import { supabase } from './supabase.js'

const ADMIN_EMAIL = "admin@2026.com"

// 🔐 CHECK ADMIN ACCESS
async function checkAdmin() {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user || data.user.email !== ADMIN_EMAIL) {
    alert("Unauthorized access")
    window.location.href = "login.html"
    return
  }

  loadResults()
}

checkAdmin()

// 📊 LOAD RESULTS
async function loadResults() {

  const container = document.getElementById("resulttts")
  container.innerHTML = "<p>Loading results...</p>"

  // Get positions
  const { data: positions, error: posError } = await supabase
    .from('positions')
    .select('*')

  if (posError) {
    container.innerHTML = "<p>Error loading positions</p>"
    return
  }

  container.innerHTML = ""

  for (let pos of positions) {

    // Get candidates for this position
    const { data: candidates, error: candError } = await supabase
      .from('candidates')
      .select('*')
      .eq('position_id', pos.id)

    if (candError) continue

    let results = []

    // Get vote count for each candidate
    for (let c of candidates) {

      const { count } = await supabase
        .from('votes')
        .select('*', { count: 'exact', head: true })
        .eq('candidate_id', c.id)

      results.push({
        name: c.name,
        votes: count || 0
      })
    }

    // 🔥 SORT BY HIGHEST VOTES
    results.sort((a, b) => b.votes - a.votes)

    // 🥇 Get highest vote (for winner highlight)
    const maxVotes = results.length > 0 ? results[0].votes : 0

    // Build UI
    let html = `
      <div class="result-card">
        <h3>${pos.title}</h3>
    `

    results.forEach(r => {

      const isWinner = r.votes === maxVotes && maxVotes > 0

      html += `
        <p ${isWinner ? 'style="background:#d4edda; font-weight:bold;"' : ''}>
          ${isWinner ? '🥇 ' : ''}${r.name} — ${r.votes} votes
        </p>
      `
    })

    html += `</div>`

    container.innerHTML += html
  }
}