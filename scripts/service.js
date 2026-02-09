function initServiceSlider() {
    let serviceSwiper = null;

    function handleServiceLayout() {
        const swiperElement = document.querySelector(".serviceSwiper");
        if (!swiperElement) return; 

        const isMobile = window.innerWidth < 992;
        
        if (isMobile) {
            if (!serviceSwiper || serviceSwiper.destroyed) {
                serviceSwiper = new Swiper(".serviceSwiper", {
                    observer: true,
                    observeParents: true,
                    slidesPerView: 1,
                    spaceBetween: 20,
                    loop: true,
                    pagination: { el: ".swiper-pagination", clickable: true },
                    autoplay: { delay: 3500, disableOnInteraction: false }
                });
            }
        } else {
            if (serviceSwiper && typeof serviceSwiper.destroy === 'function') {
                serviceSwiper.destroy(true, true);
                serviceSwiper = null;
            }
        }
    }

    const revealCards = () => {
        const cards = document.querySelectorAll('.animate-reveal');
        if (cards.length === 0) return; // Agar cards nahi hain toh skip karo

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Ek baar reveal ho gaya toh observation band
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(card);
        });
    }

    handleServiceLayout();
    revealCards();

    window.removeEventListener('resize', handleServiceLayout); // Purana hatao
    window.addEventListener('resize', handleServiceLayout);
}