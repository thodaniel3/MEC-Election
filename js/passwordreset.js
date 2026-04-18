import { supabase } from "./supabaseClient.js";

const form = document.getElementById("resetForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://futomsa-election2026.vercel.app/update-password.html"
  });

  if (error) {
    message.textContent = error.message;
    message.style.color = "red";
  } else {
    message.textContent = "Check your email for reset link!";
    message.style.color = "green";
  }
});