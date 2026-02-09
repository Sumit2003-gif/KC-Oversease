
const animatePremiumCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const duration = 2000; 

    counters.forEach(counter => {
        counter.innerText = "0"; 
        const target = parseInt(counter.getAttribute('data-target'));
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Premium Ease-Out Quintic
            const easeOut = 1 - Math.pow(1 - progress, 4);
            
            const currentValue = Math.floor(easeOut * target);
            counter.innerText = currentValue.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        requestAnimationFrame(updateCount);
    });
};


const initPremiumLogic = () => {
    const section = document.querySelector('.premium-strengths');
    
    if (section) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animatePremiumCounters();
                } else {
                    document.querySelectorAll('.counter').forEach(c => c.innerText = "0");
                }
            });
        }, { threshold: 0.25 });
        
        observer.observe(section);
    }
};

// Handle Dynamic Content Injection
const setupObserver = () => {
    if (document.querySelector('.premium-strengths')) {
        initPremiumLogic();
    } else {
        const mutObs = new MutationObserver((mutations, instance) => {
            if (document.querySelector('.premium-strengths')) {
                initPremiumLogic();
                instance.disconnect();
            }
        });
        mutObs.observe(document.body, { childList: true, subtree: true });
    }
};

setupObserver();