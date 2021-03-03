import Vue from 'vue'
import {en} from './assets/data/en'
import {es} from './assets/data/es'

export const state = Vue.observable({ title: '', inHome: false})
export const mouse = Vue.observable({hover: false})
export const loading = Vue.observable({count: 0, loaded: false})
export const lang = Vue.observable({ lg: 'en', data: en})

export const mutations = {
    setTitle(newVal) {
        // console.log('Setting "title": ', newVal);
        state.title = newVal
    },
    
    setHome(newVal) {
        // console.log('Setting "inHome": ', newVal)
        state.inHome = newVal
    },

    getHome() {
        return state.inHome
    },

    inHover() {
        mouse.hover = true;
        // console.log('Setting "inHover": ', mouse.hover);
    },

    outHover() {
        mouse.hover = false;
        // console.log('Setting "outHover": ', mouse.hover);
    },

    loadingCharge(value) {
        if (value >=100) {
            loading.loaded = true;
        }
        loading.count = Math.floor(value);
    },

    changeLang() {
        if (lang.lg == 'en') {
            console.log('Cambio a espanol');

            lang.lg = 'es';
            lang.data = es;
        } else if (lang.lg == 'es') {
            console.log('Cambio a ingles');
            lang.lg = 'en';
            lang.data = en;
        }
    }
}