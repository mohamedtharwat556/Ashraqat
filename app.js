// ===== Simple & Clean App =====

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Loaded!');
    
    // ===== Days Counter =====
    function calculateDays() {
        const startDate = new Date(2026, 3, 9); // April 9, 2026
        const today = new Date();
        
        if (today < startDate) {
            return 0;
        }
        
        const diffTime = today - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays;
    }
    
    const daysCountEl = document.getElementById('daysCount');
    if (daysCountEl) {
        daysCountEl.textContent = calculateDays();
        console.log('✅ Days updated:', calculateDays());
    }
    
    // ===== Intro Button =====
    function enterMainPage() {
        console.log('🎯 Button clicked!');
        const introScreen = document.querySelector('.intro-screen');
        const mainPage = document.querySelector('.main-page');
        
        if (introScreen && mainPage) {
            introScreen.style.display = 'none';
            mainPage.style.display = 'block';
            console.log('✅ Pages switched!');
        }
    }
    
    // Make function global
    window.enterMainPage = enterMainPage;
    console.log('✅ enterMainPage registered');
    
    // ===== Music Button =====
    const musicBtn = document.getElementById('musicBtn');
    let isMusicPlaying = false;
    
    if (musicBtn) {
        musicBtn.addEventListener('click', function() {
            const bgMusic = document.getElementById('bgMusic');
            
            if (isMusicPlaying) {
                bgMusic.pause();
                musicBtn.textContent = '🔇';
                isMusicPlaying = false;
            } else {
                bgMusic.play().catch(e => console.log('Audio error:', e));
                musicBtn.textContent = '🎵';
                isMusicPlaying = true;
            }
        });
    }
    
    // ===== Theme Button =====
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            themeBtn.textContent = '☀️';
        }
        
        themeBtn.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                themeBtn.textContent = '☀️';
                localStorage.setItem('theme', 'light');
            } else {
                themeBtn.textContent = '🌙';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // ===== Photo Click Effect =====
    const photos = document.querySelectorAll('.photo-frame img');
    photos.forEach(photo => {
        photo.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            // Show "بحبك" text
            const textEl = document.createElement('div');
            textEl.textContent = 'بحبك ❤️';
            textEl.style.position = 'fixed';
            textEl.style.left = x + 'px';
            textEl.style.top = y + 'px';
            textEl.style.fontSize = '1.5rem';
            textEl.style.color = '#ff69b4';
            textEl.style.fontWeight = 'bold';
            textEl.style.pointerEvents = 'none';
            textEl.style.zIndex = '1000';
            textEl.style.animation = 'fadeUp 1s ease-out';
            document.body.appendChild(textEl);
            
            setTimeout(() => textEl.remove(), 1000);
            
            // Create flying hearts
            for (let i = 0; i < 8; i++) {
                const heart = document.createElement('div');
                heart.textContent = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = x + 'px';
                heart.style.top = y + 'px';
                heart.style.fontSize = '1.2rem';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '999';
                heart.style.animation = `flyHeart 1s ease-out forwards`;
                heart.style.setProperty('--tx', (Math.random() - 0.5) * 150 + 'px');
                heart.style.setProperty('--ty', -Math.random() * 150 + 'px');
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 1000);
            }
        });
    });
    
    // ===== Game Buttons =====
    const btnGame = document.querySelector('.btn-game');
    if (btnGame) {
        btnGame.addEventListener('click', function() {
            document.querySelector('.main-page').style.display = 'none';
            document.querySelector('.game-page').style.display = 'block';
            console.log('✅ Game page opened');
        });
    }
    
    // Game type buttons
    document.querySelectorAll('.game-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.game-type-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const gameType = this.dataset.game;
            document.getElementById('gameBoard').style.display = gameType === 'memory' ? 'grid' : 'none';
            document.getElementById('spinContainer').style.display = gameType === 'spin' ? 'block' : 'none';
            document.getElementById('timeContainer').style.display = gameType === 'time' ? 'block' : 'none';
            
            if (gameType === 'memory') {
                initMemoryGame();
            }
        });
    });
    
    // Back from game
    document.querySelectorAll('.game-page .btn-back').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.game-page').style.display = 'none';
            document.querySelector('.main-page').style.display = 'block';
            console.log('✅ Back to main page');
        });
    });
    
    // ===== Study Button =====
    const btnStudy = document.querySelector('.btn-study');
    if (btnStudy) {
        btnStudy.addEventListener('click', function() {
            document.querySelector('.main-page').style.display = 'none';
            document.querySelector('.study-page').style.display = 'block';
            console.log('✅ Study page opened');
        });
    }
    
    // Back from study
    const backFromStudyBtn = document.getElementById('backFromStudy');
    if (backFromStudyBtn) {
        backFromStudyBtn.addEventListener('click', function() {
            document.querySelector('.study-page').style.display = 'none';
            document.querySelector('.main-page').style.display = 'block';
            console.log('✅ Back to main page');
        });
    }
    
    // ===== Share Buttons =====
    const shareWhatsApp = document.getElementById('shareWhatsApp');
    if (shareWhatsApp) {
        shareWhatsApp.addEventListener('click', function() {
            const text = 'أشرقت ❤️ - موقع حب وتحفيز مذاكرة\n\nادخلي واكتشفي الحب والدعم!\n\nhttps://ashraqat.vercel.app';
            const encoded = encodeURIComponent(text);
            window.open(`https://wa.me/?text=${encoded}`, '_blank');
        });
    }
    
    const copyLinkBtn = document.getElementById('copyLink');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
            const link = window.location.href;
            navigator.clipboard.writeText(link).then(() => {
                alert('تم نسخ الرابط! 💕');
            }).catch(() => {
                alert('حاولي مرة أخرى');
            });
        });
    }
    
    console.log('✅ All initialized!');
});

