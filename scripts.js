    document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher with enhanced transitions
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const root = document.documentElement;
    
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
    const currentTheme = localStorage.getItem('theme') || 'light';
    root.setAttribute('data-theme', currentTheme);
    toggleSwitch.checked = currentTheme === 'dark';

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

    // Enhanced Contact Form with Email Integration
    const contactForm = document.getElementById('contact-form');
    const YOUR_EMAIL = 'your.email@example.com'; // Replace with your email

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.submit-btn');
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim(),
            to_email: YOUR_EMAIL
        };

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        if (!isValidEmail(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Here you would implement your email sending logic
            // Example using EmailJS:
            /*
            await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                formData,
                'YOUR_USER_ID'
            );
            */
            
            // For demonstration, using a timeout
            await new Promise(resolve => setTimeout(resolve, 1000));
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            console.error('Error sending email:', error);
            alert('There was an error sending your message. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Smooth scroll navigation
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
