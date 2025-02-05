document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate skill bars
    const skillItems = document.querySelectorAll('.skill-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                entry.target.style.setProperty('--skill-level', skillLevel + '%');
                entry.target.querySelector('::after').style.width = skillLevel + '%';
            }
        });
    });

    skillItems.forEach(item => observer.observe(item));

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send the form data to a server
        console.log('Form submitted:', formData);
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Project button click handlers
    document.querySelectorAll('.project-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectTitle = this.parentElement.querySelector('h3').textContent;
            alert(`More details about ${projectTitle} coming soon!`);
        });
    });
});
