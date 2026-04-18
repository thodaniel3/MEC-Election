import { supabase } from "./supabaseClient.js";

const form = document.getElementById("resetForm");
const message = document.getElementById("message");

console.log("Reset script loaded ✔️");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;

  console.log("Sending reset for:", email);

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://futomsa-election2026.vercel.app/update-password.html"
  });

  if (error) {
    console.log("Supabase error:", error);
    message.textContent = error.message;
    message.style.color = "red";
  } else {
    message.textContent = "Reset link sent! Check your email.";
    message.style.color = "green";
  }
});