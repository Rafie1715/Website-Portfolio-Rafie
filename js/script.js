document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollTopBtn) {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    sections.forEach(section => {
        observer.observe(section);
    });

    const filterContainer = document.querySelector('#project-filters');
    const projectItems = document.querySelectorAll('.project-item');

    if (filterContainer) {
        filterContainer.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') {
                const currentActiveBtn = filterContainer.querySelector('.active');
                if (currentActiveBtn) {
                    currentActiveBtn.classList.remove('active', 'btn-warning', 'btn-primary');
                    currentActiveBtn.classList.add('btn-outline-secondary');
                }
                
                e.target.classList.add('active', 'btn-primary');
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

    const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        width: '90vw',
        height: '80vh'
    });
});
