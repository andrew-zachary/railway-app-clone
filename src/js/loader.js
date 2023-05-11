import alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import intersect from '@alpinejs/intersect';

const loader = (page) => {

    // body context 
    alpine.data('moveTrains', () => ({
        blueTrainSpeed: 0,
        oldScrollValue: 0,
        scrolling() {

            let scrollDir = 1;
            let newScrollValue = window.pageYOffset;

            if(this.oldScrollValue - newScrollValue < 0) scrollDir = 1;
            else if(this.oldScrollValue - newScrollValue > 0) scrollDir = -1;

            this.oldScrollValue = newScrollValue;

            this.blueTrainSpeed += (scrollDir * 12.5);

            if(this.blueTrainSpeed > this.$refs.blueTrainTrack.offsetHeight - 200) {
                this.blueTrainSpeed = this.$refs.blueTrainTrack.offsetHeight - 200;
            } else if(this.blueTrainSpeed < 0) {
                this.blueTrainSpeed = 0;
            }

            this.$refs.blueTrain.style.transform = `translate(-50%, ${this.blueTrainSpeed}px)`;

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