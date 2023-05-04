import alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

const loader = (page) => {
    
    // navmenu alpinejs context
    alpine.data('navmenu', () => ({
        'open': false
    }));

    alpine.plugin(collapse);

    alpine.start();

};

export default loader;