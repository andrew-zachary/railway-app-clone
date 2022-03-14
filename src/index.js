import "regenerator-runtime/runtime";
import "core-js/stable";

import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';
import flatpickr from 'flatpickr';
import Swiper, {Navigation} from 'swiper';
import {validate} from 'validate.js';
import smoothscroll from 'smoothscroll-polyfill';
import { scrollIntoView } from "seamless-scroll-polyfill";

import 'swiper/css';
import 'swiper/css/navigation';

import './index.scss';

let nav = null;
let navLinks = null;
let swiper = null;

const reservationSchema = {
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
    //inits
    smoothscroll.polyfill();
    Alpine.plugin(intersect);

    //select elements
    nav = document.querySelector('nav');
    navLinks = document.querySelectorAll('.nav-links');

    //create reservation form store
    Alpine.store("rsSection", {
        //['people number'] to match validation js field
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
            const errorsResult = validate({
                ['people number']: this['people number'].value,
                date: this.date,
                time: this.time,
                name: this.name,
                email: this.email,
                phone: this.phone
            }, reservationSchema);
            if(errorsResult === undefined) {
                this.errors = { 
                    ['people number']: '',
                    date: '',
                    time: '',
                    name: '',
                    email: '',
                    phone: '',
                }
            }else {
                this.errors = {...errorsResult};
            }
        }
    });

    //create cart store
    Alpine.store('cart', {
        init() {
            this.openCart = false;
            this.collection = [];
            this.totalCharge = 0;
        },
        addCartItem(el, root) {
            if(el.checked) {
                if(!this.collection.find((item)=>item.product.id === root.dataset.id)) {
                    //push cart item
                    this.collection.push({
                        product: {id: root.dataset.id, name: root.dataset.name, price: root.dataset.price},
                        quantity: 1
                    });
                }
            } else {
                if(this.collection.find((item)=>item.product.id === root.dataset.id)) {
                    this.collection = this.collection.filter((item)=> {
                        return item.product.id !== root.dataset.id;
                    });
                }
            }
        },
        addCartCombo(root) {
            if(!this.collection.find((item)=> item.product.id === root.dataset.id)) {
                this.collection.push({
                    product: {id: root.dataset.id, name: root.dataset.name, price: root.dataset.price},
                    quantity: 1
                });
            } else {
                this.collection = this.collection.filter((item)=> item.product.id !== root.dataset.id)
            }
        },
        changeItemQuantity(id, value) {
            //update quantity
            let collection = [];
            collection = this.collection.map((item)=> {
                if(item.product.id === id) {
                    item.quantity = item.quantity + value;
                    return item;
                } else {
                    return item;
                }
            });
            //update ui
            collection.forEach((item)=>{
                if(item.quantity <= 0) {
                    let formItem = document.querySelector(`label[data-id="${item.product.id}"] > input`);
                    if(formItem) {
                        formItem.checked = false;
                    }
                }
            });
            //update final collection
            this.collection = collection.filter(item => item.quantity > 0);
        }
    });

    //alpine props effect
    Alpine.effect(()=>{
        //calc cart totalCharge
        let totalCharge = 0;
        Alpine.store('cart').collection.forEach(item=>{
            totalCharge += item.product.price * item.quantity;
        });
        Alpine.store('cart').totalCharge = totalCharge;
    });

    //start alpine
    Alpine.start();

    //asign targets to nav links
    navLinks.forEach(element => {
        element.addEventListener('click', function(e){
            e.preventDefault();
            let targetId = e.target.getAttribute('data-target-id');
            scrollIntoView(document.querySelector(`#${targetId}`), { behavior: "smooth", block: "start", inline: "center" });
            return false;
        });
    });

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

    //reservation form date picker
    flatpickr(".date-picker", {enableTime:false, inline: true, dateFormat: "Y-m-d", onChange: (_,dateStr)=>{
        Alpine.store('rsSection').date = dateStr;
    }});

    //reservation form time picker
    flatpickr(".time-picker", {enableTime:true, noCalendar: true, inline: true, dateFormat: "H:i K", onChange: (_,dateStr)=>{
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