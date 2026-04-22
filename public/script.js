// ============= GLOBAL CONFIG =============
let config = {};
let currentPage = 1;
const totalPages = 4;
let musicEnabled = true;
const pageMusic = {
    1: 'bgMusic',        // Happy Birthday page
    2: 'photoPageMusic', // Photos page
    3: 'bgMusic',        // Wishes page (same as home)
    4: 'cakePageMusic'   // Cake page with "Happy Birthday To You"
};

// ============= CUSTOM CURSOR TRACKING =============
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let dotX = 0;
let dotY = 0;

function initCursorTrail() {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    document.body.appendChild(dot);
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Create trail particles
        if (Math.random() > 0.7) {
            createTrailParticle(mouseX, mouseY);
        }
    });
    
    // Animate cursor following
    function animateCursor() {
        // Smooth follow for main cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Faster follow for dot
        dotX += (mouseX - dotX) * 0.4;
        dotY += (mouseY - dotY) * 0.4;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add active class on click
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });
}

function createTrailParticle(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    trail.style.animation = 'trailFade 0.8s ease-out forwards';
    
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 800);
}

// Initialize on page load
window.addEventListener('load', initCursorTrail);


// ============= PAGE NAVIGATION SYSTEM =============
function goToPage(pageNum) {
    if (pageNum < 1 || pageNum > totalPages) return;
    
    // Hide current page
    document.getElementById('page' + currentPage).classList.remove('active');
    
    // Show new page
    document.getElementById('page' + pageNum).classList.add('active');
    
    // Update dots
    document.querySelectorAll('.page-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === pageNum - 1);
    });
    
    // Update buttons
    document.getElementById('prevBtn').disabled = pageNum === 1;
    document.getElementById('nextBtn').disabled = pageNum === totalPages;
    
    // Switch music based on page
    switchMusicForPage(pageNum);
    
    currentPage = pageNum;
}

