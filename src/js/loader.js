import alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import intersect from '@alpinejs/intersect';

const loader = (page) => {

    // body context 
    alpine.data('moveTrains', () => ({
        name: '',
        scrolling() {
            if(this.name === 'st') {
                console.log(this.name);
            }
        }
    }));
    
    // navmenu alpinejs context
    alpine.data('navmenu', () => ({
        init() {

            document.querySelector('#list-links-box').querySelectorAll('.nav-link').forEach( (navLink, index) => {

                navLink.style.setProperty('--item-animiation-delay', index * 100 +"ms");

            });
                
        },
        'open': false
    }));

    alpine.plugin(intersect);
    alpine.plugin(collapse);

    alpine.start();

};

export default loader;