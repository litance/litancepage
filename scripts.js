document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher with localStorage
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    }

    toggleSwitch.addEventListener('change', switchTheme);

    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    // Enhanced Project Carousel with Touch Support
    const slider = document.querySelector('.project-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.project-card');
    let currentIndex = 0;
    let startX, moveX;
    let isDragging = false;

    function updateSlider(animate = true) {
        const cardWidth = cards[0].offsetWidth + 32;
        if (animate) {
            slider.style.transition = 'transform 0.5s ease';
        } else {
            slider.style.transition = 'none';
        }
        slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }

    function handleTouchStart(e) {
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].pageX;
        isDragging = true;
        slider.style.transition = 'none';
    }

    function handleTouchMove(e) {
        if (!isDragging) return;
        e.preventDefault();
        moveX = e.type === 'mousemove' ? e.pageX : e.touches[0].pageX;
        const walk = moveX - startX;
        const cardWidth = cards[0].offsetWidth + 32;
        slider.style.transform = `translateX(${-currentIndex * cardWidth + walk}px)`;
    }

    function handleTouchEnd() {
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

    // Touch and mouse event listeners
    slider.addEventListener('mousedown', handleTouchStart);
    slider.addEventListener('touchstart', handleTouchStart);
    slider.addEventListener('mousemove', handleTouchMove);
    slider.addEventListener('touchmove', handleTouchMove);
    slider.addEventListener('mouseup', handleTouchEnd);
    slider.addEventListener('touchend', handleTouchEnd);
    slider.addEventListener('mouseleave', handleTouchEnd);

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

    // Enhanced Project Button Links with Loading State
    document.querySelectorAll('.project-btn').forEach(btn => {
        btn.addEventListener('click', async function(e) {
            e.preventDefault();
            const projectLink = this.getAttribute('data-link');
            if (projectLink) {
                this.style.opacity = '0.7';
                this.textContent = 'Loading...';
                try {
                    await new Promise(resolve => setTimeout(resolve, 500)); // Simulated loading
                    window.open(projectLink, '_blank');
                } finally {
                    this.style.opacity = '1';
                    this.textContent = 'Learn More';
                }
            }
        });
    });

    // Enhanced Contact Form with Validation and Feedback
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('.submit-btn');
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        if (!formData.email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form submitted:', formData);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } catch (error) {
            alert('There was an error sending your message. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });

    // Smooth scroll for navigation links
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
});
