document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };

    const filterContainer = document.querySelector('#project-filters');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                
                const currentActiveBtn = filterContainer.querySelector('.active');
                if (currentActiveBtn) {
                    currentActiveBtn.classList.remove('active', 'btn-warning');
                    currentActiveBtn.classList.add('btn-outline-secondary');
                }
                
                e.target.classList.add('active', 'btn-warning');
                e.target.classList.remove('btn-outline-secondary');
                
                const filterValue = e.target.getAttribute('data-filter');

                projectItems.forEach(item => {
                    if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hide');
                    }
                });
            }
        });
    }
});

const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    width: '90vw',
    height: '80vh'
});

const cursorDot = document.querySelector('[data-cursor-dot]');
const cursorOutline = document.querySelector('[data-cursor-outline]');
const hoverables = document.querySelectorAll('a, button'); // Semua elemen yang bisa di-hover

window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

hoverables.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hover');
        cursorOutline.classList.add('hover');
    });
    link.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hover');
        cursorOutline.classList.remove('hover');
    });
});