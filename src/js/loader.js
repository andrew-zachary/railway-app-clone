import alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';

const loader = (page) => {

    const trainsCtrl = new ScrollMagic.Controller();

    const blueTrain = document.getElementById('blueTrain');
    const greenTrain1 = document.getElementById('greenTrain1');
    const greenTrain2 = document.getElementById('greenTrain2');
    const greenTrain3 = document.getElementById('greenTrain3');
    const bigTrain = document.getElementById('bigTrain');
    const startTinkerLists = document.querySelectorAll('.start-tinker-lists');
    const iterateAccelerateLists = document.querySelectorAll('.iterate-accelerate-lists');
    const launchScaleLists = document.querySelectorAll('.launch-scale-lists');
    const imgToRight = document.querySelectorAll('.to-translate-right');
    const imgToLeft = document.querySelectorAll('.to-translate-left');

    const blueTrainScene = new ScrollMagic.Scene({triggerElement: '#blueTrainStation', duration: 350});
    blueTrainScene.setPin(blueTrain).addTo(trainsCtrl);

    const greenTrain1Scene = new ScrollMagic.Scene({triggerElement: '#greenTrainStation', duration: 350, offset: 100});
    greenTrain1Scene.setPin(greenTrain1).addTo(trainsCtrl);
    const greenTrain2Scene = new ScrollMagic.Scene({triggerElement: '#greenTrainStation', duration: 350});
    greenTrain2Scene.setPin(greenTrain2).addTo(trainsCtrl);
    const greenTrain3Scene = new ScrollMagic.Scene({triggerElement: '#greenTrainStation', duration: 350, offset: 50});
    greenTrain3Scene.setPin(greenTrain3).addTo(trainsCtrl);

    const bigTrainScene = new ScrollMagic.Scene({triggerElement: '#launch-scale', duration: 500});
    bigTrainScene.addTo(trainsCtrl).on('progress', (e) => {
        const scaleAmount = parseFloat(e.progress.toFixed(2)) + 0.5;
        bigTrain.style.transform = `scale(${scaleAmount})`;
    });

    const startAndTinkerScene = new ScrollMagic.Scene({triggerElement: '#start-tinker-box', offset: -235});
    startAndTinkerScene.addTo(trainsCtrl).setClassToggle(startTinkerLists, 'reveal');

    const iterateAccelerateScene = new ScrollMagic.Scene({triggerElement: '#iterate-accelerate-box', offset: -235});
    iterateAccelerateScene.addTo(trainsCtrl).setClassToggle(iterateAccelerateLists, 'reveal');

    const launchScaleScene = new ScrollMagic.Scene({triggerElement: '#launch-scale-box', offset: -235});
    launchScaleScene.addTo(trainsCtrl).setClassToggle(launchScaleLists, 'reveal');

    const heroScene1 = new ScrollMagic.Scene({triggerElement: '#hero'});
    heroScene1.addTo(trainsCtrl).setClassToggle(imgToRight, 'translate-right');
    const heroScene2 = new ScrollMagic.Scene({triggerElement: '#hero'});
    heroScene2.addTo(trainsCtrl).setClassToggle(imgToLeft, 'translate-left');
    
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