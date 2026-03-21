// ========== MATRIX RAIN EFFECT ==========
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const charArray = chars.split("");
const fontSize = 14;
const columns = width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = Math.floor(Math.random() * height);
}

let hue = 120;
let hueDirection = 1;

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
    ctx.fillRect(0, 0, width, height);
    
    // Cycle colors for cyberpunk effect
    hue += 0.2 * hueDirection;
    if (hue > 150) hueDirection = -1;
    if (hue < 90) hueDirection = 1;
    
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 40);

// ========== LOADING SCREEN ==========
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');
    const progressSpan = document.querySelector('.loading-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    initAnimations();
                    animateNumbers();
                    revealSections();
                }, 800);
            }, 500);
        }
        if (progressSpan) progressSpan.textContent = Math.floor(progress) + '%';
    }, 150);
});

// ========== NUMBER COUNTER ANIMATION ==========
function animateNumbers() {
    const statValues = document.querySelectorAll('.stat-value[data-count]');
    
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let current = 0;
        const increment = target / 50;
        
        const updateNumber = () => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                return;
            }
            stat.textContent = Math.floor(current);
            requestAnimationFrame(updateNumber);
        };
        
        updateNumber();
    });
}

// ========== SCROLL REVEAL ANIMATIONS ==========
function revealSections() {
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    sections.forEach(section => observer.observe(section));
}

// ========== 3D CARD EFFECTS ==========
function init3DCards() {
    const cards = document.querySelectorAll('.service-card-3d, .skill-card-3d');
    
    cards.forEach(card => {
        // Simple hover effect without conflicting transforms
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
}

// ========== NAVIGATION ACTIVE STATE ==========
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ========== SCROLL TO SECTION FUNCTIONS ==========
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Button event listeners
const exploreBtn = document.getElementById('exploreBtn');
const contactBtn = document.getElementById('contactBtn');

if (exploreBtn) {
    exploreBtn.addEventListener('click', () => scrollToSection('services'));
}
if (contactBtn) {
    contactBtn.addEventListener('click', () => scrollToSection('contact'));
}

// ========== FORM SUBMISSION ==========
const cyberForm = document.getElementById('cyberForm');
if (cyberForm) {
    cyberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = cyberForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span class="btn-text">TRANSMITTING...</span><span class="btn-icon">📡</span>';
        btn.disabled = true;
        
        setTimeout(() => {
            showCyberNotification('MESSAGE TRANSMITTED SUCCESSFULLY');
            btn.innerHTML = originalText;
            btn.disabled = false;
            cyberForm.reset();
        }, 2000);
    });
}

// ========== CYBER NOTIFICATION ==========
function showCyberNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cyber-notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--bg-card);
        border: 1px solid var(--neon-green);
        border-radius: 8px;
        padding: 1rem 2rem;
        color: var(--neon-green);
        font-family: monospace;
        z-index: 1000;
        animation: slideUp 0.3s ease;
        box-shadow: 0 0 20px var(--neon-green);
    `;
    notification.textContent = `> ${message}`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(20px);
        }
    }
`;
document.head.appendChild(notificationStyles);

// ========== EASTER EGG: KONAMI CODE ==========
let konamiSequence = [];
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiSequence.push(e.keyCode);
    if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
    }
    
    if (konamiSequence.join() === konamiCode.join()) {
        activateEasterEgg();
        konamiSequence = [];
    }
});

function activateEasterEgg() {
    const consoleEl = document.getElementById('easterEggConsole');
    if (!consoleEl) return;
    
    consoleEl.classList.remove('hidden');
    
    // Matrix rain intensifies temporarily
    canvas.style.opacity = '0.3';
    setTimeout(() => {
        canvas.style.opacity = '0.12';
    }, 2000);
    
    // Add console output
    const consoleOutput = document.querySelector('.console-output');
    if (consoleOutput) {
        consoleOutput.innerHTML += '<div class="console-line">> KONAMI CODE ACTIVATED</div>';
        consoleOutput.innerHTML += '<div class="console-line">> Welcome to the developer dimension</div>';
        consoleOutput.innerHTML += '<div class="console-line">> Type "help" for available commands</div>';
    }
    
    // Console input handling
    const consoleInput = document.getElementById('consoleInput');
    if (consoleInput) {
        // Remove existing listener to avoid duplicates
        const newInput = consoleInput.cloneNode(true);
        consoleInput.parentNode.replaceChild(newInput, consoleInput);
        
        newInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const command = newInput.value.toLowerCase();
                processConsoleCommand(command);
                newInput.value = '';
            }
        });
    }
    
    const consoleClose = document.querySelector('.console-close');
    if (consoleClose) {
        consoleClose.addEventListener('click', () => {
            consoleEl.classList.add('hidden');
        });
    }
}

