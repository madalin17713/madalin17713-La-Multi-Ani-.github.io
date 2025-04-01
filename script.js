function playMusic() {
    const song = document.getElementById('song');
    
    if (song.paused) {
        song.play();
    } else {
        song.pause();
    }
}

// Funcție pentru a schimba culorile fundalului
function changeGradientColors() {
    // Obține un număr aleatoriu între 0 și 360 pentru a determina nuanța de bază
    const baseHue = Math.floor(Math.random() * 360);
    
    // Creează 4 nuanțe diferite ale aceleiași culori
    const color1 = `hsl(${baseHue}, 80%, 40%)`;
    const color2 = `hsl(${baseHue}, 70%, 50%)`;
    const color3 = `hsl(${baseHue}, 60%, 60%)`;
    const color4 = `hsl(${baseHue}, 50%, 70%)`;
    
    // Aplică noile culori la gradient
    document.body.style.background = `linear-gradient(45deg, ${color1}, ${color2}, ${color3}, ${color4})`;
    document.body.style.backgroundSize = '400% 400%';
}

// Schimbă culorile la fiecare 10 secunde
setInterval(changeGradientColors, 10000);

// Inițializează culorile la încărcarea paginii
document.addEventListener('DOMContentLoaded', function() {
    // Create popup elements
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    
    const popupClose = document.createElement('div');
    popupClose.className = 'popup-close';
    popupClose.innerHTML = '×';
    
    const popupTitle = document.createElement('h2');
    popupTitle.className = 'popup-title';
    popupTitle.textContent = 'Photo Memories';
    
    const photoCollage = document.createElement('div');
    photoCollage.className = 'photo-collage';
    
    // Append elements
    popupContent.appendChild(popupClose);
    popupContent.appendChild(popupTitle);
    popupContent.appendChild(photoCollage);
    popupOverlay.appendChild(popupContent);
    document.body.appendChild(popupOverlay);
    
    // Sample images for the collage (replace with your actual images)
    const collageImages = [
        'poza solo1.jpg',
        'poza solo2.jpg',
        'poza5.jpg',
        'poza2.jpg',
        'poza6.jpg',
    ];
    
    // Function to open popup
    function openPopup(sourceElement) {
        // Clear previous collage
        photoCollage.innerHTML = '';
        
        // Create collage items
        collageImages.forEach((imgSrc, index) => {
            const collageItem = document.createElement('div');
            collageItem.className = 'collage-item';
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Collage Image ${index + 1}`;
            
            collageItem.appendChild(img);
            photoCollage.appendChild(collageItem);
        });
        
        // Show popup with animation
        popupOverlay.classList.add('active');
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close popup
    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Add click event to close button
    popupClose.addEventListener('click', closePopup);
    
    // Close popup when clicking outside content
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Add click events to all gallery items
    const galleryItems = document.querySelectorAll('.thumbnail, .grid-item, .masonry-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openPopup(this);
        });
    });
    
    // Close with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            closePopup();
        }
    });
    
    const container = document.querySelector('.gallery-container');
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    const prevBtn = document.querySelector('.gallery-arrow.prev');
    const nextBtn = document.querySelector('.gallery-arrow.next');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Update the gallery to show the current slide
    function updateGallery() {
        container.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Event listeners for arrows
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateGallery();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateGallery();
    });
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateGallery();
        });
    });
});