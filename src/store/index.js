import Vue from "vue"
import Vuex from 'vuex'
import tab from './table'
import herbs from './herbs'
import prescriptions from './prescription'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        tab,
        herbs,
        prescriptions
    }
})