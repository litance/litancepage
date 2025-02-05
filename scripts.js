document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher with enhanced transitions
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const root = document.documentElement;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }
    
    function switchTheme(e) {
        const isDark = e.target.checked;
        const theme = isDark ? 'dark' : 'light';
        
        // Add transition class
        root.classList.add('theme-transition');
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Remove transition class after animation completes
        setTimeout(() => {
            root.classList.remove('theme-transition');
        }, 300);

        // Update UI elements
        document.querySelectorAll('.glass-effect').forEach(el => {
            el.style.transition = 'background-color 0.3s ease';
        });
    }

    toggleSwitch.addEventListener('change', switchTheme);

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', savedTheme);
    toggleSwitch.checked = savedTheme === 'dark';

    // Enhanced Project Carousel with touch/swipe
    const slider = document.querySelector('.project-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.project-card');
    let currentIndex = 0;
    let startX, moveX;
    let isDragging = false;

    function updateSlider(animate = true) {
        const cardWidth = cards[0].offsetWidth + 32;
        slider.style.transition = animate ? 'transform 0.5s ease' : 'none';
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === cards.length - 1;
    }

    // Touch and mouse event handlers
    slider.addEventListener('mousedown', handleDragStart);
    slider.addEventListener('touchstart', handleDragStart);
    slider.addEventListener('mousemove', handleDragMove);
    slider.addEventListener('touchmove', handleDragMove);
    slider.addEventListener('mouseup', handleDragEnd);
    slider.addEventListener('touchend', handleDragEnd);
    slider.addEventListener('mouseleave', handleDragEnd);

    function handleDragStart(e) {
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        isDragging = true;
        slider.style.transition = 'none';
    }

    function handleDragMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        moveX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const walk = moveX - startX;
        const cardWidth = cards[0].offsetWidth + 32;
        slider.style.transform = `translateX(${-currentIndex * cardWidth + walk}px)`;
    }

    function handleDragEnd() {
        if (!isDragging) return;
        isDragging = false;
        const cardWidth = cards[0].offsetWidth + 32;
        const walk = moveX - startX;
        
        if (Math.abs(walk) > cardWidth / 3) {
            if (walk > 0 && currentIndex > 0) {
                currentIndex--;
            } else if (walk < 0 && currentIndex < cards.length - 1) {
                currentIndex++;
            }
        }
        updateSlider();
    }

    // Button controls
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('.submit-btn');
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Simulate sending (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Message sent successfully!');
            contactForm.reset();
        } catch (error) {
            alert('Failed to send message. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize the slider
    updateSlider(false);
});
