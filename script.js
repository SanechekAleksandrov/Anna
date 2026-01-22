// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const elementsWithLang = document.querySelectorAll('[data-ru], [data-de], [data-en], [data-ukr]');
    
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
                // For accordion headers, update the title span, not the button itself
                if (element.classList.contains('accordion-header')) {
                    const titleSpan = element.querySelector('.accordion-title');
                    if (titleSpan) {
                        titleSpan.textContent = text;
                    }
                } else {
                    element.textContent = text;
                }
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    // Accordion functionality
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

});
