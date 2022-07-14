import "regenerator-runtime/runtime";

import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';
import smoothscroll from 'smoothscroll-polyfill';

//inits
smoothscroll.polyfill();
Alpine.plugin(intersect);

export {
    Alpine
}