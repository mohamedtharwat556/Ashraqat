// ===== Music Control (Lazy Loading) =====
let bgMusic = null;
const musicBtn = document.getElementById('musicBtn');
let isMusicPlaying = false;

function initializeMusic() {
    if (!bgMusic) {
        bgMusic = document.getElementById('bgMusic');
    }
}

if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        initializeMusic();
        
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicBtn.textContent = '🔇';
            isMusicPlaying = false;
        } else {
            bgMusic.play();
            musicBtn.classList.add('playing');
            musicBtn.textContent = '🎵';
            isMusicPlaying = true;
        }
    });
}

document.addEventListener('click', () => {
    if (!isMusicPlaying && !bgMusic) {
        initializeMusic();
        bgMusic.play().catch(e => console.log('Auto play blocked'));
        isMusicPlaying = true;
        musicBtn.classList.add('playing');
        musicBtn.textContent = '🎵';
    }
}, { once: true });

// ===== Dark/Light Mode =====
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme') || 'dark';

if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeBtn) themeBtn.textContent = '☀️';
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
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

// ===== Days Counter =====
function calculateDays() {
    const startDate = new Date(2026, 3, 10);
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

document.getElementById('daysCount').textContent = calculateDays();

// ===== Canvas Petals (Optimized) =====
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const petals = [];
let maxPetals = 50; // تقليل من 100 لـ 50

class Petal {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.width = Math.random() * 12 + 6;
        this.height = Math.random() * 12 + 6;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 + 1.5;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.04 - 0.02;
        this.opacity = 0.6;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        
        if (this.y > canvas.height) {
            this.opacity -= 0.02;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = `rgba(255, 105, 180, ${this.opacity})`;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }
}

let animationFrameId = null;

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // إضافة وردة جديدة بنسبة أقل
    if (Math.random() < 0.03 && petals.length < maxPetals) {
        petals.push(new Petal());
    }
    
    petals.forEach((petal, idx) => {
        petal.update();
        petal.draw();
        
        if (petal.opacity <= 0) {
            petals.splice(idx, 1);
        }
    });
    
    animationFrameId = requestAnimationFrame(animateCanvas);
}

animateCanvas();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ===== Text to Speech =====
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ar-EG';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
}

// ===== Intro Screen =====
function initIntro() {
    const btnEnter = document.querySelector('.btn-enter');
    if (btnEnter) {
        btnEnter.addEventListener('click', () => {
            console.log('Enter button clicked!');
            const introScreen = document.querySelector('.intro-screen');
            const mainPage = document.querySelector('.main-page');
            console.log('introScreen:', introScreen);
            console.log('mainPage:', mainPage);
            if (introScreen && mainPage) {
                introScreen.style.display = 'none';
                mainPage.style.display = 'block';
                speakText('مرحبا يا أشرقت، أنا هنا معاك');
            }
        });
    } else {
        console.log('btnEnter not found!');
    }
}

// تشغيل عند تحميل الصفحة
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntro);
} else {
    initIntro();
}

// ===== Photo Click Effect (Optimized) =====
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
        
        // Create flying hearts (تقليل من 15 لـ 8)
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
        
        speakText('بحبك يا أشرقت');
    });
});

// ===== Disable animations on mobile for performance =====
const isMobile = window.innerWidth <= 768;

