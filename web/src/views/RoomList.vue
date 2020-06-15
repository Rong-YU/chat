<template>
	<div class="pa-3">
		<h3>Room List</h3>
		<v-row>
			<v-col v-for="room in rooms" :key="room.id"
				><v-card class="mx-auto" max-width="344" outlined>
					<v-list-item three-line>
						<v-list-item-content>
							<v-list-item-title class="headline mb-1">{{
								room.title
							}}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>

					<v-card-actions>
						<v-btn text v-on:click="joinRoom(room._id)">Join</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import axios from "axios"
import { mapActions } from "vuex"
//import { mapGetters } from "vuex";
export default {
	data() {
		return {
			rooms: [],
		}
	},
	created() {
		this.fetch()
	},
	//computed: mapGetters(["user", "rooms"]),

	methods: {
		...mapActions(["fetchRooms"]),
		async fetch() {
			const res = await axios.get(`room`)
			this.rooms = res.data
		},
		async joinRoom(id) {
			await axios.post(`join/${id}`)
			await this.fetchRooms()
			this.$router.push("/")
		},
	},
}
</script>
<style></style>
