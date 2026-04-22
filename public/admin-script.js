// ============= GLOBAL CONFIG =============
let config = {};

// ============= INITIALIZATION =============
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadConfig();
        populateForm();
        loadMusic();
        loadPhotos();
        loadWishes();
        setupEventListeners();
    } catch (error) {
        console.error('Error during initialization:', error);
        showNotification('Error loading data', 'error');
    }
});

// ============= CONFIGURATION MANAGEMENT =============
async function loadConfig() {
    try {
        const response = await fetch('/api/config');
        config = await response.json();
    } catch (error) {
        console.error('Error loading config:', error);
        throw error;
    }
}

function populateForm() {
    document.getElementById('girlfriendName').value = config.girlfriendName || '';
    document.getElementById('birthdayDate').value = config.birthdayDate || '';
    document.getElementById('mainMessage').value = config.messages?.main || '';
    document.getElementById('subheading').value = config.messages?.subheading || '';
    document.getElementById('personalMessage').value = config.personalMessage || '';

    if (config.theme) {
        document.getElementById('primaryColor').value = config.theme.primaryColor;
        document.getElementById('primaryColorHex').textContent = config.theme.primaryColor;

        document.getElementById('secondaryColor').value = config.theme.secondaryColor;
        document.getElementById('secondaryColorHex').textContent = config.theme.secondaryColor;

        document.getElementById('backgroundColor').value = config.theme.backgroundColor;
        document.getElementById('backgroundColorHex').textContent = config.theme.backgroundColor;

        document.getElementById('textColor').value = config.theme.textColor;
        document.getElementById('textColorHex').textContent = config.theme.textColor;
    }
}

// ============= EVENT LISTENERS SETUP =============
function setupEventListeners() {
    // Config form
    const configForm = document.getElementById('configForm');
    if (configForm) {
        configForm.addEventListener('submit', handleConfigSubmit);
    }

    // Theme form
    const themeForm = document.getElementById('themeForm');
    if (themeForm) {
        themeForm.addEventListener('submit', handleThemeSubmit);
    }

    // Page-specific music forms
    const musicForm1 = document.getElementById('musicForm1');
    if (musicForm1) {
        musicForm1.addEventListener('submit', (e) => handleMusicSubmit(e, 1));
    }

    const musicForm2 = document.getElementById('musicForm2');
    if (musicForm2) {
        musicForm2.addEventListener('submit', (e) => handleMusicSubmit(e, 2));
    }

    const musicForm4 = document.getElementById('musicForm4');
    if (musicForm4) {
        musicForm4.addEventListener('submit', (e) => handleMusicSubmit(e, 4));
    }

    // Photo form
    const photoForm = document.getElementById('photoForm');
    if (photoForm) {
        photoForm.addEventListener('submit', handlePhotoSubmit);
    }

    // Color inputs
    const colorInputs = ['primaryColor', 'secondaryColor', 'backgroundColor', 'textColor'];
    colorInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', (e) => {
                const hexElement = document.getElementById(id + 'Hex');
                if (hexElement) {
                    hexElement.textContent = e.target.value;
                }
            });
        }
    });
}

// ============= FORM HANDLERS =============
async function handleConfigSubmit(e) {
    e.preventDefault();

    const updatedConfig = {
        ...config,
        girlfriendName: document.getElementById('girlfriendName').value,
        birthdayDate: document.getElementById('birthdayDate').value,
        personalMessage: document.getElementById('personalMessage').value,
        messages: {
            main: document.getElementById('mainMessage').value,
            subheading: document.getElementById('subheading').value
        }
    };

    try {
        const response = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedConfig)
        });

        if (response.ok) {
            config = await response.json();
            showNotification('Settings saved successfully!', 'success');
        } else {
            showNotification('Error saving settings', 'error');
        }
    } catch (error) {
        console.error('Error saving config:', error);
        showNotification('Error saving settings', 'error');
    }
}

async function handleThemeSubmit(e) {
    e.preventDefault();

    const updatedConfig = {
        ...config,
        theme: {
            primaryColor: document.getElementById('primaryColor').value,
            secondaryColor: document.getElementById('secondaryColor').value,
            backgroundColor: document.getElementById('backgroundColor').value,
            textColor: document.getElementById('textColor').value
        }
    };

    try {
        const response = await fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedConfig)
        });

        if (response.ok) {
            config = await response.json();
            showNotification('Theme colors updated!', 'success');
        } else {
            showNotification('Error saving theme', 'error');
        }
    } catch (error) {
        console.error('Error saving theme:', error);
        showNotification('Error saving theme', 'error');
    }
}

async function handlePhotoSubmit(e) {
    e.preventDefault();

    const fileInput = document.getElementById('photoInput');
    const file = fileInput.files[0];

    if (!file) {
        showNotification('Please select a file', 'error');
        return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('File size exceeds 5MB limit', 'error');
        return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
        showNotification('Please select a valid image file', 'error');
        return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
        const response = await fetch('/api/upload-photo', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            showNotification('Photo uploaded successfully!', 'success');
            fileInput.value = '';
            await loadPhotos();
        } else {
            showNotification('Error uploading photo', 'error');
        }
    } catch (error) {
        console.error('Error uploading photo:', error);
        showNotification('Error uploading photo', 'error');
    }
}