if (isMobile) {
    // تقليل عدد الورود على الموبايل
    maxPetals = 25;
    
    // تعطيل بعض الـ animations الثقيلة
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            * {
                animation-duration: 0.3s !important;
            }
            .photo-frame {
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}
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

// ===== Memory Game =====
let memoryCards = [];
let flipped = [];
let matched = 0;
let moves = 0;
let startTime = 0;
let timerInterval = null;

const loveMessages = [
    'بحبك', 'أنتِ جميلة', 'أشرقت', 'قلبي لك', 'روحي تاعتك',
    'أحبك كتير', 'أنتِ وحياتي', 'معاك أسعد', 'بتشتاقلك', 'ضي قلبي'
];

function initMemoryGame() {
    memoryCards = [...loveMessages, ...loveMessages].sort(() => Math.random() - 0.5);
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
            
            if (matched === loveMessages.length) {
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
    const score = 1000 - (moves * 10) - (seconds);
    document.getElementById('score').textContent = Math.max(score, 0);
    
    speakText('أحسنتِ! انتِ عبقرية!');
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
        
        // Create particles (تقليل من 20 لـ 10)
        for (let i = 0; i < 10; i++) {
            createSpinParticle();
        }
        
        setTimeout(() => {
            const selectedIndex = Math.floor((randomRotation % 360) / 45);
            const message = spinMessages[selectedIndex];
            document.getElementById('gameResult').innerHTML = `
                <h3>${message}</h3>
                <p>💕</p>
            `;
            speakText(message);
            createSpinHearts();
        }, 4000);
    });
}
    }, 4000);
});

function createSpinParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    particle.style.fontSize = '1.5rem';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '998';
    particle.textContent = ['✨', '💕', '❤️', '💖'][Math.floor(Math.random() * 4)];
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 800);
}

function createSpinHearts() {
    // تقليل من 30 لـ 15
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = window.innerWidth / 2 + 'px';
        heart.style.top = window.innerHeight / 2 + 'px';
        heart.style.fontSize = '1.2rem';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '997';
        heart.style.animation = `flyAway ${1 + Math.random() * 0.5}s ease-out forwards`;
        heart.style.setProperty('--angle', Math.random() * Math.PI * 2);
        heart.style.setProperty('--distance', 80 + Math.random() * 150);
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 1500);
    }
}

const style2 = document.createElement('style');
style2.textContent = `
    @keyframes flyAway {
        0% { 
            opacity: 1; 
            transform: translate(0, 0) scale(1);
        }
        100% { 
            opacity: 0; 
            transform: translate(
                calc(cos(var(--angle)) * var(--distance)), 
                calc(sin(var(--angle)) * var(--distance))
            ) scale(0);
        }
    }
`;
document.head.appendChild(style2);

// ===== Time Game =====
const timeQuestions = {
    morning: {
        questions: [
            { q: 'أول حاجة تفكري فيها في الصباح؟', a: ['أشرقت', 'الشغل', 'النوم'] },
            { q: 'أحلى وقت في اليوم؟', a: ['مع أشرقت', 'الصباح', 'الليل'] },
            { q: 'تشتاقي لمين في الصباح؟', a: ['لحبيبي', 'لأمي', 'لصاحباتي'] }
        ],
        messages: ['صباح الخير يا جميلة!', 'مع شروق الشمس، أتذكرك!', 'صباحك أجمل يا أشرقت!']
    },
    afternoon: {
        questions: [
            { q: 'الظهيرة فيها؟', a: ['تفكير فيك', 'إرهاق', 'راحة'] },
            { q: 'أجمل جزء من النهار؟', a: ['الوقت معاك', 'الأكل', 'الاسترخاء'] },
            { q: 'ظهرك كويس يا؟', a: ['أشرقت', 'بتاع', 'حبيبتي'] }
        ],
        messages: ['ظهرك أجمل لما أفتكر فيك!', 'في كل ظهيرة بحبك أكتر!']
    },
    evening: {
        questions: [
            { q: 'أجمل وقت للحب؟', a: ['المساء معاك', 'الصباح', 'الليل'] },
            { q: 'مساؤك حلو لما؟', a: ['أتكلم معاك', 'بنام', 'بتفرج تلفزيون'] },
            { q: 'أحن للي مين في المساء؟', a: ['لحبيبي', 'لأمي', 'لصاحباتي'] }
        ],
        messages: ['مساؤك حلو لما تكوني جنبي!', 'المساء وأنتِ = السعادة!']
    },
    night: {
        questions: [
            { q: 'في الليل تفكري في؟', a: ['أشرقت', 'الدراسة', 'المستقبل'] },
            { q: 'أحلى ساعة في الليل؟', a: ['مع حبيبي', 'لوحدي', 'مع أمي'] },
            { q: 'الليل بدونك؟', a: ['طويل وحزين', 'مريح', 'عادي'] }
        ],
        messages: ['الليل وأنتِ = الحب والرومانسية!', 'كل ليلة بتشتاق لك أكتر يا أشرقت!']
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
        endTimeGame();
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
            if (answer === 'أشرقت') {
                btn.style.background = '#4CAF50';
                speakText('صح! أنتِ كويسة!');
            } else {
                btn.style.background = '#f44336';
            }
            setTimeout(showTimeQuestion, 1000);
            currentQuestionIndex++;
        });
        optionsDiv.appendChild(btn);
    });
}

