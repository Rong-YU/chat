import axios from "axios"
const state = {
	user: null,
}

const getters = {
	user: (state) => state.user,
}

const actions = {
	async signup({ commit }, user) {
		const res = await axios.post("signup", user)
		axios.defaults.defaults.headers.common["Authorization"] =
			res.data.session
		commit("setUser", res.data)
	},
	async login({ commit }, user) {
		const res = await axios.post("login", user)
		axios.defaults.headers.common["Authorization"] = res.data.session
		commit("setUser", res.data)
	},
}

const mutations = {
	setUser: (state, user) => (state.user = user),
}

export default {
	state,
	getters,
	actions,
	mutations,
}
