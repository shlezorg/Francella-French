/* ==========================================================================
   FRANCILLA FRENCH ACADEMY - MAIN INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Scroll-Based Header / Navbar Styling
    // ==========================================
    const header = document.querySelector('.navbar-header');
    const scrollThreshold = 50;

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once in case page loads scrolled down


    // ==========================================
    // 2. Mobile Menu / Hamburger Toggle
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMobileMenu = () => {
        navMenu.classList.toggle('active');
        // Toggle hamburger icon between menu and close state
        const menuIcon = hamburgerBtn.querySelector('svg');
        if (navMenu.classList.contains('active')) {
            menuIcon.innerHTML = `
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            `;
        } else {
            menuIcon.innerHTML = `
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            `;
        }
    };

    hamburgerBtn.addEventListener('click', toggleMobileMenu);

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });


    // ==========================================
    // 3. Active Menu Item Sync (Scroll Spy)
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + 160; // offset for fixed header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollSpy);


    // ==========================================
    // 4. Scroll Reveal Animations
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal-fade-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });


    // ==========================================
    // 5. Stat Counter Count-up Animation
    // ==========================================
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const startCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds animation
            const stepTime = Math.max(Math.floor(duration / target), 15);
            let current = 0;

            const timer = setInterval(() => {
                if (target >= 100) {
                    current += Math.ceil(target / (duration / stepTime));
                } else {
                    current += 1;
                }

                if (current >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                } else {
                    counter.innerText = current;
                }
            }, stepTime);
        });
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                startCounters();
                hasCounted = true;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }


    // ==========================================
    // 6. Testimonials Slider
    // ==========================================
    const track = document.getElementById('testimonials-track');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoSlideInterval;

    const updateSlider = (index) => {
        // Move track
        track.style.transform = `translateX(-${index * 33.333}%)`;
        
        // Update dots state
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        currentSlide = index;
    };

    const nextSlide = () => {
        let nextIndex = (currentSlide + 1) % totalSlides;
        updateSlider(nextIndex);
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 4500); // Slide every 4.5 seconds
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Dot click interaction
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            stopAutoSlide();
            const targetIndex = parseInt(e.target.getAttribute('data-index'));
            updateSlider(targetIndex);
            startAutoSlide();
        });
    });

    // Initialize auto slide
    if (track && dots.length > 0) {
        startAutoSlide();
    }
});
