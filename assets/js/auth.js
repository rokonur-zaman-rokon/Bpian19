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
        emailRedirectTo: window.location.origin + '/login.html',
      }
    });

    if (error) throw error;

    if (data.user) {
      alert("Registration successful! Check your email for a verification link.");
    }
  } catch (error) {
    alert("Signup Error: " + error.message);
    console.error(error);
  }
}

// Keep your existing login/logout/protectPage functions below, 
// ensuring they also use window.supabaseClient.