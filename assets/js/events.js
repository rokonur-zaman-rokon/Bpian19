async function loadEvents() {
    const container = document.getElementById("events");
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch events, attendee count/names, and registration status
    const { data: events, error } = await supabase
        .from("events")
        .select(`
            *,
            event_attendees (
                user_id,
                status,
                profiles (full_name)
            )
        `)
        .order('event_date', { ascending: true });

    if (error) {
        container.innerHTML = "<p>Error loading events.</p>";
        console.error(error);
        return;
    }

    container.innerHTML = events.map(event => {
        const attendees = event.event_attendees || [];
        
        // Find if the logged-in user has already registered for this event
        const myRSVP = attendees.find(a => a.user_id === user?.id);
        
        // Filter confirmed attendees to show in the list
        const confirmedNames = attendees
            .filter(a => a.status === 'confirmed')
            .map(a => a.profiles.full_name)
            .join(", ");

        return `
        <div class="card">
            <h3 style="color:var(--brand-blue); margin-top:0;">${event.title}</h3>
            <p>${event.description}</p>
            <p><strong>📅 Date:</strong> ${new Date(event.event_date).toDateString()}</p>
            
            <div style="background:var(--bg-light); padding:10px; border-radius:8px; margin:15px 0; font-size:0.85rem;">
                <strong>👥 Confirmed Attendees (${attendees.filter(a => a.status === 'confirmed').length}):</strong><br>
                <span style="color:var(--text-muted);">${confirmedNames || "No confirmed attendees yet."}</span>
            </div>

            ${myRSVP 
                ? `<div class="status-badge ${myRSVP.status}">Your Status: ${myRSVP.status.toUpperCase()}</div>`
                : `<button class="btn-yellow" onclick="registerForEvent('${event.id}')" style="width:100%; margin-top:10px;">Register & Pay</button>`
            }
        </div>
        `;
    }).join('');
}

async function registerForEvent(eventId) {
    const trxID = prompt("Please enter your bKash/Nagad Transaction ID to confirm registration:");
    
    if (!trxID) {
        alert("Transaction ID is required to process your registration.");
        return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
        .from("event_attendees")
        .insert([{ 
            event_id: eventId, 
            user_id: user.id,
            payment_reference: trxID,
            status: 'pending' 
        }]);

    if (error) {
        alert("Registration failed: " + error.message);
    } else {
        alert("Registration submitted! Wait for admin to verify your payment.");
        loadEvents(); // Refresh the list to show "PENDING" status
    }
}