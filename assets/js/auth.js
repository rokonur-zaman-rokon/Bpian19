/**
 * Signs up a new user for the Bpian '19 Portal.
 */
async function signup(email, password) {
  if (!window.supabaseClient) {
    alert("Supabase is not initialized. Check your config.js and script order.");
    return;
  }

  if (!email || !password) {
    alert("Please provide both email and password.");
    return;
  }

  try {
    const { data, error } = await window.supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        // Redirects back to login page after email confirmation
        emailRedirectTo: window.location.origin + '/login.html',
      }
    });

    if (error) throw error;

    if (data.user) {
      alert("Registration successful! Please check your email inbox for a verification link.");
    }
  } catch (error) {
    alert("Signup Error: " + error.message);
    console.error("Signup failure:", error);
  }
}

/**
 * Logs in an existing member.
 */
async function login(email, password) {
  if (!window.supabaseClient) {
    alert("Supabase not found.");
    return;
  }

  try {
    const { data, error } = await window.supabaseClient.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) throw error;

    // Success: Send user to the dashboard
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Login Error: " + error.message);
    console.error("Login failure:", error);
  }
}

/**
 * Logs out the user and returns to the home page.
 */
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