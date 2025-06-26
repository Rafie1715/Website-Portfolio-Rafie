document.addEventListener("DOMContentLoaded", function () {

    // Navbar transparency effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for nav links
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade-in animation for sections on scroll
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
            // Pastikan yang diklik adalah tombol
            if (e.target.tagName === 'BUTTON') {
                
                // Simpan tombol yang sedang aktif SEBELUM diubah
                const currentActiveBtn = filterContainer.querySelector('.active');
                if (currentActiveBtn) {
                    currentActiveBtn.classList.remove('active', 'btn-warning');
                    currentActiveBtn.classList.add('btn-outline-secondary');
                }
                
                // Tambahkan kelas aktif ke tombol yang BARU diklik
                e.target.classList.add('active', 'btn-warning');
                e.target.classList.remove('btn-outline-secondary');
                
                const filterValue = e.target.getAttribute('data-filter');

                projectItems.forEach(item => {
                    // Logika untuk menyembunyikan atau menampilkan item
                    if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                        // Hapus kelas 'hide' untuk menampilkan
                        item.classList.remove('hide');
                        item.classList.add('show');
                    } else {
                        // Tambah kelas 'hide' untuk menyembunyikan
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