import alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

const loader = (page) => {

    const trainsCtrl = new ScrollMagic.Controller();

    const blueTrain = document.getElementById('blueTrain');
    const greenTrain1 = document.getElementById('greenTrain1');
    const greenTrain2 = document.getElementById('greenTrain2');
    const greenTrain3 = document.getElementById('greenTrain3');
    const bigTrain = document.getElementById('bigTrain');

    const scene1 = new ScrollMagic.Scene({triggerElement: '#blueTrainStation', duration: 350});
    scene1.setPin(blueTrain).addTo(trainsCtrl);

    const scene2 = new ScrollMagic.Scene({triggerElement: '#greenTrainStation', duration: 350, offset: 100});
    scene2.setPin(greenTrain1).addTo(trainsCtrl);
    const scene3 = new ScrollMagic.Scene({triggerElement: '#greenTrainStation', duration: 350});
    scene3.setPin(greenTrain2).addTo(trainsCtrl);
    const scene4 = new ScrollMagic.Scene({triggerElement: '#greenTrainStation', duration: 350, offset: 50});
    scene4.setPin(greenTrain3).addTo(trainsCtrl);

    const scene5 = new ScrollMagic.Scene({triggerElement: '#launch-scale', duration: 500});
    scene5.addTo(trainsCtrl).on('progress', (e) => {
        const scaleAmount = parseFloat(e.progress.toFixed(2)) + 0.5;
        bigTrain.style.transform = `scale(${scaleAmount})`;
    });
    
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