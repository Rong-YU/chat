import Vuex from "vuex"
import Vue from "vue"
import Auth from "./modules/auth"
import Chat from "./modules/chat"

// load vuex
Vue.use(Vuex)
const state = {
	snackbar: {},
}

const getters = { snackbar: (state) => state.snackbar }

const actions = {
	async successMessage({ commit }, message) {
		const snackbar = { showing: true, text: message, color: "success" }
		console.log(snackbar)
		commit("setSnackbar", snackbar)
	},
	async errorMessage({ commit }, message) {
		const snackbar = { showing: true, text: message, color: "error" }
		console.log(snackbar)
		commit("setSnackbar", snackbar)
	},
	async infoMessage({ commit }, message) {
		const snackbar = { showing: true, text: message, color: "info" }
		console.log(snackbar)
		commit("setSnackbar", snackbar)
	},
}

const mutations = {
	setSnackbar: (state, snackbar) => (state.snackbar = snackbar),
}
// create store
export const store = new Vuex.Store({
	modules: {
		Auth,
		Chat,
	},
	state,
	getters,
	actions,
	mutations,
})