// ===== Add required CSS animations =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeUp {
        0% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-50px); }
    }
    
    @keyframes flyHeart {
        0% { 
            opacity: 1; 
            transform: translate(0, 0) scale(1);
        }
        100% { 
            opacity: 0; 
            transform: translate(var(--tx), var(--ty)) scale(0);
        }
    }
`;
document.head.appendChild(style);


// ===== GAMES =====

// ===== Memory Game =====
let memoryCards = [
    'بحبك', 'بحبك', 'أشرقت', 'أشرقت',
    'معاك', 'معاك', 'قلبي', 'قلبي',
    'أنتِ', 'أنتِ', 'جميلة', 'جميلة'
];
let flipped = [];
let matched = 0;
let moves = 0;
let startTime = 0;
let timerInterval = null;

function initMemoryGame() {
    memoryCards = [...memoryCards].sort(() => Math.random() - 0.5);
    document.getElementById('gameBoard').innerHTML = '';
    flipped = [];
    matched = 0;
    moves = 0;
    document.getElementById('moves').textContent = moves;
    document.getElementById('score').textContent = 0;
    startTime = Date.now();
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        document.getElementById('timer').textContent = Math.floor((Date.now() - startTime) / 1000);
    }, 100);
    
    memoryCards.forEach((msg, idx) => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.textContent = '❓';
        card.dataset.index = idx;
        card.addEventListener('click', () => flipCard(card, idx));
        document.getElementById('gameBoard').appendChild(card);
    });
}

function flipCard(cardEl, index) {
    if (flipped.includes(index) || flipped.length > 1) return;
    
    flipped.push(index);
    cardEl.textContent = memoryCards[index];
    cardEl.classList.add('flipped');
    
    if (flipped.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        
        if (memoryCards[flipped[0]] === memoryCards[flipped[1]]) {
            matched++;
            document.getElementById('score').textContent = matched;
            
            if (matched === memoryCards.length / 2) {
                endMemoryGame();
            }
            flipped = [];
        } else {
            setTimeout(() => {
                document.querySelectorAll('.game-card').forEach(card => {
                    if (card.dataset.index == flipped[0] || card.dataset.index == flipped[1]) {
                        card.textContent = '❓';
                        card.classList.remove('flipped');
                    }
                });
                flipped = [];
            }, 1000);
        }
    }
}

function endMemoryGame() {
    clearInterval(timerInterval);
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const score = 1000 - (moves * 10) - seconds;
    document.getElementById('score').textContent = Math.max(score, 0);
    
    document.getElementById('gameResult').innerHTML = `
        <h3>انتِ فزتِ! 🎉</h3>
        <p>المحاولات: ${moves}</p>
        <p>الوقت: ${seconds}ث</p>
        <p>النقاط: ${Math.max(score, 0)}</p>
    `;
}

// ===== Spin Wheel Game =====
const spinMessages = [
    'أحبك زي ما بحب الحياة', 
    'أنتِ أجمل ما في حياتي',
    'بتشتاق لك كل لحظة',
    'قلبي بينادي باسمك',
    'أشرقت اسمي أجمل كلمة',
    'معاك أنسى كل الألم',
    'أنتِ نور عينّي',
    'روحي تاعتك يا حبيبتي'
];

const spinBtn = document.querySelector('.spin-btn');
if (spinBtn) {
    spinBtn.addEventListener('click', () => {
        const wheel = document.getElementById('spinWheel');
        const randomRotation = Math.random() * 360 + 720;
        
        wheel.style.transition = 'transform 4s cubic-bezier(0.33, 0.66, 0.66, 1)';
        wheel.style.transform = `rotate(${randomRotation}deg)`;
        
        setTimeout(() => {
            const selectedIndex = Math.floor((randomRotation % 360) / 45);
            const message = spinMessages[selectedIndex];
            document.getElementById('gameResult').innerHTML = `
                <h3>${message}</h3>
                <p>💕</p>
            `;
        }, 4000);
    });
}

// ===== Time Game =====
const timeQuestions = {
    morning: {
        questions: [
            { q: 'أول حاجة تفكري فيها في الصباح؟', a: ['أشرقت', 'الشغل', 'النوم'] },
            { q: 'أحلى وقت في اليوم؟', a: ['مع أشرقت', 'الصباح', 'الليل'] },
            { q: 'تشتاقي لمين في الصباح؟', a: ['لحبيبي', 'لأمي', 'لصاحباتي'] }
        ]
    },
    afternoon: {
        questions: [
            { q: 'الظهيرة فيها؟', a: ['تفكير فيك', 'إرهاق', 'راحة'] },
            { q: 'أجمل جزء من النهار؟', a: ['الوقت معاك', 'الأكل', 'الاسترخاء'] }
        ]
    },
    evening: {
        questions: [
            { q: 'أجمل وقت للحب؟', a: ['المساء معاك', 'الصباح', 'الليل'] },
            { q: 'مساؤك حلو لما؟', a: ['أتكلم معاك', 'بنام', 'بتفرج تلفزيون'] }
        ]
    },
    night: {
        questions: [
            { q: 'في الليل تفكري في؟', a: ['أشرقت', 'الدراسة', 'المستقبل'] },
            { q: 'أحلى ساعة في الليل؟', a: ['مع حبيبي', 'لوحدي', 'مع أمي'] }
        ]
    }
};

let currentTimeGame = null;
let currentQuestionIndex = 0;

document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        currentTimeGame = this.dataset.time;
        currentQuestionIndex = 0;
        document.querySelector('.time-selector').style.display = 'none';
        document.getElementById('timeQuestions').style.display = 'block';
        showTimeQuestion();
    });
});

function showTimeQuestion() {
    const questions = timeQuestions[currentTimeGame].questions;
    
    if (currentQuestionIndex >= questions.length) {
        document.getElementById('timeQuestions').style.display = 'none';
        document.getElementById('timeMessage').style.display = 'block';
        return;
    }
    
    const q = questions[currentQuestionIndex];
    document.getElementById('questionText').textContent = q.q;
    
    const optionsDiv = document.getElementById('questionOptions');
    optionsDiv.innerHTML = '';
    
    q.a.forEach(answer => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.className = 'option-btn';
        btn.addEventListener('click', () => {
            if (answer === 'أشرقت' || answer === 'لحبيبي' || answer === 'المساء معاك' || answer === 'الوقت معاك') {
                btn.style.background = '#4CAF50';
            } else {
                btn.style.background = '#f44336';
            }
            setTimeout(() => {
                currentQuestionIndex++;
                showTimeQuestion();
            }, 1000);
        });
        optionsDiv.appendChild(btn);
    });
}

// ===== Initialize games when page loads =====
document.addEventListener('DOMContentLoaded', function() {
    const gameTypeMemory = document.querySelector('[data-game="memory"]');
    if (gameTypeMemory && gameTypeMemory.classList.contains('active')) {
        initMemoryGame();
    }
});
