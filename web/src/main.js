import Vue from "vue"
import App from "./App.vue"
import vuetify from "./plugins/vuetify"
import router from "./router"
import { store } from "./store"
import axios from "axios"
import VueSocketIO from "vue-socket.io"
import SocketIO from "socket.io-client"

Vue.use(
	new VueSocketIO({
		debug: true,
		// 服务器端地址
		connection: SocketIO(process.env.VUE_APP_SOCKET_URL || "/"),
	})
)

Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_API_URL || "/api/"

new Vue({
	store,
	vuetify,
	router,
	render: (h) => h(App),
}).$mount("#app")
