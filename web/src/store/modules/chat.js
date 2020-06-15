import axios from "axios"

const state = {
	rooms: [],
}

const getters = {
	rooms: (state) => state.rooms,
}

const actions = {
	async fetchRooms({ commit }) {
		const res = await axios.get("myroom")
		commit("setRooms", res.data)
	},
}
const mutations = {
	setRooms: (state, rooms) => (state.rooms = rooms),
}

export default {
	state,
	getters,
	actions,
	mutations,
}
