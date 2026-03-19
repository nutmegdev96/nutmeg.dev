// Matrix effect with cyberpunk colors
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Cyberpunk characters
const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
const charArray = chars.split("");

const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for(let x = 0; x < columns; x++) {
    drops[x] = Math.floor(Math.random() * canvas.height);
}

// Cyberpunk color cycling
let hue = 180; // Start with cyan

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 5, 7, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cycle through cyberpunk colors
    hue = (hue + 0.1) % 360;
    const color = `hsl(${hue}, 100%, 50%)`;
    
    ctx.fillStyle = color;
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 30);

// Initial loading animation
window.addEventListener('load', () => {
    const overlay = document.getElementById('initialOverlay');
    const mainContent = document.getElementById('mainContent');
    
    // Progress bar animation
    const progressFill = document.querySelector('.progress-fill');
    let width = 0;
    const interval = setInterval(() => {
        width += 1;
        progressFill.style.width = width + '%';
        if (width >= 100) {
            clearInterval(interval);
            
            // Fade out overlay
            setTimeout(() => {
                overlay.classList.add('fade-out');
                setTimeout(() => {
                    overlay.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    startCyberEffects();
                }, 1000);
            }, 500);
        }
    }, 30);
});

// Cyberpunk effects
function startCyberEffects() {
    animateTitle();
    initSkillNodes();
    initParticles();
}

// Glitch title animation
function animateTitle() {
    const titles = document.querySelectorAll('.cyber-title-line');
    setInterval(() => {
        titles.forEach(title => {
            title.style.transform = `skew(${Math.random() * 10 - 5}deg)`;
            setTimeout(() => {
                title.style.transform = 'skew(0)';
            }, 100);
        });
    }, 3000);
}

// Skill nodes interaction
function initSkillNodes() {
    document.querySelectorAll('.skill-node').forEach(node => {
        node.addEventListener('mouseenter', function() {
            const glow = this.querySelector('.node-glow');
            glow.style.opacity = '0.5';
            
            // Create data stream effect
            for (let i = 0; i < 5; i++) {
                createDataStream(this);
            }
        });
        
        node.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.node-glow');
            glow.style.opacity = '0';
        });
    });
}

// Data stream effect
function createDataStream(element) {
    const rect = element.getBoundingClientRect();
    const stream = document.createElement('div');
    stream.className = 'data-stream';
    stream.style.cssText = `
        position: fixed;
        left: ${rect.left + Math.random() * rect.width}px;
        top: ${rect.top}px;
        color: #0ff;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        animation: stream-fall 1s linear forwards;
    `;
    stream.textContent = '0101';
    document.body.appendChild(stream);
    
    setTimeout(() => stream.remove(), 1000);
}

// Particle effect on Web3 click
document.querySelectorAll('.web3-tag, .highlight-web3').forEach(el => {
    el.addEventListener('click', function(e) {
        for (let i = 0; i < 15; i++) {
            createCyberParticle(e.clientX, e.clientY);
        }
    });
});

function createCyberParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        color: ${Math.random() > 0.5 ? '#ff00ff' : '#00ffff'};
        font-size: ${Math.random() * 20 + 10}px;
        font-weight: bold;
        pointer-events: none;
        z-index: 1000;
        text-shadow: 0 0 10px currentColor;
        animation: particle-burst 1s ease-out forwards;
    `;
    particle.textContent = Math.random() > 0.5 ? '⚡' : '01';
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

// Random particles background
function initParticles() {
    setInterval(() => {
        if (Math.random() > 0.7) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createCyberParticle(x, y);
        }
    }, 500);
}

// Smooth scroll
document.querySelectorAll('.neon-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Active navigation highlight
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.neon-link');
    
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

// Form handling
document.getElementById('quoteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = e.target.querySelector('button');
    const originalText = button.querySelector('.button-text').textContent;
    button.querySelector('.button-text').textContent = 'SENDING...';
    button.disabled = true;
    
    // Cyberpunk style alert
    setTimeout(() => {
        showCyberAlert('MESSAGE TRANSMITTED ✓\n\nI\'ll contact you through the neural link...');
        button.querySelector('.button-text').textContent = originalText;
        button.disabled = false;
        e.target.reset();
    }, 1500);
});

function showCyberAlert(message) {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(5, 5, 7, 0.95);
        border: 2px solid #00ffff;
        padding: 2rem;
        color: #00ffff;
        font-family: 'Share Tech Mono', monospace;
        text-align: center;
        z-index: 2000;
        box-shadow: 0 0 50px rgba(0, 255, 255, 0.5);
        animation: alert-pulse 2s infinite;
    `;
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.animation = 'fade-out 0.5s forwards';
        setTimeout(() => alert.remove(), 500);
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes stream-fall {
        0% { transform: translateY(-100%); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
    
    @keyframes particle-burst {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0); opacity: 0; }
    }
    
    @keyframes alert-pulse {
        0%, 100% { box-shadow: 0 0 50px rgba(0, 255, 255, 0.5); }
        50% { box-shadow: 0 0 100px rgba(255, 0, 255, 0.5); }
    }
    
    @keyframes fade-out {
        to { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    }
`;
document.head.appendChild(style);

// Mouse trail effect
document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 2px;
            height: 2px;
            background: ${Math.random() > 0.5 ? '#00ffff' : '#ff00ff'};
            box-shadow: 0 0 10px currentColor;
            pointer-events: none;
            z-index: 9999;
            animation: trail-fade 0.5s forwards;
        `;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
    }
});

// Keyboard easter egg
let konamiCode = [];
const secretCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Konami code

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > secretCode.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join() === secretCode.join()) {
        activateCyberMode();
        konamiCode = [];
    }
});

function activateCyberMode() {
    document.body.style.animation = 'rainbow-bg 0.1s infinite';
    setTimeout(() => {
        document.body.style.animation = 'none';
    }, 3000);
}

// Resize handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