// ============= PHOTOS MANAGEMENT =============
async function loadPhotos() {
    try {
        const response = await fetch('/api/photos');
        const photos = await response.json();

        const photosList = document.getElementById('photosList');

        if (photos.length === 0) {
            photosList.innerHTML = '<p class="loading">No photos uploaded yet</p>';
            return;
        }

        photosList.innerHTML = photos.map(photo => {
            const filename = photo.split('/').pop();
            return `
                <div class="photo-item">
                    <img src="${photo}" alt="Uploaded photo">
                    <button class="delete-btn" onclick="deletePhoto('${filename}')">Delete</button>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading photos:', error);
        document.getElementById('photosList').innerHTML = '<p class="loading">Error loading photos</p>';
    }
}

async function deletePhoto(filename) {
    if (!confirm('Are you sure you want to delete this photo?')) {
        return;
    }

    try {
        const response = await fetch(`/api/photos/${filename}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showNotification('Photo deleted successfully!', 'success');
            await loadPhotos();
        } else {
            showNotification('Error deleting photo', 'error');
        }
    } catch (error) {
        console.error('Error deleting photo:', error);
        showNotification('Error deleting photo', 'error');
    }
}

// ============= MUSIC MANAGEMENT =============
async function handleMusicSubmit(e, page) {
    e.preventDefault();

    const fileInputId = `musicInput${page}`;
    const fileInput = document.getElementById(fileInputId);
    const file = fileInput.files[0];

    if (!file) {
        showNotification('Please select a file', 'error');
        return;
    }

    // Validate file size (20MB max)
    if (file.size > 20 * 1024 * 1024) {
        showNotification('File size exceeds 20MB limit', 'error');
        return;
    }

    // Validate file type
    if (!file.type.startsWith('audio/')) {
        showNotification('Please select a valid audio file', 'error');
        return;
    }

    // Determine the target filename based on page
    let targetFilename;
    if (page === 1) {
        targetFilename = 'happy-birthday-page.mp3';
    } else if (page === 2) {
        targetFilename = 'photos-page.mp3';
    } else if (page === 4) {
        targetFilename = 'happy-birthday-to-you.mp3';
    }

    const formData = new FormData();
    formData.append('music', file);
    formData.append('filename', targetFilename);

    try {
        const response = await fetch('/api/upload-music', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            showNotification(`Music for Page ${page} uploaded successfully!`, 'success');
            fileInput.value = '';
            await loadMusic();
        } else {
            showNotification('Error uploading music', 'error');
        }
    } catch (error) {
        console.error('Error uploading music:', error);
        showNotification('Error uploading music', 'error');
    }
}

async function loadMusic() {
    try {
        const response = await fetch('/api/music');
        const musicFiles = await response.json();

        // Map music files by page
        const pageMusic = {
            1: musicFiles.find(f => f.name === 'happy-birthday-page.mp3'),
            2: musicFiles.find(f => f.name === 'photos-page.mp3'),
            4: musicFiles.find(f => f.name === 'happy-birthday-to-you.mp3')
        };

        // Update each music section
        [1, 2, 4].forEach(page => {
            const musicList = document.getElementById(`musicList${page}`);
            const music = pageMusic[page];

            if (!music) {
                musicList.innerHTML = '<p class="loading">No music uploaded yet - Click the upload button above</p>';
                return;
            }

            musicList.innerHTML = `
                <div class="music-item">
                    <div class="music-details">
                        <div class="music-name">🎵 ${escapeHtml(music.name)}</div>
                        <div class="music-size">${music.size} MB</div>
                    </div>
                    <div class="music-actions">
                        <audio controls style="width: 200px; height: 30px;">
                            <source src="${music.url}" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                        <button class="delete-btn" onclick="deleteMusic('${music.name}')">Delete</button>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error loading music:', error);
        [1, 2, 4].forEach(page => {
            const musicList = document.getElementById(`musicList${page}`);
            if (musicList) {
                musicList.innerHTML = '<p class="loading">Error loading music</p>';
            }
        });
    }
}

async function deleteMusic(filename) {
    if (!confirm('Are you sure you want to delete this music file?')) {
        return;
    }

    try {
        const response = await fetch(`/api/music/${filename}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showNotification('Music file deleted successfully!', 'success');
            await loadMusic();
        } else {
            showNotification('Error deleting music file', 'error');
        }
    } catch (error) {
        console.error('Error deleting music:', error);
        showNotification('Error deleting music file', 'error');
    }
}

// ============= WISHES MANAGEMENT =============
async function loadWishes() {
    try {
        const response = await fetch('/api/wishes');
        const wishes = await response.json();

        const wishesList = document.getElementById('adminWishesList');

        if (wishes.length === 0) {
            wishesList.innerHTML = '<p class="loading">No wishes yet</p>';
            return;
        }

        // Display wishes in reverse order (newest first)
        wishesList.innerHTML = wishes
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(wish => {
                const date = new Date(wish.timestamp);
                const timeString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                });

                return `
                    <div class="wish-item">
                        <div class="wish-content">
                            <div class="wish-name">✨ ${escapeHtml(wish.name)}</div>
                            <div class="wish-message">"${escapeHtml(wish.message)}"</div>
                            <div class="wish-time">${timeString}</div>
                        </div>
                        <button class="delete-btn" onclick="deleteWish(${wish.id})">Delete</button>
                    </div>
                `;
            })
            .join('');
    } catch (error) {
        console.error('Error loading wishes:', error);
        document.getElementById('adminWishesList').innerHTML = '<p class="loading">Error loading wishes</p>';
    }
}

async function deleteWish(id) {
    if (!confirm('Are you sure you want to delete this wish?')) {
        return;
    }

    try {
        const response = await fetch(`/api/wishes/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showNotification('Wish deleted successfully!', 'success');
            await loadWishes();
        } else {
            showNotification('Error deleting wish', 'error');
        }
    } catch (error) {
        console.error('Error deleting wish:', error);
        showNotification('Error deleting wish', 'error');
    }
}

// ============= UTILITY FUNCTIONS =============
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