// Switch music based on current page
function switchMusicForPage(pageNum) {
    if (!musicEnabled) return;
    
    // Stop all music
    const allMusic = ['bgMusic', 'photoPageMusic', 'cakePageMusic'];
    allMusic.forEach(id => {
        const audio = document.getElementById(id);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
    
    // Play music for current page
    const musicId = pageMusic[pageNum];
    if (musicId) {
        const audio = document.getElementById(musicId);
        if (audio) {
            audio.currentTime = 0;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .catch(error => {
                        console.log('Audio autoplay prevented by browser:', error);
                        // Try again with muted first approach
                        audio.muted = true;
                        audio.play().then(() => {
                            setTimeout(() => {
                                audio.muted = false;
                                audio.play();
                            }, 100);
                        });
                    });
            }
        }
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

function previousPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

// ============= FLOATING PARTICLES BACKGROUND =============
function createFloatingParticles() {
    const body = document.body;
    if (!body) return;

    const particleCount = 15;
    const particleColors = ['#00d4ff', '#ff006e', '#00f5ff'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 30 + 10;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 5;
        
        particle.style.animation = `float${Math.floor(Math.random() * 3) + 1} ${duration}s linear infinite ${delay}s`;
        particle.style.filter = `drop-shadow(0 0 ${size / 2}px ${particleColors[Math.floor(Math.random() * particleColors.length)]})`;
        
        body.insertBefore(particle, body.firstChild);
    }
}

// Add floating animation keyframes dynamically
function addFloatingAnimations() {
    if (!document.getElementById('floatingAnimations')) {
        const style = document.createElement('style');
        style.id = 'floatingAnimations';
        style.textContent = `
            @keyframes float1 {
                0% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
                25% { transform: translateY(-100px) translateX(50px); opacity: 0.8; }
                50% { transform: translateY(-50px) translateX(-30px); opacity: 0.6; }
                75% { transform: translateY(-150px) translateX(80px); opacity: 0.7; }
                100% { transform: translateY(-200px) translateX(0px); opacity: 0; }
            }
            
            @keyframes float2 {
                0% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
                25% { transform: translateY(-120px) translateX(-60px); opacity: 0.7; }
                50% { transform: translateY(-80px) translateX(40px); opacity: 0.6; }
                75% { transform: translateY(-160px) translateX(-90px); opacity: 0.8; }
                100% { transform: translateY(-220px) translateX(0px); opacity: 0; }
            }
            
            @keyframes float3 {
                0% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
                25% { transform: translateY(-110px) translateX(70px); opacity: 0.6; }
                50% { transform: translateY(-70px) translateX(-50px); opacity: 0.7; }
                75% { transform: translateY(-170px) translateX(60px); opacity: 0.8; }
                100% { transform: translateY(-210px) translateX(0px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============= PORTAL ANIMATION =============
function initializePortal() {
    const portalScreen = document.getElementById('portalScreen');
    const mainContent = document.querySelector('.main-content');
    let portalOpened = false;

    function openPortal() {
        if (portalOpened) return;
        portalOpened = true;

        // Remove portal screen after animation
        setTimeout(() => {
            portalScreen.classList.add('active');
            portalScreen.style.pointerEvents = 'none';
        }, 4000);

        // Make content visible and fade in
        if (mainContent) {
            mainContent.style.opacity = '1';
        }

        // Play confetti after a brief delay
        setTimeout(() => {
            createConfetti();
        }, 4200);
    }

    // Open portal on click
    if (portalScreen) {
        portalScreen.addEventListener('click', () => {
            openPortal();
            // Play music on user interaction (fixes autoplay restriction)
            playMusicNow();
        });

        // Auto-open portal after 5 seconds if not clicked
        setTimeout(() => {
            if (!portalOpened) {
                openPortal();
                // Try to play music after auto-open
                setTimeout(() => playMusicNow(), 500);
            }
        }, 5000);
    }
}

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Add floating animations to document
        addFloatingAnimations();
        
        // Create floating particles
        createFloatingParticles();

        // Initialize portal animation
        initializePortal();

        // Initialize page navigation
        goToPage(1);

        // Load configuration
        await loadConfig();
        
        // Setup page
        applyTheme();
        loadWishes();
        loadPhotos();
        loadVideo();
        startCountdown();
        setupEventListeners();
        setupMusicControl();
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

// ============= CONFIGURATION =============
async function loadConfig() {
    try {
        const response = await fetch('/api/config');
        config = await response.json();
        
        // Update page with config
        document.getElementById('girlfriendName').textContent = config.girlfriendName;
        document.getElementById('mainMessage').textContent = config.messages.main;
        document.getElementById('subheading').textContent = config.messages.subheading;
        document.getElementById('personalMessage').textContent = config.personalMessage || 
            'Thank you for being the best part of my life. Every moment with you is special. Happy Birthday! 💕';
    } catch (error) {
        console.error('Error loading config:', error);
    }
}

// ============= THEME APPLICATION =============
function applyTheme() {
    if (config.theme) {
        document.documentElement.style.setProperty('--primary-color', config.theme.primaryColor);
        document.documentElement.style.setProperty('--secondary-color', config.theme.secondaryColor);
        document.documentElement.style.setProperty('--bg-color', config.theme.backgroundColor);
        document.documentElement.style.setProperty('--text-color', config.theme.textColor);
    }
}

// ============= COUNTDOWN TIMER =============
function startCountdown() {
    function updateCountdown() {
        // Parse date string properly and set to midnight (start of day)
        const dateParts = config.birthdayDate.split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1;
        const day = parseInt(dateParts[2]);
        
        // Set to 00:00:00 AM (midnight) on birthday - start of the birthday
        const birthdayDate = new Date(year, month, day, 0, 0, 0).getTime();
        const now = new Date().getTime();
        const timeLeft = birthdayDate - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('countdown').innerHTML = '<h3 style="color: #ff69b4; font-size: 2rem;">🎉 It\'s Birthday Time! 🎉</h3>';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============= WISHES MANAGEMENT =============
async function loadWishes() {
    try {
        const response = await fetch('/api/wishes');
        const wishes = await response.json();
        
        const container = document.getElementById('wishesContainer');
        
        if (wishes.length === 0) {
            container.innerHTML = '<p class="loading">No wishes yet. Be the first to send one! 🌟</p>';
            return;
        }

        // Display wishes in reverse order (newest first)
        container.innerHTML = wishes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(wish => createWishCard(wish))
            .join('');
    } catch (error) {
        console.error('Error loading wishes:', error);
    }
}

function createWishCard(wish) {
    const date = new Date(wish.timestamp);
    const timeString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    return `
        <div class="wish-card" data-id="${wish.id}">
            <div class="wish-header">
                <span class="wish-name">✨ ${wish.name}</span>
                <span class="wish-time">${timeString}</span>
            </div>
            <p class="wish-message">${escapeHtml(wish.message)}</p>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ============= WISH FORM =============
function setupEventListeners() {
    const wishForm = document.getElementById('wishForm');
    if (wishForm) {
        wishForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('wishName').value;
            const message = document.getElementById('wishMessage').value;
            const anonymous = document.getElementById('anonymous').checked;

            try {
                const response = await fetch('/api/wishes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, message, anonymous })
                });

                if (response.ok) {
                    // Clear form
                    wishForm.reset();
                    
                    // Reload wishes
                    await loadWishes();
                    
                    // Show success message
                    alert('Your wish has been sent! 🎉');
                } else {
                    alert('Error sending wish. Please try again.');
                }
            } catch (error) {
                console.error('Error submitting wish:', error);
                alert('Error sending wish. Please try again.');
            }
        });
    }
}

// ============= PHOTO GALLERY =============
async function loadPhotos() {
    try {
        const response = await fetch('/api/photos');
        const photos = await response.json();
        
        // Load featured photos (top 3)
        const featuredGrid = document.getElementById('featuredGalleryGrid');
        const featuredPhotos = photos.slice(0, 3);
        
        if (featuredPhotos.length === 0) {
            if (featuredGrid) {
                featuredGrid.innerHTML = '<p class="loading">No photos yet. Check back soon! ✨</p>';
            }
        } else {
            if (featuredGrid) {
                featuredGrid.innerHTML = featuredPhotos.map(photo => `
                    <div class="gallery-item" onclick="openPhoto('${photo}')">
                        <img src="${photo}" alt="Birthday memory" loading="lazy">
                    </div>
                `).join('');
            }
        }
        
        // Load all photos
        const galleryGrid = document.getElementById('galleryGrid');
        if (photos.length === 0) {
            galleryGrid.innerHTML = '<p class="loading">No photos yet. Check back soon! ✨</p>';
            return;
        }

        galleryGrid.innerHTML = photos.map(photo => `
            <div class="gallery-item" onclick="openPhoto('${photo}')">
                <img src="${photo}" alt="Birthday memory" loading="lazy">
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading photos:', error);
    }
}

// ============= VIDEO LOADING =============
async function loadVideo() {
    try {
        const response = await fetch('/api/video');
        const videoData = await response.json();
        
        const videoContainer = document.getElementById('videoContainer');
        const videoPlaceholder = document.getElementById('videoPlaceholder');
        const specialVideo = document.getElementById('specialVideo');
        
        if (videoData && videoData.url) {
            specialVideo.src = videoData.url;
            videoContainer.style.display = 'block';
            videoPlaceholder.style.display = 'none';
        } else {
            videoContainer.style.display = 'none';
            videoPlaceholder.style.display = 'block';
        }
    } catch (error) {
        console.error('Error loading video:', error);
    }
}

// ============= CAKE CUTTING ANIMATION =============
function cutCake() {
    const knife = document.querySelector('.knife');
    const balloons = document.querySelectorAll('.balloon');
    const mainCake = document.getElementById('mainCake');
    const cakeSlice = document.getElementById('cakeSlice');
    const sliceDestination = document.getElementById('sliceDestination');
    
    // Prevent multiple clicks
    const cakeBtn = document.querySelector('.cake-cut-btn');
    cakeBtn.disabled = true;
    
    // Play cut sound
    playSound('cutSound');
    
    // Start knife cutting animation
    knife.classList.add('cutting');
    
    // Fade out main cake slightly
    mainCake.classList.add('cutting-animation');
    
    // Show slice destination
    sliceDestination.style.opacity = '1';
    
    // Create and animate the slice
    setTimeout(() => {
        createAndAnimateSlice(cakeSlice, sliceDestination);
    }, 300);
    
    // Create star burst effect
    setTimeout(() => {
        createStarBurst();
    }, 500);
    
    // Create spark effect
    setTimeout(() => {
        createSparks();
    }, 600);
    
    // Launch balloons
    balloons.forEach((balloon, index) => {
        setTimeout(() => {
            balloon.classList.add('released');
        }, index * 100 + 400);
    });
    
    // Play cake page music if available
    const cakeMusic = document.getElementById('cakePageMusic');
    if (cakeMusic && musicEnabled) {
        cakeMusic.play().catch(err => console.log('Music play prevented:', err));
    }
    
    // Reset button after animation
    setTimeout(() => {
        cakeBtn.disabled = false;
        knife.classList.remove('cutting');
        mainCake.classList.remove('cutting-animation');
    }, 3000);
}

function createStarBurst() {
    const starsContainer = document.getElementById('starsContainer');
    const starCount = 15;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const angle = (i / starCount) * Math.PI * 2;
        const distance = 200 + Math.random() * 100;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        star.style.setProperty('--tx', tx + 'px');
        star.style.setProperty('--ty', ty + 'px');
        star.style.left = 'calc(50% - 3px)';
        star.style.top = 'calc(50% - 3px)';
        star.style.animation = `starBurst 1s ease-out forwards`;
        
        starsContainer.appendChild(star);
        
        setTimeout(() => star.remove(), 1000);
    }
}

function createSparks() {
    const sparksContainer = document.getElementById('sparksContainer');
    const sparkCount = 20;
    
    for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark';
        
        const angle = Math.random() * Math.PI * 2;
        const tx = Math.cos(angle) * (50 + Math.random() * 50);
        const ty = (50 + Math.random() * 50) - 100;
        
        spark.style.left = 'calc(50% - 2px)';
        spark.style.top = 'calc(50% - 2px)';
        spark.style.setProperty('--tx', tx + 'px');
        spark.style.animation = `sparkFall 1.5s ease-out forwards`;
        
        sparksContainer.appendChild(spark);
        
        setTimeout(() => spark.remove(), 1500);
    }
}


function createAndAnimateSlice(container, destination) {
    // Clear previous slice
    container.innerHTML = '';
    container.className = 'cake-slice';
    
    // Create slice element with layers
    const sliceElement = document.createElement('div');
    sliceElement.className = 'cake-slice-element';
    
    // Add cream drip
    const cream = document.createElement('div');
    cream.className = 'slice-cream';
    sliceElement.appendChild(cream);
    
    container.appendChild(sliceElement);
    
    // Trigger slice appearance and cutting animation
    setTimeout(() => {
        container.classList.add('sliced');
        setTimeout(() => {
            container.classList.add('cutting');
            
            // Animate slice towards Sanchita's destination
            if (destination) {
                setTimeout(() => {
                    animateSliceToDestination(container, destination);
                }, 200);
            }
        }, 200);
    }, 50);
}

function animateSliceToDestination(sliceElement, destination) {
    const destRect = destination.getBoundingClientRect();
    const sliceRect = sliceElement.getBoundingClientRect();
    
    // Calculate distance
    const dx = destRect.left - sliceRect.left;
    const dy = destRect.top - sliceRect.top;
    
    // Animate using transform
    sliceElement.style.transition = 'none';
    sliceElement.style.animation = `slicePullUpEnhanced 1s cubic-bezier(0.36, 0, 0.66, -0.56) forwards`;
}


// ============= PHOTO MODAL =============
function openPhoto(src) {
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    modalImage.src = src;
    modal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('photoModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});

// ============= MUSIC CONTROL =============
function setupMusicControl() {
    const musicToggle = document.getElementById('musicToggle');

    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            musicEnabled = !musicEnabled;
            
            if (musicEnabled) {
                // Turn music on - play current page's music
                playMusicNow();
                musicToggle.textContent = '🔊 Music On';
                musicToggle.classList.add('active');
            } else {
                // Turn music off - pause all audio
                const allMusic = ['bgMusic', 'photoPageMusic', 'cakePageMusic'];
                allMusic.forEach(id => {
                    const audio = document.getElementById(id);
                    if (audio) audio.pause();
                });
                musicToggle.textContent = '🔇 Music Off';
                musicToggle.classList.remove('active');
            }
        });

        // Try to autoplay music for first page (may be blocked by browser)
        switchMusicForPage(currentPage);
    }
}

function playMusicNow() {
    if (!musicEnabled) return;
    switchMusicForPage(currentPage);
}

document.addEventListener('DOMContentLoaded', setupMusicControl);

// ============= CONFETTI ANIMATION =============
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;

    const confettiPieces = 50;
    const colors = ['#00d4ff', '#ff006e', '#00f5ff', '#00d4ff', '#ff006e', '#00f5ff'];

    for (let i = 0; i < confettiPieces; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random color
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Random position
        confetti.style.left = Math.random() * 100 + '%';
        
        // Random delay
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        
        // Random animation duration
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        // Add glow effect
        confetti.style.boxShadow = `0 0 10px ${confetti.style.backgroundColor}`;
        
        // Random shape (square or circle)
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        }
        
        container.appendChild(confetti);
    }
}

// Trigger confetti on page load and periodically
document.addEventListener('DOMContentLoaded', () => {
    createConfetti();
});

// ============= SOUND EFFECTS =============
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(err => console.log('Sound play prevented:', err));
    }
}

// ============= CLICK RIPPLE EFFECT =============
function addClickRipple(e) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = (e.clientX - 10) + 'px';
    ripple.style.top = (e.clientY - 10) + 'px';
    ripple.style.animation = 'rippleExpand 0.6s ease-out';
    
    document.body.appendChild(ripple);
    
    // Play click sound
    playSound('clickSound');
    
    setTimeout(() => ripple.remove(), 600);
}

// Add click ripple effect to entire document
document.addEventListener('click', addClickRipple);

// Create new confetti every 3 seconds
setInterval(() => {
    const container = document.getElementById('confettiContainer');
    if (container && container.children.length < 100) {
        createConfetti();
    }
}, 3000);
