<template>
	<v-card flat class="d-flex flex-column fill-height flex-grow-1">
		<v-card-title>room title</v-card-title>
		<v-card-text class="flex-grow-1 overflow-y-auto">
			<div
				v-for="message in messages"
				:key="message._id"
				class="d-flex"
				:class="{ 'flex-row-reverse': message.user === user.id }"
			>
				<v-card class="ma-3" outlined>
					<v-card-title class="text-body-1">{{
						message.nickname
					}}</v-card-title>
					<v-card-text>{{ message.content }}</v-card-text>
					<v-card-text>{{ message.createAt }}</v-card-text>
				</v-card>
			</div>
		</v-card-text>
		<v-card-text class="flex-shrink-1">
			<v-text-field v-model="message" id="input" />
			<v-btn class="mr-4" @click="send">Send</v-btn>
		</v-card-text>
	</v-card>
</template>

<script>
import axios from "axios"
import { mapGetters } from "vuex"
export default {
	props: {
		id: {},
	},
	data() {
		return {
			messages: [],
			message: null,
		}
	},
	sockets: {
		message(data) {
			this.messages.push(data)
		},
	},

	created() {
		this.fetchMessages()
		this.joinRoom()
	},
	computed: {
		...mapGetters(["user", "rooms"]),
	},
	mounted() {
		document.getElementById("input").scrollIntoView()
	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		$route: "joinRoom",
	},

	methods: {
		scrollToEnd: function() {
			var container = this.$el.querySelector("#input")

			container.scrollTop = container.scrollHeight
		},
		async fetchMessages() {
			const items = await axios.get(`room/${this.id}`)
			console.log("messages", items.data.messages)
			this.messages = items.data.messages
		},
		send() {
			// Send the "pingServer" event to the server.
			this.$socket.emit("message", {
				id: this.id,
				userId: this.$store.state.Auth.user,
				message: this.message,
			})
			this.message = ""
		},
		joinRoom() {
			// Send the "pingServer" event to the server.
			this.$socket.emit("joinRoom", this.id)
			this.fetchMessages()
		},
	},
}
</script>
<style></style>
