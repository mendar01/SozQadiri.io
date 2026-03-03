/* ==========================================================================
   assets/js/main.js
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Мобильді мәзір (Hamburger)
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Белсенді бетті (Active Link) белгілеу
    const currentPath = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Егер index.html болса немесе жол бос болса (түбірлік каталог)
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. Дәйексөздерді фильтрлеу
    const filterBtns = document.querySelectorAll('.filter-btn');
    const quoteCards = document.querySelectorAll('.quote-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Белсенді батырманы ауыстыру
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                quoteCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 4. Дәйексөзді көшіру (Copy to clipboard)
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.quote-card');
            const textToCopy = card.querySelector('.quote-text').innerText;
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btn.innerText;
                btn.innerText = 'Көшірілді!';
                setTimeout(() => {
                    btn.innerText = originalText;
                }, 2000);
            });
        });
    });

    // 5. Lightbox (Комикс галереясы үшін)
    const comicItems = document.querySelectorAll('.comic-item');
    const lightbox = document.getElementById('lightbox');
    
    if (lightbox && comicItems.length > 0) {
        const lbImg = document.getElementById('lb-img');
        const lbCounter = document.getElementById('lb-counter');
        const btnPrev = document.getElementById('lb-prev');
        const btnNext = document.getElementById('lb-next');
        const btnClose = document.getElementById('lb-close');
        
        let currentIndex = 0;
        const totalImages = comicItems.length;

        // Суретті ашу
        function openLightbox(index) {
            currentIndex = index;
            const imgSrc = comicItems[currentIndex].getAttribute('src');
            lbImg.setAttribute('src', imgSrc);
            lbCounter.innerText = `Бет: ${currentIndex + 1} / ${totalImages}`;
            lightbox.classList.add('active');
        }

        // Жабу
        function closeLightbox() {
            lightbox.classList.remove('active');
        }

        // Келесі сурет
        function nextImage() {
            currentIndex = (currentIndex + 1) % totalImages;
            openLightbox(currentIndex);
        }

        // Алдыңғы сурет
        function prevImage() {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            openLightbox(currentIndex);
        }

        // Оқиғаларды тіркеу
        comicItems.forEach((item, index) => {
            item.addEventListener('click', () => openLightbox(index));
        });

        btnClose.addEventListener('click', closeLightbox);
        btnNext.addEventListener('click', nextImage);
        btnPrev.addEventListener('click', prevImage);

        // Пернетақтамен басқару
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        });
        
        // Фонды басқанда жабу
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});