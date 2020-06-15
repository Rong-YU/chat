<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" app clipped>
			<div v-if="rooms">
				<v-list shaped>
					<v-list-item
						:to="'/chat/' + room._id"
						v-for="room in rooms"
						:key="room._id"
					>
						<v-list-item-content>
							<v-list-item-title v-text="room.title">{{
								room._id
							}}</v-list-item-title>
						</v-list-item-content>
						<v-btn
							v-on:click="deleteRoom(room._id)"
							icon
							color="gray"
						>
							<v-icon>mdi-cancel</v-icon>
						</v-btn>
					</v-list-item>
				</v-list>
			</div>
			<template v-slot:append>
				<div class="pa-2">
					<v-switch
						v-model="$vuetify.theme.dark"
						primary
						label="Dark"
					></v-switch>
					<v-btn block :to="'/room'">Room List</v-btn>
					<v-btn block :to="'/create'">Create Room</v-btn>
					<v-btn block v-on:click="logOut">Logout</v-btn>
				</div>
			</template>
		</v-navigation-drawer>

		<v-app-bar app clipped-left>
			<v-app-bar-nav-icon
				@click.stop="drawer = !drawer"
			></v-app-bar-nav-icon>
			<v-toolbar-title>Vuetify Chat</v-toolbar-title>
		</v-app-bar>

		<v-content>
			<v-container class="fill-height">
				<router-view></router-view>
			</v-container>
		</v-content>

		<v-footer app>
			<span>&copy; 2020</span>
		</v-footer>
	</v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import axios from "axios"

export default {
	props: {
		source: String,
	},

	data: () => ({
		drawer: null,
		items: [
			{
				name: "chat",
			},
		],
	}),

	created() {
		this.$vuetify.theme.dark = true
	},
	computed: mapGetters(["user", "rooms"]),
	methods: {
		...mapActions(["fetchRooms"]),
		async logOut() {
			this.$router.go("/login")
		},
		async deleteRoom(id) {
			await axios.delete(`room/${id}`)
			await this.fetchRooms()
		},
	},
}
</script>
<style>
::-webkit-scrollbar {
	display: none;
}
</style>
