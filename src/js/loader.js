import alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

const loader = (page) => {

    const trainsCtrl = new ScrollMagic.Controller();

    let blueTrain = document.getElementById("blueTrain");
    let greenTrain1 = document.getElementById("greenTrain1");
    let greenTrain2 = document.getElementById("greenTrain2");
    let greenTrain3 = document.getElementById("greenTrain3");

    let scene1 = new ScrollMagic.Scene({triggerElement: "#blueTrainStation", duration: 350});
    scene1.setPin(blueTrain).addTo(trainsCtrl);

    let scene2 = new ScrollMagic.Scene({triggerElement: "#greenTrainStation", duration: 350, offset: 100});
    scene2.setPin(greenTrain1).addTo(trainsCtrl);
    let scene3 = new ScrollMagic.Scene({triggerElement: "#greenTrainStation", duration: 350});
    scene3.setPin(greenTrain2).addTo(trainsCtrl);
    let scene4 = new ScrollMagic.Scene({triggerElement: "#greenTrainStation", duration: 350, offset: 50});
    scene4.setPin(greenTrain3).addTo(trainsCtrl);
    
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