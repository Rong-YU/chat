<template>
	<v-container>
		<div class="pa-3">
			<h3>Room List</h3>
			<v-row>
				<v-col md="3" v-for="room in rooms" :key="room.id">
					<v-card max-width="344" outlined>
						<v-list-item three-line>
							<v-list-item-content>
								<v-list-item-title class="headline mb-1">
									{{ room.title }}
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>

						<v-card-actions>
							<v-btn
								text
								v-on:click="joinRoom(room._id, room.title)"
								>Join</v-btn
							>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</div>
	</v-container>
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
		...mapActions(["fetchRooms", "successMessage", "errorMessage"]),
		async fetch() {
			const res = await axios.get(`room`)
			this.rooms = res.data
		},
		async joinRoom(id, title) {
			try {
				await axios.post(`join/${id}`)
				await this.fetchRooms()
				this.successMessage(`Now you are one of ${title}!`)
				this.$router.push(`/chat/${id}`)
			} catch (error) {
				this.errorMessage(`You've already joined ${title}!`)
			}
		},
	},
}
</script>
<style></style>
