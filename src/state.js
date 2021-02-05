import Vue from 'vue'

export const state = Vue.observable({ title: '' })

export const mutations = {
    setTitle(newVal) {
        console.log('Setting "title": ', newVal)
        state.title = newVal
    }
}