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
