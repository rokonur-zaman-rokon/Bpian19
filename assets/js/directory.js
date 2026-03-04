async function loadMembers() {
    const container = document.getElementById("featuredMembers");
    if (!container) return;

    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("verified", true)
        .limit(6); // Show 6 members on the home page

    if (error) return console.error(error);

    renderList(data, container);
}

function renderList(list, target) {
    target.innerHTML = list.map(member => `
        <div class="member-card">
            <div style="width:70px; height:70px; background:#eee; border-radius:50%; margin:0 auto 15px;"></div>
            <h3 style="margin:5px 0;">${member.full_name}</h3>
            <p style="color:#666; font-size:0.9rem; margin:0;">${member.university || 'N/A'}</p>
            <p style="color:var(--brand-blue); font-weight:bold; font-size:0.8rem; margin-top:10px;">${member.profession || 'Alumni'}</p>
        </div>
    `).join('');
}

async function filterHomeResults() {
    const query = document.getElementById("mainSearch").value;
    const container = document.getElementById("featuredMembers");

    const { data } = await supabase
        .from("profiles")
        .select("*")
        .ilike('full_name', `%${query}%`);

    renderList(data, container);
}

// Initial Load
document.addEventListener("DOMContentLoaded", loadMembers);