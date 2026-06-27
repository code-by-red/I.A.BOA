// Events data
let events = [];

// DOM Elements
const hamburgerBtn = document.getElementById('hamburger-btn');
const menuDropdown = document.getElementById('menu-dropdown');
const fabBtn = document.getElementById('fab-btn');
const modalOverlay = document.getElementById('modal-overlay');
const closeModalBtn = document.getElementById('close-modal-btn');
const eventForm = document.getElementById('event-form');
const eventsGrid = document.getElementById('events-grid');
const bubblesContainer = document.getElementById('bubbles-container');
const particlesContainer = document.getElementById('particles-container');
const reportModalOverlay = document.getElementById('report-modal-overlay');
const closeReportModalBtn = document.getElementById('close-report-modal-btn');
const reportForm = document.getElementById('report-form');

// Create ambient bubbles
function createBubbles() {
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        const size = Math.random() * 300 + 100;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        bubble.style.animationDelay = `${Math.random() * 20}s`;
        bubble.style.animationDuration = `${Math.random() * 20 + 15}s`;
        bubblesContainer.appendChild(bubble);
    }
}

// Create floating particles
function createParticles() {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
        particlesContainer.appendChild(particle);
    }
}

// Format date
function formatDate(datetime) {
    const date = new Date(datetime);
    const options = { 
        day: '2-digit', 
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('pt-BR', options);
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<span class="star-filled">★</span>';
        } else {
            stars += '<span class="star-empty">★</span>';
        }
    }
    return stars;
}

// Render events
function renderEvents() {
    if (events.length === 0) {
        eventsGrid.innerHTML = `
            <div class="empty-state col-span-full text-center py-20">
                <div class="text-6xl mb-4">🎉</div>
                <h3 class="text-2xl font-bold text-gray-400 mb-2">Nenhum rolê ainda</h3>
                <p class="text-gray-500">Seja o primeiro a adicionar!</p>
            </div>
        `;
        return;
    }

    eventsGrid.innerHTML = events.map((event, index) => `
        <div class="event-card glass-card rounded-2xl p-6 animate-slide-in cursor-pointer" style="animation-delay: ${index * 0.1}s">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-white transition-colors duration-300">${event.name}</h3>
                <span class="badge-glow px-4 py-2 rounded-full text-xs font-black ${event.type === 'gratuito' ? 'bg-neon-green text-black' : 'bg-neon-pink text-white'}">
                    ${event.type === 'gratuito' ? 'GRÁTIS' : 'PAGO'}
                </span>
            </div>
            <div class="space-y-3 text-gray-300">
                <p class="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 icon-glow text-[#39FF14]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="font-medium">${event.location}</span>
                </p>
                <p class="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 icon-glow text-[#FF00FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="font-medium">${formatDate(event.datetime)}</span>
                </p>
            </div>
            <div class="mt-5 flex items-center justify-between">
                <div class="text-xl">
                    ${generateStars(event.rating)}
                </div>
                <button onclick="openReportModal(${event.id}, '${event.name.replace(/'/g, "\\'")}')" class="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-red-400/10">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Denunciar
                </button>
            </div>
        </div>
    `).join('');
}

// Toggle menu dropdown
function toggleMenu() {
    menuDropdown.classList.toggle('open');
}

// Close menu when clicking outside
function closeMenuOnOutsideClick(e) {
    if (!hamburgerBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.classList.remove('open');
    }
}

// Toggle modal
function toggleModal() {
    modalOverlay.classList.toggle('open');
}

// Toggle report modal
function toggleReportModal() {
    reportModalOverlay.classList.toggle('open');
}

// Open report modal with event data
function openReportModal(eventId, eventName) {
    document.getElementById('report-event-id').value = eventId;
    document.getElementById('report-event-name').value = eventName;
    document.getElementById('report-event-display').value = eventName;
    toggleReportModal();
}

// Send report to Google Apps Script
async function sendReportToSheet(reportData) {
    try {
        const response = await fetch('/api/roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...reportData, type: 'report' })
        });
        console.log('Report sent to sheet');
        alert('Denúncia enviada com sucesso!');
    } catch (error) {
        console.error('Error sending report to sheet:', error);
        alert('Erro ao enviar denúncia. Tente novamente.');
    }
}

// Add event to Google Apps Script
async function addEventToSheet(eventData) {
    try {
        const response = await fetch('/api/roles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData)
        });
        console.log('Event sent to sheet');
        // Reload events from sheet after adding
        await loadEventsFromSheet();
    } catch (error) {
        console.error('Error sending event to sheet:', error);
        alert('Erro ao adicionar evento. Tente novamente.');
    }
}

// Load events from Google Apps Script
async function loadEventsFromSheet() {
    try {
        const response = await fetch('/api/roles');
        const data = await response.json();
        
        if (Array.isArray(data)) {
            events = data;
            renderEvents();
        } else if (data && data.events) {
            events = data.events;
            renderEvents();
        } else {
            throw new Error('Invalid data format');
        }
    } catch (error) {
        console.error('Error loading events:', error);
        // Show error state
        eventsGrid.innerHTML = `
            <div class="empty-state col-span-full text-center py-20">
                <div class="text-6xl mb-4">⚠️</div>
                <h3 class="text-2xl font-bold text-gray-400 mb-2">Erro ao carregar eventos</h3>
                <p class="text-gray-500">Verifique a conexão com a planilha</p>
            </div>
        `;
    }
}

// Event listeners
hamburgerBtn.addEventListener('click', toggleMenu);
document.addEventListener('click', closeMenuOnOutsideClick);
fabBtn.addEventListener('click', toggleModal);
closeModalBtn.addEventListener('click', toggleModal);
closeReportModalBtn.addEventListener('click', toggleReportModal);

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        toggleModal();
    }
});

reportModalOverlay.addEventListener('click', (e) => {
    if (e.target === reportModalOverlay) {
        toggleReportModal();
    }
});

eventForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newEvent = {
        id: Date.now(),
        name: document.getElementById('event-name').value,
        location: document.getElementById('event-location').value,
        datetime: document.getElementById('event-datetime').value,
        type: document.getElementById('event-type').value,
        rating: parseInt(document.getElementById('event-rating').value)
    };

    // Send to Google Apps Script
    await addEventToSheet(newEvent);
    
    toggleModal();
    eventForm.reset();
});

reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const reportData = {
        eventId: document.getElementById('report-event-id').value,
        eventName: document.getElementById('report-event-name').value,
        reason: document.getElementById('report-reason').value,
        contact: document.getElementById('report-contact').value,
        timestamp: new Date().toISOString()
    };

    // Send report to Google Apps Script
    await sendReportToSheet(reportData);
    
    toggleReportModal();
    reportForm.reset();
});

// Initialize
createBubbles();
createParticles();
loadEventsFromSheet();
