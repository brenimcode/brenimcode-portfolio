let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links =>{
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ' ]').classList.add('active')
            })
        }
    })
}


menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// Projects Filter and Animation System
// Ajuste para funcionar com suas classes do HTML
class ProjectsManager {
    constructor() {
        // Corrija os seletores para bater com o HTML
        this.filterButtons = document.querySelectorAll('.my-projects-filter-btn');
        this.projectItems = document.querySelectorAll('.my-projects-item');
        this.emptyState = document.getElementById('myProjectsEmptyState');
        this.activeFilter = 'all';

        this.init();
    }

    init() {
        this.bindEvents();
        this.animateOnLoad();
    }

    bindEvents() {
        // Filter button click events
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute('data-filter');
                this.setActiveFilter(filter);
                this.filterProjects(filter);
            });
        });
    }

    setActiveFilter(filter) {
        // Update active button
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filter) {
                btn.classList.add('active');
            }
        });

        this.activeFilter = filter;
    }

    filterProjects(filter) {
        let visibleCount = 0;

        this.projectItems.forEach((item) => {
            const category = item.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;

            if (shouldShow) {
                item.classList.add('show');
                visibleCount++;
            } else {
                item.classList.remove('show');
            }
        });

        // Show/hide empty state
        this.toggleEmptyState(visibleCount === 0);
    }

    toggleEmptyState(show) {
        if (show) {
            this.emptyState.style.display = 'block';
        } else {
            this.emptyState.style.display = 'none';
        }
    }

    animateOnLoad() {
        // Opcional: animação inicial
    }
}

// Utility Functions
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Animate elements when they come into view
    animateOnScroll() {
        const elements = document.querySelectorAll('.project-item');
        
        elements.forEach(element => {
            if (this.isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('fade-in', 'animated');
            }
        });
    }
};

// Advanced Features
class AdvancedFeatures {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupParticleEffect();
        this.setupKeyboardNavigation();
        this.setupAccessibility();
        this.setupAnalytics();
    }
    
    setupParticleEffect() {
        // Create subtle particle background effect
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        function createParticles() {
            for (let i = 0; i < 120; i++) { // mais partículas
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.8, 
                    vy: (Math.random() - 0.5) * 0.7,
                    size: Math.random() * 2.5 + 0.5 // partículas maiores
                });
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = '#4F9CFF';
                ctx.fill();
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        resizeCanvas();
        createParticles();
        animateParticles();
        
        window.addEventListener('resize', resizeCanvas);
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Navigate filters with arrow keys
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const activeButton = document.querySelector('.filter-btn.active');
                const buttons = Array.from(document.querySelectorAll('.filter-btn'));
                const currentIndex = buttons.indexOf(activeButton);
                
                let nextIndex;
                if (e.key === 'ArrowRight') {
                    nextIndex = (currentIndex + 1) % buttons.length;
                } else {
                    nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                }
                
                buttons[nextIndex].click();
                buttons[nextIndex].focus();
                e.preventDefault();
            }
        });
    }
    
    setupAccessibility() {
        // Add ARIA labels and roles
        document.querySelectorAll('.project-card').forEach((card, index) => {
            card.setAttribute('role', 'article');
            card.setAttribute('aria-label', `Project ${index + 1}`);
        });
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-pressed', btn.classList.contains('active'));
        });
        
        // Update ARIA states when filters change
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const btn = mutation.target;
                    btn.setAttribute('aria-pressed', btn.classList.contains('active'));
                }
            });
        });
        
        document.querySelectorAll('.filter-btn').forEach(btn => {
            observer.observe(btn, { attributes: true });
        });
    }
    
    setupAnalytics() {
        // Track filter usage
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                console.log(`Filter used: ${filter}`);
                // Here you would send to your analytics service
            });
        });
        
        // Track project interactions
        document.querySelectorAll('.project-card a').forEach(link => {
            link.addEventListener('click', (e) => {
                const projectTitle = e.target.closest('.project-card')
                    .querySelector('.project-title').textContent;
                const linkType = e.target.textContent.includes('Demo') ? 'demo' : 'source';
                
                console.log(`Project link clicked: ${projectTitle} - ${linkType}`);
                // Here you would send to your analytics service
            });
        });
    }
}

// Performance Optimization
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.lazyLoadImages();
        this.optimizeAnimations();
        this.setupIntersectionObserver();
    }
    
    lazyLoadImages() {
        // If you add images later, this will handle lazy loading
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    optimizeAnimations() {
        // Reduce animations on slower devices
        if (navigator.hardwareConcurrency < 4) {
            document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
        }
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.body.style.animationPlayState = 'paused';
            } else {
                document.body.style.animationPlayState = 'running';
            }
        });
    }
    
    setupIntersectionObserver() {
        // Optimize animations based on viewport visibility
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.project-item').forEach(item => {
            projectObserver.observe(item);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    const projectsManager = new ProjectsManager();
    
    // Advanced features
    const advancedFeatures = new AdvancedFeatures();
    
    // Performance optimizations
    const performanceOptimizer = new PerformanceOptimizer();
    
    // Setup scroll-based animations
    const debouncedScrollHandler = Utils.debounce(() => {
        Utils.animateOnScroll();
    }, 100);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Initial scroll check
    Utils.animateOnScroll();
    
    console.log('Projects section initialized successfully! 🚀');
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectsManager, Utils, AdvancedFeatures, PerformanceOptimizer };
}