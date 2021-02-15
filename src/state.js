import Vue from 'vue'

export const state = Vue.observable({ title: '', inHome: false})

export const mutations = {
    setTitle(newVal) {
        // console.log('Setting "title": ', newVal)
        state.title = newVal
    },
    
    setHome(newVal) {
        // console.log('Setting "inHome": ', newVal)
        state.inHome = newVal
    },

    getHome() {
        return state.inHome
    }
}