function endTimeGame() {
    document.getElementById('timeQuestions').style.display = 'none';
    document.getElementById('timeMessage').style.display = 'block';
    
    const messages = timeQuestions[currentTimeGame].messages;
    const message = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById('messageBig').textContent = message;
    
    speakText(message);
}

// ===== Game Navigation =====
const btnGame = document.querySelector('.btn-game');
if (btnGame) {
    btnGame.addEventListener('click', () => {
        document.querySelector('.main-page').style.display = 'none';
        document.querySelector('.game-page').style.display = 'block';
        initMemoryGame();
    });
}

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

document.querySelectorAll('.game-page .btn-back').forEach(btn => {
    btn.addEventListener('click', () => {
        clearInterval(timerInterval);
        document.querySelector('.game-page').style.display = 'none';
        document.querySelector('.main-page').style.display = 'block';
        document.getElementById('gameResult').innerHTML = '';
    });
});

// ===== Study Mode Messages =====
const encouragementMessages = [
    'استمري يا حبيبتي! أنا معاك! 💕',
    'أنتِ قادرة على كل شيء! 💪',
    'أشرقت، أنا فخور بيك! ❤️',
    'المذاكرة دي عشان مستقبل جميل لينا! 🌟',
    'أنتِ أقوى من اللي بتتخيلي! 💪',
    'حبك يديني قوة نساعدك! 💕',
    'كل دقيقة بتدرسيها = نجاح! ✨',
    'أنا عارف انك تعبانة، لكن انتِ قوية! 💖',
    'بحبك أكتر كل ما أشوفك تركزي! 💞',
    'الصبر والتركيز = نجاح مضمون! 🏆',
    'أنتِ أحلى طالبة في العالم! 👑',
    'معاك أنا أقوى! استمري! 💪❤️',
    'كل سؤال صعب = فرصة تتفوقي فيها! 🎯',
    'أنا هنا بقلبك لما تتعبي! 💕',
    'المذاكرة دي جميلة لما تكوني معايا! 📚✨'
];

const breakMessages = [
    'اشربي حاجة، انتِ محتاجة! ☕ استرخي شوي',
    'رخي جسمك 5 دقايق بس، بعدين ترجعي قوية! 🧘',
    'شوفي صورة جميلة من الطبيعة! 🌸 نفسك بتحتاج هدوء',
    'تنفسي عميق: كنتِ قويــة جداً! 💨 استمتعي بالهدوء',
    'تمشي شوية أو اتمددي! 🚶 جسمك محتاج حركة',
    'استمعي لموسيقى جميلة! 🎵 روقي نفسك شوي',
    'اغسلي وجهك بماية باردة! 🚿 بتصحصحي',
    'كلي حاجة خفيفة! 🍎 أنتِ محتاجة طاقة'
];

const egyptianJokes = [
    {
        setup: 'معلم قال لتلميذه: ليه ما بتركزش؟',
        punchline: 'التلميذ: معلم انت نفسك بتركز على الكتاب؟',
        reaction: 'هههههه!'
    },
    {
        setup: 'أم تقول لابنتها: خلصتِ الواجب؟',
        punchline: 'البنت: يا ماما الواجب نفسه ما خلصش يتعبني!',
        reaction: 'جميلة جداً!'
    },
    {
        setup: 'طالب يقول لصاحبه: أنا بذاكر من الليل',
        punchline: 'الصاحب: يعني انت وأنا نفس الكسل!',
        reaction: 'صح صح!'
    },
    {
        setup: 'طالبة تقول: يا رب أنجح',
        punchline: 'الرب يقول: أنتِ تركزي أول!',
        reaction: 'هههههه!'
    },
    {
        setup: 'معلمة تسأل: من اللي لم يحل الواجب؟',
        punchline: 'كل التلاميذ يرفعوا إيدهم!',
        reaction: 'حقيقي حقيقي!'
    }
];

