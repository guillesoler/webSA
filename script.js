// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        // Close mobile menu
        document.getElementById('nav-menu').classList.remove('active');
    });
});

// Scroll animations and effects
function handleScroll() {
    const scrolled = window.pageYOffset;
    
    // Header background change
    const header = document.querySelector('.header');
    if (scrolled > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Scroll progress bar
    const scrollProgress = document.querySelector('.scroll-progress');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / totalHeight) * 100;
    scrollProgress.style.width = progress + '%';
    
    // Fade in animations
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Por favor, rellena todos los campos obligatorios.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Por favor, introduce un email válido.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = document.querySelector('.submit-btn');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('¡Gracias por tu consulta! Te contactaremos pronto.', 'success');
                this.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 2rem;
        padding: 1rem 2rem;
        border-radius: 1rem;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #233c67, #2d4a7a);' : 'background: linear-gradient(135deg, #ef4444, #dc2626);'}
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Enhanced interactions
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.service-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Initialize
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Resize handler
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// Add some dynamic visual effects
document.addEventListener('mousemove', function(e) {
    const floatingElements = document.querySelectorAll('.floating-card');
    floatingElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        element.style.transform = `perspective(1000px) rotateX(${y * 0.05}deg) rotateY(${x * 0.05}deg)`;
    });
});

// Performance optimization
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', function() {
    ticking = false;
    requestTick();
});

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
});

// Floating button enhanced functionality
document.addEventListener('DOMContentLoaded', function() {
    const floatingBtn = document.querySelector('.floating-btn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
});

// Enhanced form interactions
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});

// Preloader (optional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Service worker registration (optional for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration code would go here if needed
    });
}