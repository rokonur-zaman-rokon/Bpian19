async function signup(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) alert(error.message);
  else alert("Check email for verification.");
}

async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) alert(error.message);
  else window.location.href = "dashboard.html";
}

async function logout() {
  await supabase.auth.signOut();
  window.location.href = "index.html";
}

async function protectPage() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) window.location.href = "login.html";
}