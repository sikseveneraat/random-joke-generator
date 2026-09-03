// JokeAPI Configuration
const API_URL = 'https://v2.jokeapi.dev/joke';

// DOM Elements
const categorySelect = document.getElementById('categorySelect');
const typeSelect = document.getElementById('typeSelect');
const safeModeCheckbox = document.getElementById('safeMode');
const getJokeBtn = document.getElementById('getJokeBtn');
const nextJokeBtn = document.getElementById('nextJokeBtn');
const copyBtn = document.getElementById('copyBtn');
const shareBtn = document.getElementById('shareBtn');
const revealBtn = document.getElementById('revealBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const jokeContainer = document.getElementById('jokeContainer');
const ctaSection = document.getElementById('ctaSection');
const spinner = document.getElementById('spinner');
const errorMessage = document.getElementById('errorMessage');
const jokeCategory = document.getElementById('jokeCategory');
const jokeType = document.getElementById('jokeType');
const jokeSetup = document.getElementById('jokeSetup');
const jokePunchline = document.getElementById('jokePunchline');
const jokeId = document.getElementById('jokeId');
const historySection = document.getElementById('historySection');
const historyList = document.getElementById('historyList');

// State
let currentJoke = null;
let jokeHistory = [];

// Event Listeners
getJokeBtn.addEventListener('click', () => {
    hideCtaSection();
    fetchJoke();
});

nextJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyJokeToClipboard);
shareBtn.addEventListener('click', shareJoke);
revealBtn.addEventListener('click', revealPunchline);
clearHistoryBtn.addEventListener('click', clearHistory);

// Initialize
loadHistory();

/**
 * Fetch a random joke from the API
 */
async function fetchJoke() {
    try {
        showSpinner(true);
        clearError();

        // Build API URL
        let url = API_URL;

        // Add category
        const category = categorySelect.value;
        if (category !== 'any') {
            url += `/${category}`;
        } else {
            url += '/any';
        }

        // Add parameters
        const params = new URLSearchParams();

        // Add type filter
        const type = typeSelect.value;
        if (type !== 'any') {
            params.append('type', type);
        }

        // Add safe mode
        if (safeModeCheckbox.checked) {
            params.append('safe-mode', 'true');
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'No jokes found matching your filters');
        }

        currentJoke = data;
        displayJoke(data);
        addToHistory(data);
    } catch (error) {
        showError(error.message);
    } finally {
        showSpinner(false);
    }
}

/**
 * Display the joke
 */
function displayJoke(joke) {
    // Category and type
    jokeCategory.textContent = joke.category;
    jokeType.textContent = joke.type;

    // Reset punchline
    revealBtn.style.display = 'none';
    jokePunchline.style.display = 'none';
    jokePunchline.textContent = '';

    if (joke.type === 'single') {
        // Single line joke
        jokeSetup.textContent = joke.joke;
    } else if (joke.type === 'twopart') {
        // Two-part joke
        jokeSetup.textContent = joke.setup;
        jokePunchline.textContent = joke.delivery;
        revealBtn.style.display = 'inline-block';
    }

    // Joke ID
    jokeId.textContent = `Joke ID: ${joke.id}`;

    // Show container
    jokeContainer.style.display = 'block';
}

/**
 * Reveal punchline
 */
function revealPunchline() {
    jokePunchline.style.display = 'block';
    revealBtn.style.display = 'none';
}

/**
 * Copy joke to clipboard
 */
function copyJokeToClipboard() {
    if (!currentJoke) return;

    let jokeText = '';
    if (currentJoke.type === 'single') {
        jokeText = currentJoke.joke;
    } else {
        jokeText = `${currentJoke.setup}\n${currentJoke.delivery}`;
    }

    navigator.clipboard.writeText(jokeText).then(() => {
        showNotification('Joke copied to clipboard! 📋');
    }).catch(err => {
        showError('Failed to copy joke');
    });
}

/**
 * Share joke
 */
function shareJoke() {
    if (!currentJoke) return;

    let jokeText = '';
    if (currentJoke.type === 'single') {
        jokeText = currentJoke.joke;
    } else {
        jokeText = `${currentJoke.setup}\n${currentJoke.delivery}`;
    }

    // Use Web Share API if available
    if (navigator.share) {
        navigator.share({
            title: 'Check out this joke!',
            text: jokeText
        }).catch(err => {
            if (err.name !== 'AbortError') {
                showError('Failed to share');
            }
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(jokeText).then(() => {
            showNotification('Joke copied! Share it manually 🎉');
        });
    }
}

/**
 * Add joke to history
 */
function addToHistory(joke) {
    const historyItem = {
        id: joke.id,
        category: joke.category,
        type: joke.type,
        setup: joke.type === 'single' ? joke.joke : joke.setup,
        delivery: joke.type === 'twopart' ? joke.delivery : null,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Avoid duplicates
    jokeHistory = jokeHistory.filter(item => item.id !== joke.id);
    jokeHistory.unshift(historyItem);
    jokeHistory = jokeHistory.slice(0, 20); // Keep only last 20

    saveHistory();
    displayHistory();
}

/**
 * Display history
 */
function displayHistory() {
    if (jokeHistory.length === 0) {
        historySection.style.display = 'none';
        return;
    }

    historyList.innerHTML = '';
    jokeHistory.forEach(item => {
        const historyItemEl = document.createElement('div');
        historyItemEl.className = 'history-item';
        historyItemEl.innerHTML = `
            <div class="history-item-text">${item.setup}</div>
            <div class="history-item-meta">${item.category} • ${item.type} • ${item.timestamp}</div>
        `;
        historyItemEl.addEventListener('click', () => {
            // Recreate the joke object and display it
            const joke = {
                id: item.id,
                category: item.category,
                type: item.type,
                joke: item.setup,
                setup: item.setup,
                delivery: item.delivery
            };
            currentJoke = joke;
            displayJoke(joke);
            jokeContainer.scrollIntoView({ behavior: 'smooth' });
        });
        historyList.appendChild(historyItemEl);
    });

    historySection.style.display = 'block';
}

/**
 * Save history to localStorage
 */
function saveHistory() {
    localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
}

/**
 * Load history from localStorage
 */
function loadHistory() {
    const saved = localStorage.getItem('jokeHistory');
    if (saved) {
        jokeHistory = JSON.parse(saved);
        displayHistory();
    }
}

/**
 * Clear history
 */
function clearHistory() {
    if (confirm('Are you sure you want to clear all joke history?')) {
        jokeHistory = [];
        localStorage.removeItem('jokeHistory');
        historySection.style.display = 'none';
        showNotification('History cleared! 🗑️');
    }
}

/**
 * Hide CTA section
 */
function hideCtaSection() {
    ctaSection.style.display = 'none';
}

/**
 * Show error message
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

/**
 * Clear error message
 */
function clearError() {
    errorMessage.classList.remove('show');
}

/**
 * Show notification
 */
function showNotification(message) {
    // Create temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00b894;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideUp 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Show/hide spinner
 */
function showSpinner(show) {
    spinner.classList.toggle('show', show);
}
