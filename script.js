// Matrix effect
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for(let x = 0; x < columns; x++) {
    drops[x] = Math.floor(Math.random() * canvas.height);
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// Initial animation
window.addEventListener('load', () => {
    const overlay = document.getElementById('initialOverlay');
    const mainContent = document.getElementById('mainContent');
    
    // After 3 seconds, fade out overlay and show content
    setTimeout(() => {
        overlay.classList.add('fade-out');
        setTimeout(() => {
            overlay.style.display = 'none';
            mainContent.classList.remove('hidden');
            // Start title animation
            animateTitle();
        }, 2000);
    }, 3000);
});

// Glitch effect on navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'skew(-5deg)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'skew(0)';
    });
});

// Active navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Quote form handling
document.getElementById('quoteForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Sending effect
    const button = e.target.querySelector('button');
    const originalText = button.textContent;
    button.textContent = 'SENDING...';
    button.disabled = true;
    
    // Simulate sending
    setTimeout(() => {
        alert('Request sent! I\'ll get back to you soon. (Demo)');
        button.textContent = originalText;
        button.disabled = false;
        e.target.reset();
    }, 1500);
});

// Title animation with glitch effect
function animateTitle() {
    const title = document.querySelector('.glitch-title');
    title.style.animation = 'glitch-text 0.3s infinite';
    
    setTimeout(() => {
        title.style.animation = 'glitch-text 4s infinite';
    }, 1000);
}

// Hover effect on price tags
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const price = this.querySelector('.price-tag');
        price.style.color = '#fff';
        price.style.textShadow = '0 0 20px #0f0';
    });
    
    card.addEventListener('mouseleave', function() {
        const price = this.querySelector('.price-tag');
        price.style.color = '';
        price.style.textShadow = '';
    });
});

// Matrix rain intensifies on mouse enter
canvas.addEventListener('mouseenter', () => {
    canvas.style.opacity = '0.5';
});

canvas.addEventListener('mouseleave', () => {
    canvas.style.opacity = '0.3';
});

// Terminal effect for bio
const bio = document.querySelector('.bio');
const originalText = bio.innerHTML;
bio.innerHTML = '';

let i = 0;
function typeBio() {
    if(i < originalText.length) {
        bio.innerHTML += originalText.charAt(i);
        i++;
        setTimeout(typeBio, 20);
    }
}

// Start typing effect when bio is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting && entry.target.classList.contains('bio')) {
            if(i === 0) typeBio();
        }
    });
});

observer.observe(document.querySelector('.bio'));

// Particle effect on Web3 click
document.querySelectorAll('.highlight-web3').forEach(el => {
    el.addEventListener('click', function(e) {
        for(let i = 0; i < 10; i++) {
            createParticle(e.clientX, e.clientY);
        }
    });
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.color = '#ff00ff';
    particle.style.fontSize = '20px';
    particle.style.zIndex = '1000';
    particle.style.pointerEvents = 'none';
    particle.textContent = '⚡';
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity;
    let opacity = 1;
    
    function animate() {
        x += vx;
        y += vy;
        vy += 0.1; // gravity
        opacity -= 0.02;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;
        
        if(opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}
