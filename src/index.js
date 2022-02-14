import "regenerator-runtime/runtime";
import "core-js/stable";

import Alpine from 'alpinejs'
import flatpickr from 'flatpickr'
import Swiper, {Navigation} from 'swiper';
import {validate} from 'validate.js';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './index.scss';

let nav = null;
let swiper = null;
let reservationSchema = {
    ['people number']: {
        presence: {
            message: 'is required'
        }
    },
    date: {
        presence: {
            message: 'is required'
        }
    },
    time: {
        presence: {
            message: 'is required'
        }
    },
    name: {
        presence: {
            message: 'is required'
        },
    },
    email: {
        presence: {
            message: 'is required'
        },
        email: {
            message: 'is not valid'
        }
    },
    phone: {
        presence: {
            message: 'is required'
        }
    }
};

window.onload = () => {
    //get elements
    nav = document.querySelector('nav');
    //create the swiper
    swiper = new Swiper('.combo-swiper', {
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 32
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 32
            }
        },
        modules: [Navigation],
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    //make reservation store
    Alpine.store("rsSection", {
        ['people number']: {text: null, value: null},
        date: null,
        time: null,
        name: null,
        email: null,
        phone: null,
        errors: {
            ['people number']: '',
            date: '',
            time: '',
            name: '',
            email: '',
            phone: '',
        },
        submit() {
            const test = validate({
                ['people number']: this['people number'].value,
                date: this.date,
                time: this.time,
                name: this.name,
                email: this.email,
                phone: this.phone
            }, reservationSchema);
            if(test === undefined) {
                this.errors = { 
                    ['people number']: '',
                    date: '',
                    time: '',
                    name: '',
                    email: '',
                    phone: '',
                }
                console.log('valide');
            }else {
                console.log(test);
                this.errors = {...test};
            }
        }
    });
    Alpine.start();
    //reservation date picker
    flatpickr(".date-picker",{enableTime:false, inline: true, dateFormat: "Y-m-d", onChange: (_,dateStr)=>{
        Alpine.store('rsSection').date = dateStr;
    }});
    //reservation time picker
    flatpickr(".time-picker",{enableTime:true, noCalendar: true, inline: true, dateFormat: "H:i K", onChange: (_,dateStr)=>{
        Alpine.store('rsSection').time = dateStr;
    }});
}

window.onscroll = (e) => {
    if(window.scrollY > 0) {
        nav.classList.add('scrolling');
    } else {
        nav.classList.remove('scrolling');
    }
}