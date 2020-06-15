import Vue from "vue"
import VueRouter from "vue-router"
import Main from "../views/Main.vue"
import Login from "../views/Login.vue"
import Chat from "../views/Chat.vue"
import SignUp from "../views/SignUp.vue"
import CreateRoom from "../views/CreateRoom.vue"
import RoomList from "../views/RoomList.vue"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "main",
		component: Main,
		children: [
			{ path: "/chat/:id/", component: Chat, props: true },
			{ path: "/create", component: CreateRoom },
			{ path: "/login", component: Login, meta: { isPublic: true } },
			{ path: "/signup", component: SignUp, meta: { isPublic: true } },
			{ path: "/", component: RoomList },
		],
	},
]

const router = new VueRouter({
	routes,
})
import { store } from "../store/index"
router.beforeEach((to, from, next) => {
	if (!to.meta.isPublic && !store.getters.user) {
		return next("login")
	}
	next()
})

export default router
