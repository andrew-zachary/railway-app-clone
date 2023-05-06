import alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

const loader = (page) => {
    
    // navmenu alpinejs context
    alpine.data('navmenu', () => ({
        init() {
            const bodyId = document.querySelector('body').id;
            const navLinks = document.querySelectorAll('.nav-link');
            
            navLinks.forEach( (navLink, index) => {

                navLink.style.setProperty('--item-animiation-delay', index * 100 +"ms");
        
                if(navLink.getAttribute('data-label') === bodyId) navLink.classList.add('active-link');
                
            });
        },
        'open': false
    }));

    alpine.plugin(collapse);

    alpine.start();

};

export default loader;