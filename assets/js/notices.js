async function loadNotices() {
  const { data } = await supabase
    .from("notices")
    .select("*")
    .order("is_sticky", { ascending: false });

  const container = document.getElementById("notices");

  data.forEach(n => {
    container.innerHTML += `
      <div class="card">
        <h3>${n.title}</h3>
        <p>${n.content}</p>
      </div>
    `;
  });
}