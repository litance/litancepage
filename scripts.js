document.addEventListener('DOMContentLoaded', function() {
    // Theme Switcher
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

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

    slider.addEventListener('mousedown', handleDragStart);
    slider.addEventListener('touchstart', handleDragStart);
    slider.addEventListener('mousemove', handleDragMove);
    slider.addEventListener('touchmove', handleDragMove);
    slider.addEventListener('mouseup', handleDragEnd);
    slider.addEventListener('touchend', handleDragEnd);
    slider.addEventListener('mouseleave', handleDragEnd);

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

    updateSlider(false);

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
            const target = document.querySelector(this.getAttribute
