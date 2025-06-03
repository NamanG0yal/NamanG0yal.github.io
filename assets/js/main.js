// Main JavaScript for Portfolio Website
(function() {
    'use strict';

    // DOM Elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Initialize all functionality
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigation();
        initializeScrollEffects();
        initializeSmoothScrolling();
        initializePerformanceOptimizations();
        initializeAnalytics();
    });

    // Navigation functionality
    function initializeNavigation() {
        if (navToggle) {
            navToggle.addEventListener('click', toggleMobileMenu);
        }

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                closeMobileMenu();
            }
        });

        // Handle keyboard navigation
        navToggle?.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleMobileMenu();
            }
        });
    }

    function toggleMobileMenu() {
        navMenu?.classList.toggle('active');
        navToggle?.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        const isExpanded = navMenu?.classList.contains('active');
        navToggle?.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    }

    function closeMobileMenu() {
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
        navToggle?.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Scroll effects
    function initializeScrollEffects() {
        let lastScrollTop = 0;

        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Add/remove navbar background on scroll
            if (scrollTop > 50) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar?.classList.add('nav-hidden');
            } else {
                navbar?.classList.remove('nav-hidden');
            }

            lastScrollTop = scrollTop;
        }, 100));

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.research-item, .publication-item, .teaching-item');
        animatedElements.forEach(el => observer.observe(el));
    }

    // Smooth scrolling for anchor links
    function initializeSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                const href = this.getAttribute('href');
                
                if (href.startsWith('#')) {
                    event.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });

                        // Update active nav link
                        updateActiveNavLink(href);
                    }
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', throttle(updateActiveNavLinkOnScroll, 100));
    }

    function updateActiveNavLink(activeHref) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeHref) {
                link.classList.add('active');
            }
        });
    }

    function updateActiveNavLinkOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNavLink(`#${sectionId}`);
            }
        });
    }

    // Performance optimizations
    function initializePerformanceOptimizations() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Preload critical resources
        preloadCriticalResources();
    }

    function preloadCriticalResources() {
        // Preload important images
        const criticalImages = [
            './assets/images/profile-photo.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Analytics and tracking (privacy-friendly)
    function initializeAnalytics() {
        // Track page view
        trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href
        });

        // Track scroll depth
        let maxScrollDepth = 0;
        window.addEventListener('scroll', throttle(function() {
            const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.body.offsetHeight * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                if (maxScrollDepth % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                    trackEvent('scroll_depth', {
                        depth: maxScrollDepth
                    });
                }
            }
        }, 1000));

        // Track outbound link clicks
        document.addEventListener('click', function(event) {
            const link = event.target.closest('a');
            if (link && link.hostname !== window.location.hostname) {
                trackEvent('outbound_click', {
                    url: link.href,
                    text: link.textContent.trim()
                });
            }
        });
    }

    function trackEvent(eventName, parameters) {
        // Privacy-friendly analytics tracking
        // Replace with your preferred analytics solution
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Console log for development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('Analytics Event:', eventName, parameters);
        }
    }

    // Utility functions
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    function debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Error handling
    window.addEventListener('error', function(event) {
        console.error('JavaScript Error:', event.error);
        // Track error if analytics is available
        trackEvent('javascript_error', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno
        });
    });

    // Performance monitoring
    window.addEventListener('load', function() {
        setTimeout(function() {
            if ('performance' in window && 'timing' in window.performance) {
                const timing = window.performance.timing;
                const loadTime = timing.loadEventEnd - timing.navigationStart;
                
                trackEvent('page_load_time', {
                    load_time: loadTime,
                    dom_content_loaded: timing.domContentLoadedEventEnd - timing.navigationStart
                });
            }
        }, 0);
    });

})();
