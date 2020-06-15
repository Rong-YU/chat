<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <div v-if="rooms">
        <v-list shaped>
          <v-list-item :to="'/chat/' + room._id" v-for="room in rooms" :key="room._id">
            <v-list-item-content>
              <v-list-item-title v-text="room.title">
                {{
                room._id
                }}
              </v-list-item-title>
            </v-list-item-content>
            <v-btn v-on:click="deleteRoom(room._id,room.title)" icon color="gray">
              <v-icon>mdi-cancel</v-icon>
            </v-btn>
          </v-list-item>
        </v-list>
      </div>
      <template v-slot:append>
        <div class="pa-2">
          <v-switch v-model="$vuetify.theme.dark" primary label="Dark"></v-switch>
          <v-btn block :to="'/'">Room List</v-btn>
          <v-btn block :to="'/create'">Create Room</v-btn>
          <v-btn block v-on:click="logOut">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vuetify Chat</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height">
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-snackbar v-model="snackbar.showing" :color="snackbar.color">
      {{ snackbar.text }}
      <v-btn text @click="snackbar.showing = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: null,
    items: [
      {
        name: "chat"
      }
    ]
  }),

  created() {
    this.$vuetify.theme.dark = true;
  },
  computed: mapGetters(["user", "rooms", "snackbar"]),
  methods: {
    ...mapActions(["fetchRooms", "successMessage", "errorMessage"]),
    async logOut() {
      this.$router.go("/login");
    },
    async deleteRoom(id, title) {
      try {
        await axios.delete(`room/${id}`);
        this.successMessage(`"You just deleted ${title}`);
        console.log("good");
        await this.fetchRooms();
      } catch {
        this.errorMessage("Opps, you don't have permission!");
        console.log("bad");
      }
    }
  }
};
</script>
<style>
::-webkit-scrollbar {
  display: none;
}
</style>
