import Swiper, {Navigation} from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './index.scss';

let nav = null;
let swiper = null;

window.onload = () => {
    //get elements
    nav = document.querySelector('nav');
    //create the swiper
    swiper = new Swiper('.combo-swiper', {
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 62
            }
        },
        modules: [Navigation],
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

window.onscroll = (e) => {
    if(window.scrollY > 0) {
        nav.classList.add('scrolling');
    } else {
        nav.classList.remove('scrolling');
    }
}