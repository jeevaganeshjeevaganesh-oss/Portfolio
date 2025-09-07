// Function to handle scroll animations and sticky header
const handleScroll = () => {
    // Sticky Header
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }

    // "Reveal" on scroll animations
    const elementsToReveal = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const windowHeight = window.innerHeight;

    elementsToReveal.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            el.classList.add('active');
        } else {
            // Optional: Remove 'active' class when scrolling back up
            // el.classList.remove('active');
        }
    });

    // Update active class for navigation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight;
        if (pageYOffset >= sectionTop) {
            const currentId = section.getAttribute('id');
            document.querySelectorAll('.navbar a').forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${currentId}`) {
                    a.classList.add('active');
                }
            });
        }
    });
};

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll); // Run on load to reveal initial elements

// Smooth scrolling for navigation links
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - document.querySelector('.header').offsetHeight,
                behavior: 'smooth'
            });
            // Hide menu on mobile after clicking a link
            document.querySelector('.navbar').classList.remove('active');
        }
    });
});

// Hamburger menu toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.navbar').classList.toggle('active');
});

// Simple form submission handler
document.querySelector('.contact__form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you shortly.');
    this.reset();
});