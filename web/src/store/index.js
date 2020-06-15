import Vuex from "vuex"
import Vue from "vue"
import Auth from "./modules/auth"
import Chat from "./modules/chat"

// load vuex
Vue.use(Vuex)

// create store
export const store = new Vuex.Store({
	modules: {
		Auth,
		Chat,
	},
})