function processConsoleCommand(command) {
    const output = document.querySelector('.console-output');
    if (!output) return;
    
    output.innerHTML += `<div class="console-line">$> ${command}</div>`;
    
    switch(command) {
        case 'help':
            output.innerHTML += '<div class="console-line">Available commands:</div>';
            output.innerHTML += '<div class="console-line">  matrix   - Intensify matrix rain</div>';
            output.innerHTML += '<div class="console-line">  glitch   - Trigger glitch effect</div>';
            output.innerHTML += '<div class="console-line">  reveal   - Show hidden content</div>';
            output.innerHTML += '<div class="console-line">  rainbow  - Rainbow mode</div>';
            output.innerHTML += '<div class="console-line">  exit     - Close console</div>';
            break;
        case 'matrix':
            canvas.style.opacity = '0.3';
            setTimeout(() => canvas.style.opacity = '0.12', 2000);
            output.innerHTML += '<div class="console-line">> Matrix rain intensified</div>';
            break;
        case 'glitch':
            document.body.style.animation = 'glitch 0.1s infinite';
            setTimeout(() => document.body.style.animation = '', 1000);
            output.innerHTML += '<div class="console-line">> Glitch mode activated</div>';
            break;
        case 'reveal':
            output.innerHTML += '<div class="console-line">> Secret: Try typing "sudo make me a sandwich"</div>';
            output.innerHTML += '<div class="console-line">> Another secret: Press "n" three times quickly...</div>';
            break;
        case 'rainbow':
            let rainbowHue = 0;
            const interval = setInterval(() => {
                rainbowHue = (rainbowHue + 5) % 360;
                document.documentElement.style.setProperty('--neon-green', `hsl(${rainbowHue}, 100%, 50%)`);
                document.documentElement.style.setProperty('--neon-cyan', `hsl(${rainbowHue + 60}, 100%, 50%)`);
            }, 100);
            setTimeout(() => {
                clearInterval(interval);
                document.documentElement.style.setProperty('--neon-green', '#00ff9d');
                document.documentElement.style.setProperty('--neon-cyan', '#00ffff');
            }, 5000);
            output.innerHTML += '<div class="console-line">> Rainbow mode activated (5 seconds)</div>';
            break;
        case 'exit':
            document.getElementById('easterEggConsole')?.classList.add('hidden');
            break;
        default:
            output.innerHTML += `<div class="console-line">Command not recognized: ${command}</div>`;
    }
    
    output.scrollTop = output.scrollHeight;
}

// ========== ADDITIONAL EASTER EGG: "nutmeg" x3 ==========
let nutmegCount = 0;
let nutmegTimeout;

document.addEventListener('keydown', (e) => {
    if (e.key === 'n' || e.key === 'N') {
        nutmegCount++;
        clearTimeout(nutmegTimeout);
        nutmegTimeout = setTimeout(() => nutmegCount = 0, 1000);
        
        if (nutmegCount >= 3) {
            createParticleExplosion();
            showCyberNotification('SECRET UNLOCKED // NUTMEG PROTOCOL');
            nutmegCount = 0;
        }
    }
});

function createParticleExplosion() {
    const colors = ['#00ff9d', '#00ffff', '#ff00aa', '#a855f7'];
    
    for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 4;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: ${startY}px;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            box-shadow: 0 0 10px ${color};
        `;
        document.body.appendChild(particle);
        
        let x = startX;
        let y = startY;
        let opacity = 1;
        
        function animateParticle() {
            x += vx;
            y += vy;
            opacity -= 0.015;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        animateParticle();
    }
}

// ========== GLITCH EFFECT ON HOVER ==========
document.querySelectorAll('.service-card-3d, .skill-card-3d, .contact-link-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.filter = 'drop-shadow(0 0 5px var(--neon-green))';
    });
    el.addEventListener('mouseleave', () => {
        el.style.filter = 'none';
    });
});

// ========== PARALLAX EFFECT FOR SKILL CARDS ==========
function initParallaxCards() {
    const skillCards = document.querySelectorAll('.skill-card-3d');
    
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        });
    });
}

// ========== RANDOM GLITCH EFFECT (occasional) ==========
setInterval(() => {
    if (Math.random() > 0.97) {
        const glitchElements = document.querySelectorAll('.glitch-text, .glitch-text-sm, .hero-title');
        glitchElements.forEach(el => {
            el.style.transform = `skew(${Math.random() * 10 - 5}deg)`;
            setTimeout(() => {
                el.style.transform = 'skew(0)';
            }, 100);
        });
    }
}, 5000);

// ========== TYPEWRITER EFFECT - DISABLED (previene layout shift) ==========
function initTypewriter() {
    // Typewriter effect removed to prevent layout shift
    // All text is already visible in HTML from the start
    console.log('Typewriter disabled - no layout shift');
}

// ========== RESIZE HANDLER ==========
window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    
    // Recalculate drops for new width
    const newColumns = width / fontSize;
    drops.length = newColumns;
    for (let x = 0; x < newColumns; x++) {
        if (drops[x] === undefined) drops[x] = Math.floor(Math.random() * height);
    }
});

// ========== INIT ALL FUNCTIONS ==========
function initAnimations() {
    init3DCards();
    initNavigation();
    initParallaxCards();
    initTypewriter();
    animateNumbers(); // Ensure numbers animate when content appears
    
    // Add random glitch class to elements
    setInterval(() => {
        const randomCard = document.querySelectorAll('.service-card-3d, .skill-card-3d')[Math.floor(Math.random() * 8)];
        if (randomCard) {
            randomCard.style.animation = 'glitch 0.2s';
            setTimeout(() => {
                randomCard.style.animation = '';
            }, 200);
        }
    }, 8000);
}

// ========== ADD GLITCH ANIMATION KEYFRAMES ==========
const glitchKeyframes = document.createElement('style');
glitchKeyframes.textContent = `
    @keyframes glitch {
        0% { transform: translate(0); }
        20% { transform: translate(-2px, 1px); }
        40% { transform: translate(2px, -1px); }
        60% { transform: translate(-1px, 2px); }
        80% { transform: translate(1px, -2px); }
        100% { transform: translate(0); }
    }
`;
document.head.appendChild(glitchKeyframes);

// ========== SCROLL PROGRESS INDICATOR ==========
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / maxScroll) * 100;
    
    // Optional: Add a scroll progress bar to the top
    let progressBar = document.querySelector('.scroll-progress-bar');
    if (!progressBar && progress > 0) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--neon-green), var(--neon-cyan));
            z-index: 1000;
            transition: width 0.1s;
        `;
        document.body.appendChild(progressBar);
    }
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
});