const breakLoveMessages = [
    'كل ما تركزي، بحبك أكتر! 💕',
    'أشرقت، حتى في الاستراحة بفتكر فيك! ❤️',
    'معاك في كل دقيقة، استريحي شوية! 💕',
    'أنتِ تستاهلي الراحة والحب! 👑❤️',
    'البركة في التركيز، والحب في القلب معاك! 💞',
    'أنا هنا حتى لما تحتاجي استراحة! 💕',
    'الحب بيديك قوة تكملي المذاكرة! 💪❤️',
    'أشرقت، استريحي وخدي نفسك، أنا جنبك! 💕',
    'كل ساعة تذاكري = ساعة بحبك فيها! ⏰❤️',
    'الاستراحة دي معايا، في قلبي! 💕'
];

const achievementMessages = {
    1: '🌟 أول نجمة! البداية الجميلة! 💕',
    5: '⭐ 5 نجوم! أنتِ تحت الضوء! 🌟',
    7: '🎉 أحسنتِ! 7 نجوم متتالية! عبقرية! 🌟',
    10: '👑 عشر نجوم! ملكة المذاكرة! 👑',
    15: '🏆 رائعة جداً! مازالتِ متفوقة! 👑💕',
    20: '✨ عشرين نجمة! أنتِ لا تنسي! 💪',
    30: '👑 ملكة المذاكرة! أنا فخور بيك يا أشرقت! ❤️❤️❤️',
    50: '🌙 خمسين نجمة! أشرقت، أنتِ مثالية! 🌟💫',
    100: '🏅 مائة نجمة! أشرقت ملكة الملكات! أنا بحبك أكتر كل يوم! ❤️❤️❤️'
};

const beforeStartMessages = [
    'أنا هنا معاك طول الطريق! 💪❤️',
    'استمري يا قوية! أنا فخور بيك قبل ما تبدئي! 👑',
    'كل دقيقة بتركزيها = قطعة من مستقبلنا الجميل! 🌟',
    'أشرقت، أنتِ تستاهلي الأفضل! فركزي معايا! 💕',
    'المذاكرة صعبة، لكن أنتِ أصعب منها! 💪'
];

const congratulationMessages = [
    'يا إلهي! خلصتِ مادة كاملة! أنتِ عبقرية! 🎉',
    'أحسنتِ يا ملكة! خطوة جديدة في طريق النجاح! 👑',
    'برافو! أنا فخور بيك جداً! ❤️❤️❤️',
    'عبقرية! خلصتِ وركزتِ تمام! 🌟',
    'يا سلام! أشرقت خلصت مادة! 💕'
];

// ===== Study Mode =====
const studyPage = document.querySelector('.study-page');
const mainPage = document.querySelector('.main-page');
const gamePage = document.querySelector('.game-page');
const btnStudy = document.querySelector('.btn-study');

let subjects = [];
let currentSubjectIndex = 0;
let isStudying = false;
let timerInterval_study = null;

if (btnStudy) {
    btnStudy.addEventListener('click', () => {
        mainPage.style.display = 'none';
        gamePage.style.display = 'none';
        studyPage.style.display = 'block';
        speakText('وضع المذاكرة، اضيفي مواد اليوم');
    });
}

const backFromStudyBtn = document.getElementById('backFromStudy');
if (backFromStudyBtn) {
    backFromStudyBtn.addEventListener('click', () => {
        stopStudying();
        mainPage.style.display = 'block';
        studyPage.style.display = 'none';
    });
}

