function generateReport(method, score, positiveActions, totalActions) {
    const overlay = document.querySelector('.overlay');
    const reportContent = document.getElementById('report-content');
    
    let cognitiveGain;
    let explanation;
    
    switch(method) {
        case 'green-game':
            cognitiveGain = Math.min(100, Math.round((score / 100) * (positiveActions / totalActions) * 100));
            explanation = `Your engagement with green stimuli has enhanced your visual processing pathways, potentially increasing your ability to focus and reducing mental fatigue.`;
            break;
        case 'meditation':
            cognitiveGain = Math.min(100, Math.round((score / 300) * 100));
            explanation = `Regular meditation practice has been shown to increase grey matter in areas associated with learning, memory, and emotional regulation.`;
            break;
        case 'art-therapy':
            cognitiveGain = Math.min(100, Math.round((score / 60) * (positiveActions / totalActions) * 100));
            explanation = `Engaging in creative activities stimulates neural pathways, potentially enhancing problem-solving skills and emotional expression.`;
            break;
    }

    reportContent.innerHTML = `
        <h2>Session Report</h2>
        <h3>Cognitive Space Regained: ${cognitiveGain}%</h3>
        <p>${explanation}</p>
        <button onclick="closeReport()">Close</button>
    `;

    // Create and animate stars
    for (let i = 0; i < 20; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = `${Math.random() * 20 + 10}px`;
        star.style.height = `${Math.random() * 20 + 10}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animation = `fallingStar ${Math.random() * 1 + 0.5}s linear`;
        reportContent.appendChild(star);
    }

    overlay.style.display = 'flex';
    
    setTimeout(() => {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => star.remove());
    }, 1000);
}

function closeReport() {
    document.querySelector('.overlay').style.display = 'none';
}

// Add these functions to your existing report.js

function calculateArtTherapyScore(answers, timeSpent) {
    const timeScore = Math.min(timeSpent / 180 * 40, 40);
    
    const questionScores = {
        emotionalState: 15,
        focusLevel: 15,
        enjoyment: 15,
        completion: 15
    };
    
    const answerScore = Object.entries(answers).reduce((total, [key, value]) => {
        return total + (questionScores[key] * (value / 5));
    }, 0);
    
    return Math.min(Math.round(timeScore + answerScore), 100);
}

function calculateMeditationScore(focusBreaks, timeSpent) {
    const baseScore = Math.min(timeSpent / 300 * 50, 50);
    const focusPenalty = Math.min(focusBreaks * 5, 20);
    const consistencyBonus = timeSpent >= 180 ? 20 : (timeSpent / 180 * 20);
    
    return Math.min(Math.round(baseScore + consistencyBonus - focusPenalty), 100);
}

function calculateGreenScore(completionRate, timeSpent) {
    const timeScore = Math.min(timeSpent / 240 * 40, 40);
    const completionScore = completionRate * 60;
    
    return Math.min(Math.round(timeScore + completionScore), 100);
}

// Function to save activity data and redirect to score page
function saveActivityAndShowScore(methodType, data) {
    sessionStorage.setItem('methodType', methodType);
    sessionStorage.setItem('timeSpent', data.timeSpent);
    sessionStorage.setItem('answers', JSON.stringify(data.answers || {}));
    window.location.href = 'cognitive-score.html';
}

// Time tracking functionality
let startTime;
let timeSpentSeconds = 0;
let timerInterval;

function startTimeTracking() {
    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = new Date();
    timeSpentSeconds = Math.floor((currentTime - startTime) / 1000);
    const timerDisplay = document.getElementById('timer');
    if (timerDisplay) {
        timerDisplay.textContent = formatTime(timeSpentSeconds);
    }
}

function stopTimeTracking() {
    clearInterval(timerInterval);
    return timeSpentSeconds;
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Art Therapy scoring system
const artTherapyQuestions = {
    emotionalState: {
        question: "How does this art activity make you feel?",
        weight: 25,
        options: [
            { value: 1, text: "Still stressed" },
            { value: 2, text: "Slightly better" },
            { value: 3, text: "Somewhat relaxed" },
            { value: 4, text: "Quite relaxed" },
            { value: 5, text: "Very peaceful" }
        ]
    },
    mindfulness: {
        question: "Were you able to focus solely on creating?",
        weight: 30,
        options: [
            { value: 1, text: "My mind was racing" },
            { value: 2, text: "Often distracted" },
            { value: 3, text: "Somewhat focused" },
            { value: 4, text: "Mostly focused" },
            { value: 5, text: "Completely immersed" }
        ]
    },
    therapeutic: {
        question: "Did this help clear your mind?",
        weight: 45,
        options: [
            { value: 1, text: "Not at all" },
            { value: 2, text: "A little bit" },
            { value: 3, text: "Moderately" },
            { value: 4, text: "Significantly" },
            { value: 5, text: "Completely" }
        ]
    }
};