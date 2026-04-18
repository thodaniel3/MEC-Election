import { supabase } from "./supabaseClient.js";

const form = document.getElementById("updateForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const password = document.getElementById("newPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (password !== confirm) {
    message.textContent = "Passwords do not match!";
    message.style.color = "red";
    return;
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) {
    message.textContent = error.message;
    message.style.color = "red";
  } else {
    message.textContent = "Password updated successfully!";
    message.style.color = "green";
  }
});