const btnAddSubject = document.querySelector('.btn-add-subject');
if (btnAddSubject) {
    btnAddSubject.addEventListener('click', () => {
        const subjectName = document.getElementById('subjectInput').value;
        const hours = document.getElementById('hoursInput').value;
        
        if (subjectName.trim()) {
            subjects.push({
                name: subjectName,
                hours: parseInt(hours) || 1,
                minutes: (parseInt(hours) || 1) * 50
            });
            
            document.getElementById('subjectInput').value = '';
            document.getElementById('hoursInput').value = '1';
            updateSubjectsList();
        }
    });
}

function updateSubjectsList() {
    const list = document.getElementById('subjectsList');
    
    if (subjects.length === 0) {
        list.innerHTML = '<p style="color: var(--light-pink);">ما في موادد هسة، أضيفي! 📚</p>';
        return;
    }
    
    let html = '';
    subjects.forEach((subj, idx) => {
        html += `
            <div class="subject-item">
                <span>${subj.name} (${subj.hours} ساعة)</span>
                <button onclick="removeSubject(${idx})">حذفي ✕</button>
            </div>
        `;
    });
    
    list.innerHTML = html;
}

function removeSubject(idx) {
    subjects.splice(idx, 1);
    updateSubjectsList();
}

const btnStartStudy = document.querySelector('.btn-start-study');
if (btnStartStudy) {
    btnStartStudy.addEventListener('click', () => {
        if (subjects.length === 0) {
            alert('أضيفي مادة واحدة على الأقل!');
            return;
        }
        
        isStudying = true;
        currentSubjectIndex = 0;
        
        const beforeMsg = beforeStartMessages[Math.floor(Math.random() * beforeStartMessages.length)];
        speakText(beforeMsg);
        
        document.querySelector('.study-setup').style.display = 'none';
        document.getElementById('studyTimer').style.display = 'block';
        
        startStudying();
    });
}

function startStudying() {
    const subject = subjects[currentSubjectIndex];
    document.getElementById('currentSubject').textContent = subject.name;
    document.getElementById('infoSubject').textContent = subject.name;
    document.getElementById('infoRemaining').textContent = subjects.length - currentSubjectIndex - 1;
    
    let timeLeft = subject.minutes * 60;
    const totalTime = timeLeft;
    
    const tick = () => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval_study);
            finishSubject();
            return;
        }
        
        timeLeft--;
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        
        document.getElementById('timerMinutes').textContent = String(mins).padStart(2, '0');
        document.getElementById('timerSeconds').textContent = String(secs).padStart(2, '0');
        
        if (timeLeft % 600 === 0 && timeLeft > 0) {
            const msg = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)];
            document.getElementById('encouragement').textContent = msg;
            speakText(msg);
        }
        
        if (timeLeft === Math.floor(totalTime / 2)) {
            speakText('بتمام نصك! أنتِ تمام تماماً! 💪');
        }
        
        if (timeLeft === 300) {
            const msg = 'خمس دقايق بس وتخلصي هالمادة! أنتِ قاربة! 🎯';
            document.getElementById('encouragement').textContent = msg;
            speakText(msg);
        }
        
        if (timeLeft === 60) {
            const msg = 'دقيقة واحدة بس! أنتِ أحسن من أحسن! 💕';
            document.getElementById('encouragement').textContent = msg;
            speakText(msg);
        }
    };
    
    tick();
    timerInterval_study = setInterval(tick, 1000);
}

function finishSubject() {
    const congratMsg = congratulationMessages[Math.floor(Math.random() * congratulationMessages.length)];
    speakText(congratMsg);
    
    if (currentSubjectIndex < subjects.length - 1) {
        showBreak();
    } else {
        finishStudying();
    }
}

