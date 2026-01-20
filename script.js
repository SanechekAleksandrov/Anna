// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithLang = document.querySelectorAll('[data-ru][data-de]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    // Set initial language
    let currentLang = localStorage.getItem('selectedLang') || 'ru';
    updateLanguage(currentLang);
    
    // Update active button
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Language button click handlers
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedLang = this.dataset.lang;
            currentLang = selectedLang;
            localStorage.setItem('selectedLang', selectedLang);
            
            // Update active button
            langButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update language
            updateLanguage(selectedLang);
        });
    });
    
    function updateLanguage(lang) {
        elementsWithLang.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    // Portfolio click-to-zoom (not fullscreen)
    portfolioItems.forEach((item) => {
        item.addEventListener('click', () => {
            const willZoom = !item.classList.contains('is-zoomed');

            portfolioItems.forEach((el) => el.classList.remove('is-zoomed'));

            if (willZoom) {
                item.classList.add('is-zoomed');
            }
        });
    });

    // Close zoom on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            portfolioItems.forEach((el) => el.classList.remove('is-zoomed'));
        }
    });
});
