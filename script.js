document.addEventListener('DOMContentLoaded', () => {

    /* ===== NAVBAR ACTIVE STATE ===== */
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    function setActiveNav() {
        const scrollY = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-links a[data-section="${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();

    /* ===== NAVBAR SHRINK ===== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            navbar.style.height = '60px';
        } else {
            navbar.style.height = '72px';
        }
    });

    /* ===== MOBILE MENU ===== */
    const toggle = document.getElementById('mobile-toggle');
    const navLinksEl = document.getElementById('nav-links');
    if (toggle) {
        toggle.addEventListener('click', () => {
            navLinksEl.classList.toggle('open');
        });
        // Close on link click
        navLinksEl.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => navLinksEl.classList.remove('open'));
        });
    }

    /* ===== SCROLL REVEAL ===== */
    const revealTargets = document.querySelectorAll(
        '.tl-card, .strategy-card, .project-card, .philosophy-card, .status-card, .section-header, .contact-headline, .contact-grid, .stat-row, .alignment-index, .hero-left, .hero-right'
    );
    revealTargets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealTargets.forEach(el => observer.observe(el));

    /* ===== PROJECT FILTERING ===== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    /* ===== CONTACT FORM ===== */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const original = btn.innerHTML;
            btn.innerHTML = 'TRANSMITTED &#10003;';
            btn.style.background = '#22c55e';
            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                form.reset();
            }, 3000);
        });
    }

    /* ===== SMOOTH SCROLL for nav links ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