// ===== Break & Stars =====
function showBreak() {
    document.getElementById('studyTimer').style.display = 'none';
    document.getElementById('breakPage').style.display = 'block';
    
    const breakType = Math.random();
    
    if (breakType < 0.5) {
        const joke = egyptianJokes[Math.floor(Math.random() * egyptianJokes.length)];
        const loveMsg = breakLoveMessages[Math.floor(Math.random() * breakLoveMessages.length)];
        
        document.getElementById('breakMessage').style.display = 'none';
        document.getElementById('breakJoke').style.display = 'block';
        document.getElementById('breakLoveMsg').style.display = 'block';
        
        document.getElementById('jokeSetup').textContent = joke.setup;
        document.getElementById('jokePunchline').textContent = joke.punchline;
        document.getElementById('jokeReaction').textContent = joke.reaction;
        document.getElementById('loveMsgText').textContent = loveMsg;
        
        speakText(joke.setup + ' ... ' + joke.punchline);
    } else {
        const breakMsg = breakMessages[Math.floor(Math.random() * breakMessages.length)];
        const loveMsg = breakLoveMessages[Math.floor(Math.random() * breakLoveMessages.length)];
        
        document.getElementById('breakMessage').style.display = 'block';
        document.getElementById('breakJoke').style.display = 'none';
        document.getElementById('breakLoveMsg').style.display = 'block';
        
        document.getElementById('breakMessage').textContent = breakMsg;
        document.getElementById('loveMsgText').textContent = loveMsg;
        
        speakText(breakMsg);
    }
    
    let breakTime = 300;
    const breakInterval = setInterval(() => {
        breakTime--;
        
        if (breakTime <= 0) {
            clearInterval(breakInterval);
            document.getElementById('breakPage').style.display = 'none';
            document.getElementById('studyTimer').style.display = 'block';
            currentSubjectIndex++;
            startStudying();
        }
    }, 1000);
    
    document.querySelector('.btn-continue').onclick = () => {
        clearInterval(breakInterval);
        document.getElementById('breakPage').style.display = 'none';
        document.getElementById('studyTimer').style.display = 'block';
        currentSubjectIndex++;
        startStudying();
    };
}

function finishStudying() {
    clearInterval(timerInterval_study);
    isStudying = false;
    
    document.getElementById('studyTimer').style.display = 'none';
    document.querySelector('.study-setup').style.display = 'block';
    
    addStar();
    
    // Confetti Effect
    createConfetti();
    
    const msg = 'احسنتِ يا أشرقت! خلصتِ كل الموادد! أنا فخور بيك جداً! ❤️❤️❤️';
    speakText(msg);
    alert(msg);
    
    subjects = [];
    updateSubjectsList();
}

function createConfetti() {
    const colors = ['#ff69b4', '#ffb6d9', '#c41e3a', '#ffff00', '#00ff00'];
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = Math.random() > 0.5 ? '🎉' : '❤️';
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.fontSize = '1.5rem';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `confettiFall ${2 + Math.random()}s ease-in forwards`;
        confetti.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 2500);
    }
}

function addStar() {
    const today = new Date().toDateString();
    const lastStudyDate = localStorage.getItem('lastStudyDate');
    
    const totalStars = parseInt(localStorage.getItem('studyStars') || '0') + 1;
    localStorage.setItem('studyStars', totalStars);
    
    const dailyStars = JSON.parse(localStorage.getItem('dailyStars') || '{}');
    dailyStars[today] = (dailyStars[today] || 0) + 1;
    localStorage.setItem('dailyStars', JSON.stringify(dailyStars));
    
    let streak = parseInt(localStorage.getItem('studyStreak') || '0');
    
    if (lastStudyDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastStudyDate === yesterday.toDateString()) {
            streak++;
        } else {
            streak = 1;
        }
    }
    
    localStorage.setItem('studyStreak', streak);
    localStorage.setItem('lastStudyDate', today);
    
    const studyHistory = JSON.parse(localStorage.getItem('studyHistory') || '[]');
    studyHistory.push({
        date: today,
        stars: 1,
        subjects: subjects.map(s => s.name).join(', '),
        totalMinutes: subjects.reduce((sum, s) => sum + s.minutes, 0)
    });
    localStorage.setItem('studyHistory', JSON.stringify(studyHistory));
    
    updateStarsDisplay();
    
    if (achievementMessages[totalStars]) {
        speakText(achievementMessages[totalStars]);
    }
}

