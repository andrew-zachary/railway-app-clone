import alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

const loader = (page) => {

    const trainsCtrl = new ScrollMagic.Controller();

    let blueTrain = document.getElementById("blueTrain");

    let scene = new ScrollMagic.Scene({triggerElement: "#blueTrainStation", duration: 350})
    .setPin(blueTrain)
    .addTo(trainsCtrl);
    
    // navmenu alpinejs context
    alpine.data('navmenu', () => ({
        init() {

            document.querySelector('#list-links-box').querySelectorAll('.nav-link').forEach( (navLink, index) => {

                navLink.style.setProperty('--item-animiation-delay', index * 100 +"ms");

            });
                
        },
        'open': false
    }));

    alpine.plugin(collapse);

    alpine.start();

};

export default loader;