document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const header = document.querySelector('.header');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const htmlElement = document.documentElement;
    
    // Theme Toggle Functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Animate theme change
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 500);
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }
    
    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMobile.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - header.offsetHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Project Filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Apply filter to project cards
            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add shadow and background to header when scrolled
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header when scrolling down, show when scrolling up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        // Hide scroll indicator when scrolled
        if (scrollTop > 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.section, .project-card, .skill-card');
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load
    
    // Form validation and submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('error');
                isValid = false;
            } else {
                nameInput.classList.remove('error');
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                emailInput.classList.add('error');
                isValid = false;
            } else {
                emailInput.classList.remove('error');
            }
            
            if (messageInput.value.trim() === '') {
                messageInput.classList.add('error');
                isValid = false;
            } else {
                messageInput.classList.remove('error');
            }
            
            if (isValid) {
                // Prepare form data for mailto link
                const subject = document.getElementById('subject').value;
                const body = `Name: ${nameInput.value}\nEmail: ${emailInput.value}\n\n${messageInput.value}`;
                
                // Create mailto link
                const mailtoLink = `mailto:leejm-wm24@student.tarc.edu.my?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Reset form
                contactForm.reset();
                
                // Show success message
                const formGroup = messageInput.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Message sent successfully!';
                formGroup.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Tech icons animation in hero section
    const techIcons = document.querySelectorAll('.tech-icon');
    
    function animateTechIcons() {
        techIcons.forEach((icon, index) => {
            setTimeout(() => {
                icon.classList.add('animated');
            }, index * 200);
        });
    }
    
    animateTechIcons();
    
    // Typing animation for hero text
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle) {
        const greeting = heroTitle.querySelector('.greeting');
        const name = heroTitle.querySelector('.name');
        
        if (greeting && name) {
            greeting.style.opacity = '0';
            name.style.opacity = '0';
            
            setTimeout(() => {
                greeting.style.opacity = '1';
                greeting.classList.add('typing-animation');
                
                setTimeout(() => {
                    name.style.opacity = '1';
                    name.classList.add('typing-animation');
                }, 1000);
            }, 500);
        }
    }
    
    // Initialize counters for statistics when they come into view
    const stats = document.querySelectorAll('.stat-number');
    let countersStarted = false;
    
    function startCounters() {
        if (countersStarted) return;
        
        const aboutSection = document.querySelector('#about');
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        
        if (aboutPosition < window.innerHeight - 200) {
            countersStarted = true;
            
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                const duration = 2000; // 2 seconds
                const step = 30; // Update every 30ms
                const increment = target / (duration / step);
                let current = 0;
                
                const counter = setInterval(() => {
                    current += increment;
                    
                    if (current >= target) {
                        stat.textContent = target + '+';
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current) + '+';
                    }
                }, step);
            });
        }
    }
    
    window.addEventListener('scroll', startCounters);
    startCounters(); // Check on initial load
});
