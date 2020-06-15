import axios from "axios"

const state = {
	rooms: [],
	currentRoom: {
		id: null,
		title: "",
		messages: [],
	},
}

const getters = {
	rooms: (state) => state.rooms,
	currentRoom: (state) => state.currentRoom,
}

const actions = {
	async fetchRooms({ commit }) {
		const res = await axios.get("myroom")
		commit("setRooms", res.data)
	},
	async getRoom({ commit }, id) {
		const res = await axios.get(`room/${id}`)
		commit("setCurrentRoom", res.data)
	},
	async addMessage({ commit }, message) {
		commit("addMessage", message)
	},
}
const mutations = {
	setRooms: (state, rooms) => (state.rooms = rooms),
	setCurrentRoom: (state, currentRoom) => (state.currentRoom = currentRoom),
	addMessage: (state, message) => state.currentRoom.messages.push(message),
}

export default {
	state,
	getters,
	actions,
	mutations,
}
