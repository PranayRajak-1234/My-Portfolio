// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a nav item is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Scrolling Effects
    const header = document.querySelector('header');
    const scrollWatcher = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active nav link based on section
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', scrollWatcher);
    
    // Smooth scrolling for anchor links
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    }
    
    // Add click event to all anchor links for smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            scrollToSection(sectionId);
        });
    });
    
    // Handle "See My Work" button click
    const ctaButton = document.querySelector('#hero button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            scrollToSection('projects');
        });
    }
    
    // Form submission handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Simulate form submission 
            const submitBtn = contactForm.querySelector('.submit-btn');
            const defaultText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Display success message
                const formElements = contactForm.elements;
                const formData = {};
                
                for (let i = 0; i < formElements.length; i++) {
                    const element = formElements[i];
                    if (element.name) {
                        formData[element.name] = element.value;
                    }
                }
                
                console.log('Form Data:', formData);
                
                // Reset form and button
                contactForm.reset();
                submitBtn.innerHTML = defaultText;
                submitBtn.disabled = false;
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
                
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
    
    // Add animation classes when elements come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.project-card, .skill-item, .certification-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check for animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Typing effect for hero section
    const heroTitle = document.querySelector('#hero h1');
    const heroSubtitle = document.querySelector('#hero h2');
    
    if (heroTitle && heroSubtitle) {
        setTimeout(() => {
            heroTitle.classList.add('typed');
            
            setTimeout(() => {
                heroSubtitle.classList.add('typed');
            }, 500);
        }, 500);
    }
});

// Add CSS class to body when page is fully loaded
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});