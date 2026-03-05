/**
 * Signs up a new user.
 * Includes validation, custom redirect, and email confirmation handling.
 */
async function signup(email, password) {
  if (!email || !password) {
    alert("Please provide both email and password.");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        // Redirects user back to login after they click the email link
        emailRedirectTo: window.location.origin + '/login.html',
      }
    });

    if (error) throw error;

    if (data.user) {
      if (data.session === null) {
        // This triggers if "Confirm Email" is ENABLED in Supabase settings
        alert("Success! Please check your email inbox to verify your account.");
      } else {
        // This triggers if "Confirm Email" is DISABLED
        alert("Account created successfully!");
        window.location.href = "dashboard.html";
      }
    }
  } catch (error) {
    if (error.message.includes("already registered")) {
      alert("This email is already in use. Try logging in instead.");
    } else {
      alert("Signup Error: " + error.message);
    }
    console.error("Full Error Object:", error);
  }
}

/**
 * Logs in a user with email and password.
 */
async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) throw error;

    // Successful login
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Login Error: " + error.message);
  }
}

/**
 * Sign out and return to the home page.
 */
async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    window.location.href = "index.html";
  } catch (error) {
    console.error("Logout Error:", error.message);
  }
}

/**
 * Protects pages from unauthorized access.
 * Use 'getSession' for faster client-side checks.
 */
async function protectPage() {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "login.html";
  }
  return session?.user;
}