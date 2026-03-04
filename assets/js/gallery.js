const BUCKET_NAME = 'batch-gallery';

async function loadGallery() {
    const container = document.getElementById("galleryContainer");
    container.innerHTML = "<p>Loading memories...</p>";

    // 1. List files from Supabase Storage
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' }
    });

    if (error) {
        container.innerHTML = "<p>Error loading photos.</p>";
        return;
    }

    container.innerHTML = ""; // Clear loader

    data.forEach(file => {
        // 2. Get the public URL for each file
        const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(file.name);
        
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.onclick = () => openLightbox(publicUrl);
        div.innerHTML = `<img src="${publicUrl}" loading="lazy">`;
        container.appendChild(div);
    });
}

async function uploadPhoto(input) {
    const file = input.files[0];
    if (!file) return;

    const btn = document.querySelector('.btn-yellow');
    const originalText = btn.innerText;
    btn.innerText = "Uploading...";
    btn.classList.add('upload-loading');

    const fileName = `${Date.now()}-${file.name}`;
    
    // 3. Upload to Supabase Storage
    const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file);

    if (error) {
        alert("Upload failed: " + error.message);
    } else {
        alert("Photo added successfully!");
        loadGallery(); // Refresh the grid
    }

    btn.innerText = originalText;
    btn.classList.remove('upload-loading');
}

function openLightbox(url) {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    img.src = url;
    lb.style.display = 'flex';
}