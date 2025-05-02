document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Initialize EmailJS (replace with your actual User ID)
    (function() {
        emailjs.init("service_1c4c90n"); // Replace with your EmailJS user ID
    })();

    // Mobile Menu Toggle with GSAP
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    const navLinksArray = Array.from(document.querySelectorAll('.nav-link'));

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            // Close menu animation
            gsap.to(navLinks, {
                x: '-100%',
                duration: 0.5,
                ease: "power2.inOut",
                onComplete: () => navLinks.classList.remove('active')
            });
            
            gsap.to(navItems, {
                x: '-30px',
                opacity: 0,
                stagger: 0.1,
                duration: 0.3,
                ease: "power2.inOut"
            });
        } else {
            // Open menu animation
            navLinks.classList.add('active');
            gsap.fromTo(navLinks, 
                { x: '-100%' }, 
                { x: '0%', duration: 0.5, ease: "power2.inOut" }
            );
            
            gsap.fromTo(navItems, 
                { x: '-30px', opacity: 0 }, 
                { 
                    x: '0px', 
                    opacity: 1, 
                    stagger: 0.1, 
                    duration: 0.5, 
                    ease: "back.out(1.7)",
                    delay: 0.3
                }
            );
        }
    });

    // Typing Animation
    const typingText = document.querySelector('.typing-text');
    const texts = ["Alagesan", "a Developer", "a CEO", "a Designer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            isEnd = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            const speed = isDeleting ? 100 : 200;
            setTimeout(type, isEnd ? speed * 2 : speed);
        }
    }

    // Start typing animation after 1 second
    setTimeout(type, 1000);

    // Particles Animation
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100 + 100; // Start below viewport
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            const opacity = Math.random() * 0.5 + 0.1;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = opacity;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // GSAP Scroll Animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out"
        });
    });

    // Animate service cards with stagger
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true
            },
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.8,
            delay: i * 0.1,
            ease: "back.out(1.7)"
        });
    });

    // Animate project cards with stagger
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none",
                once: true
            },
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    // Floating social icons
    gsap.to('.social-icon', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2
    });

    // Button click animations
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            this.appendChild(ripple);
            
            // Get click position
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Position the ripple
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Form submission with EmailJS
    const emailForm = document.getElementById('emailForm');
    const formMessage = document.getElementById('formMessage');

    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Send email using EmailJS
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        })
        .then(() => {
            // Success message
            formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully.`;
            formMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.2)';
            formMessage.style.color = 'var(--success)';
            
            // Show success message with animation
            gsap.fromTo(formMessage, 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    display: 'block',
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }
            );
            
            // Reset form
            emailForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Hide message after delay
            setTimeout(() => {
                gsap.to(formMessage, {
                    opacity: 0,
                    y: -20,
                    duration: 0.5,
                    ease: "power1.inOut",
                    onComplete: () => formMessage.style.display = 'none'
                });
            }, 5000);
        }, (error) => {
            // Error message
            formMessage.textContent = `Oops! Something went wrong. Please try again later.`;
            formMessage.style.backgroundColor = 'rgba(220, 53, 69, 0.2)';
            formMessage.style.color = '#dc3545';
            
            gsap.fromTo(formMessage, 
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    display: 'block',
                    duration: 0.5,
                    ease: "back.out(1.7)"
                }
            );
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            console.error('Email sending failed:', error);
        });
    });

    // Enhanced Navigation with Active State
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update active nav link on scroll
    function updateActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initialize

    // Smooth scrolling for anchor links with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    menuBtn.classList.remove('active');
                    gsap.to(navLinks, {
                        x: '-100%',
                        duration: 0.5,
                        ease: "power2.inOut",
                        onComplete: () => navLinks.classList.remove('active')
                    });
                }
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll to target
                gsap.to(window, {
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    duration: 1,
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initialize scroll position for header
    window.dispatchEvent(new Event('scroll'));
});