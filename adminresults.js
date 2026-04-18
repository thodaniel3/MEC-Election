import { supabase } from './supabase.js'

const ADMIN_EMAIL = "admin@2026.com"

// 🔐 CHECK ADMIN
async function checkAdmin() {
  const { data } = await supabase.auth.getUser()

  if (!data.user || data.user.email !== ADMIN_EMAIL) {
    alert("Unauthorized")
    window.location.href = "login.html"
    return
  }

  loadResults()
}

checkAdmin()

// 📊 LOAD RESULTS
async function loadResults() {

  const { data: positions } = await supabase.from('positions').select('*')

  const container = document.getElementById("results")
  container.innerHTML = ""

  for (let pos of positions) {

    const { data: candidates } = await supabase
      .from('candidates')
      .select('*')
      .eq('position_id', pos.id)

    let html = `<div class="position"><h3>${pos.title}</h3>`

    for (let c of candidates) {

      const { count } = await supabase
        .from('votes')
        .select('*', { count: 'exact', head: true })
        .eq('candidate_id', c.id)

      html += `
        <p>${c.name} — ${count || 0} votes</p>
      `
    }

    html += `</div>`

    container.innerHTML += html
  }
}