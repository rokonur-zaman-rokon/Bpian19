async function signup() {

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const { data, error } = await window.supabase.auth.signUp({
  email: email,
  password: password
})

if (error) {
  alert("Signup Error: " + error.message)
} else {
  alert("Signup successful. Check your email.")
}

}
// auth.js
async function login() {

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const { data, error } =
await window.supabase.auth.signInWithPassword({
  email: email,
  password: password
})

if (error) {
  alert("Login Error: " + error.message)
} else {
  window.location.href = "dashboard.html"
}

}

async function logout() {
  try {
    const { error } = await window.supabaseClient.auth.signOut();
    if (error) throw error;
    window.location.href = "index.html";
  } catch (error) {
    console.error("Logout error:", error.message);
  }
}

/**
 * Prevents unauthorized access to protected pages.
 * Add this to the top of dashboard.html.
 */
async function protectPage() {
  if (!window.supabaseClient) return;

  const { data: { session }, error } = await window.supabaseClient.auth.getSession();
  
  if (error || !session) {
    // If no active session, kick them back to login
    window.location.href = "login.html";
  }
  
  return session?.user;
}