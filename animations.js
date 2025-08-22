// Typing animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    initTypingAnimation();
    initProfileAnimations();
});

// Typing animation
function initTypingAnimation() {
    const typedTextElement = document.getElementById('typed-text');
    const textArray = [
        'Network Engineer',
        'Cybersecurity Specialist',
        'Security Analyst',
        'Infrastructure Expert'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;
    
    function typeText() {
        const currentText = textArray[textIndex];
        
        if (!isDeleting) {
            // Typing
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                // Pause before deleting
                setTimeout(() => {
                    isDeleting = true;
                    typeText();
                }, pauseTime);
                return;
            }
        } else {
            // Deleting
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
            }
        }
        
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeText, speed);
    }
    
    // Start typing animation
    typeText();
}

// Profile-specific animations
function initProfileAnimations() {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) return;
    
    // Enhanced floating icon animations
    animateFloatingIcons();
    
    // Profile interaction effects
    initProfileInteractions();
    
    // Parallax effect on scroll
    initProfileParallax();
}

function animateFloatingIcons() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 10;
            const randomY = (Math.random() - 0.5) * 10;
            
            icon.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 500));
        
        // Mouse follow effect
        document.addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const iconCenterY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - iconCenterX, 2) + 
                Math.pow(e.clientY - iconCenterY, 2)
            );
            
            if (distance < 100) {
                const intensity = 1 - (distance / 100);
                const moveX = (e.clientX - iconCenterX) * intensity * 0.1;
                const moveY = (e.clientY - iconCenterY) * intensity * 0.1;
                
                icon.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    });
}

function initProfileInteractions() {
    const profileImage = document.querySelector('.profile-image');
    const profileGradient = document.querySelector('.profile-gradient-border');
    
    if (!profileImage || !profileGradient) return;
    
    // Profile hover effects
    profileImage.addEventListener('mouseenter', () => {
        profileGradient.style.animation = 'profilePulse 0.6s ease-in-out';
        
        // Add ripple effect
        createRippleEffect(profileImage);
    });
    
    profileImage.addEventListener('mouseleave', () => {
        profileGradient.style.animation = 'profileGlow 3s ease-in-out infinite alternate';
    });
    
    // Click interaction
    profileImage.addEventListener('click', () => {
        createSparkleEffect(profileImage);
    });
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border: 2px solid rgba(14, 165, 233, 0.5);
        border-radius: 50%;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        animation: rippleExpand 0.6s ease-out;
        pointer-events: none;
        z-index: 5;
    `;
    
    element.appendChild(ripple);
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleExpand {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(1.2);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('[data-ripple-style]')) {
        style.setAttribute('data-ripple-style', 'true');
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        element.removeChild(ripple);
    }, 600);
}

function createSparkleEffect(element) {
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 20px;
            pointer-events: none;
            animation: sparkleAnimation 1s ease-out forwards;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            z-index: 15;
        `;
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            element.removeChild(sparkle);
        }, 1000);
    }
    
    // Add sparkle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleAnimation {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('[data-sparkle-style]')) {
        style.setAttribute('data-sparkle-style', 'true');
        document.head.appendChild(style);
    }
}

function initProfileParallax() {
    const profileContainer = document.querySelector('.profile-container');
    if (!profileContainer) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;
        
        profileContainer.style.transform = `translateY(${rate}px)`;
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress;
                entry.target.style.width = progress + '%';
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
    
    // Counter animation for achievements
    animateCounters();
}

function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.dataset.count);
                const element = entry.target;
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        element.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        element.textContent = target;
                        element.classList.add('animated');
                    }
                };
                
                updateCounter();
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Parallax effect for background elements
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const rate = scrolled * -0.5;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Mouse following effect for profile elements
function initMouseFollowEffect() {
    const profileRings = document.querySelectorAll('.profile-ring');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        profileRings.forEach((ring, index) => {
            const rect = ring.getBoundingClientRect();
            const ringX = rect.left + rect.width / 2;
            const ringY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(Math.pow(mouseX - ringX, 2) + Math.pow(mouseY - ringY, 2));
            const maxDistance = 300;
            
            if (distance < maxDistance) {
                const intensity = 1 - (distance / maxDistance);
                const scale = 1 + (intensity * 0.1);
                ring.style.transform = `scale(${scale})`;
                ring.style.borderColor = `rgba(14, 165, 233, ${0.2 + (intensity * 0.3)})`;
            } else {
                ring.style.transform = 'scale(1)';
            }
        });
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initParallaxEffect();
    initMouseFollowEffect();
});

// Performance optimization for animations
function optimizeAnimations() {
    // Reduce animations on low-performance devices
    const isLowPerformance = navigator.hardwareConcurrency < 4;
    
    if (isLowPerformance) {
        document.body.classList.add('reduced-motion');
        
        // Add CSS for reduced motion
        const style = document.createElement('style');
        style.textContent = `
            .reduced-motion * {
                animation-duration: 0.1s !important;
                transition-duration: 0.1s !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize performance optimizations
optimizeAnimations();

// Profile image error handling
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.getElementById('profile-img');
    
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // Fallback to a default avatar if image fails to load
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMUUyOTNCIi8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzBFQTVFOSIvPgo8cGF0aCBkPSJNNjAgMTYwQzYwIDEzNy45MDkgNzggMTIwIDEwMCAxMjBTMTQwIDEzNy45MDkgMTQwIDE2MEg2MFoiIGZpbGw9IiMwRUE1RTkiLz4KPC9zdmc+';
        });
    }
});