function updateStarsDisplay() {
    const totalStars = parseInt(localStorage.getItem('studyStars') || '0');
    const streak = parseInt(localStorage.getItem('studyStreak') || '0');
    const display = document.getElementById('starsDisplay');
    
    let html = '';
    const displayStars = Math.min(totalStars, 50);
    for (let i = 0; i < displayStars; i++) {
        html += '<span class="star">⭐</span>';
    }
    
    if (totalStars > 50) {
        html += `<span style="color: var(--light-pink); font-size: 1.5rem;">+${totalStars - 50}</span>`;
    }
    
    display.innerHTML = html;
    
    let achievementText = `${totalStars} نجمة إجمالي | 🔥 ${streak} يوم متتالي`;
    
    if (achievementMessages[totalStars]) {
        achievementText = achievementMessages[totalStars];
    }
    
    document.getElementById('achievementText').textContent = achievementText;
}

function stopStudying() {
    if (timerInterval_study) {
        clearInterval(timerInterval_study);
    }
    isStudying = false;
    subjects = [];
    updateSubjectsList();
    document.querySelector('.study-setup').style.display = 'block';
    document.getElementById('studyTimer').style.display = 'none';
    document.getElementById('breakPage').style.display = 'none';
}

updateStarsDisplay();

// ===== Advanced Statistics =====
function updateStatistics() {
    const streak = parseInt(localStorage.getItem('studyStreak') || '0');
    const studyHistory = JSON.parse(localStorage.getItem('studyHistory') || '[]');
    
    const uniqueDays = new Set(studyHistory.map(h => h.date)).size;
    
    const totalMinutes = studyHistory.reduce((sum, h) => sum + h.totalMinutes, 0);
    const totalHours = (totalMinutes / 60).toFixed(1);
    
    document.getElementById('streakValue').textContent = streak;
    document.getElementById('totalHoursValue').textContent = totalHours + 'س';
    document.getElementById('studyDaysValue').textContent = uniqueDays;
    
    if (studyHistory.length > 0) {
        const lastSession = studyHistory[studyHistory.length - 1];
        const lastDiv = document.getElementById('lastSessionDiv');
        const lastText = document.getElementById('lastSessionText');
        
        lastDiv.style.display = 'block';
        lastText.textContent = 'آخر جلسة: ' + lastSession.date + ' | مواد: ' + lastSession.subjects;
    }
}

document.getElementById('btnViewHistory').addEventListener('click', () => {
    const studyHistory = JSON.parse(localStorage.getItem('studyHistory') || '[]');
    const historyList = document.getElementById('historyList');
    
    if (studyHistory.length === 0) {
        historyList.innerHTML = '<p style="color: var(--light-pink); text-align: center;">ما في سجل بعد! ابدئي المذاكرة! 💪</p>';
    } else {
        let html = '';
        studyHistory.reverse().forEach((session, idx) => {
            html += `
                <div class="history-item">
                    <div class="history-item-date">
                        <span class="history-item-star">⭐</span>
                        ${session.date}
                    </div>
                    <div class="history-item-info">
                        <p>المواد: ${session.subjects}</p>
                        <p>الوقت: ${session.totalMinutes} دقيقة (${(session.totalMinutes / 60).toFixed(1)} ساعة)</p>
                    </div>
                </div>
            `;
        });
        historyList.innerHTML = html;
    }
    
    document.getElementById('historyModal').classList.add('active');
});

function openAdvancedStats() {
    document.getElementById('advancedStats').style.display = 'block';
    generateWeeklyStats();
}

function showStatTab(tab) {
    document.querySelectorAll('.stat-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.stat-tab').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tab + '-stats').style.display = 'block';
    event.target.classList.add('active');
    
    if (tab === 'weekly') {
        generateWeeklyStats();
    } else if (tab === 'monthly') {
        generateMonthlyStats();
    } else if (tab === 'topics') {
        generateTopicsStats();
    }
}

