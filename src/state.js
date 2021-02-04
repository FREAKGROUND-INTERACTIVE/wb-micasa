import Vue from 'vue'

export const state = Vue.observable({ title: 'micasa' })

export const mutations = {
    setTitle(newVal) {
        console.log('Setting "title": ', newVal)
        state.title = newVal
    }
}