function generateWeeklyStats() {
    const studyHistory = JSON.parse(localStorage.getItem('studyHistory') || '[]');
    const weekData = {};
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();
        weekData[dateStr] = 0;
    }
    
    studyHistory.forEach(session => {
        if (weekData.hasOwnProperty(session.date)) {
            weekData[session.date] += session.totalMinutes / 60;
        }
    });
    
    const details = document.getElementById('weeklyDetails');
    let html = '<div class="stat-items">';
    
    let totalHours = 0;
    Object.entries(weekData).forEach(([date, hours]) => {
        totalHours += hours;
        const dayName = new Date(date).toLocaleDateString('ar-EG', { weekday: 'long' });
        html += `
            <div class="stat-item">
                <span class="stat-day">${dayName}</span>
                <div class="stat-bar">
                    <div class="stat-fill" style="width: ${Math.min(hours * 20, 100)}%"></div>
                </div>
                <span class="stat-hours">${hours.toFixed(1)}س</span>
            </div>
        `;
    });
    
    html += '</div>';
    html += `<p class="stat-summary">اجمالي الأسبوع: <strong>${totalHours.toFixed(1)} ساعة</strong></p>`;
    
    details.innerHTML = html;
}

function generateMonthlyStats() {
    const studyHistory = JSON.parse(localStorage.getItem('studyHistory') || '[]');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    const monthData = {};
    
    studyHistory.forEach(session => {
        const sessionDate = new Date(session.date);
        if (sessionDate.getMonth() === currentMonth && sessionDate.getFullYear() === currentYear) {
            const day = sessionDate.getDate();
            monthData[day] = (monthData[day] || 0) + session.totalMinutes / 60;
        }
    });
    
    const details = document.getElementById('monthlyDetails');
    let html = '<div class="stat-items">';
    
    let totalHours = 0;
    for (let day = 1; day <= 31; day++) {
        if (monthData[day]) {
            totalHours += monthData[day];
            html += `
                <div class="stat-item">
                    <span class="stat-day">اليوم ${day}</span>
                    <div class="stat-bar">
                        <div class="stat-fill" style="width: ${Math.min(monthData[day] * 15, 100)}%"></div>
                    </div>
                    <span class="stat-hours">${monthData[day].toFixed(1)}س</span>
                </div>
            `;
        }
    }
    
    html += '</div>';
    html += `<p class="stat-summary">اجمالي الشهر: <strong>${totalHours.toFixed(1)} ساعة</strong></p>`;
    
    details.innerHTML = html;
}

function generateTopicsStats() {
    const studyHistory = JSON.parse(localStorage.getItem('studyHistory') || '[]');
    const topicsData = {};
    
    studyHistory.forEach(session => {
        const subjects = session.subjects.split(', ');
        subjects.forEach(subject => {
            topicsData[subject] = (topicsData[subject] || 0) + 1;
        });
    });
    
    const topicsList = document.getElementById('topicsList');
    let html = '';
    
    const sortedTopics = Object.entries(topicsData).sort((a, b) => b[1] - a[1]);
    
    sortedTopics.forEach(([topic, count], idx) => {
        const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '📚';
        html += `
            <div class="topic-item">
                <span class="medal">${medal}</span>
                <span class="topic-name">${topic}</span>
                <span class="topic-count">${count} مرات</span>
            </div>
        `;
    });
    
    topicsList.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
    const statsBtn = document.getElementById('btnAdvancedStats');
    if (statsBtn) {
        statsBtn.addEventListener('click', openAdvancedStats);
    }
});

updateStatistics();


// ===== Share Buttons =====
const shareWhatsApp = document.getElementById('shareWhatsApp');
const copyLinkBtn = document.getElementById('copyLink');

if (shareWhatsApp) {
    shareWhatsApp.addEventListener('click', () => {
        const text = 'أشرقت ❤️ - موقع حب وتحفيز مذاكرة\n\nادخلي واكتشفي الحب والدعم في كل جملة!\n\nhttps://ashraqat.vercel.app';
        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
    });
}

if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', () => {
        const link = window.location.href;
        navigator.clipboard.writeText(link).then(() => {
            speakText('تم نسخ الرابط!');
            alert('تم نسخ الرابط! 💕');
        }).catch(() => {
            alert('حاولي مرة أخرى');
        });
    });
}
});
