<template>
  <v-container fluid style="padding: 0;">
    <v-row no-gutters>
      <v-col style="position: relative;">
        <div class="chat-container">
          <chat></chat>
        </div>
        <div class="typer">
          <v-text-field v-model="message" @keydown.enter="send" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chat from "./Chat.vue";
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    id: {}
  },
  data() {
    return {
      message: null
    };
  },
  components: {
    chat: Chat
  },
  sockets: {
    message(data) {
      this.addMessage(data);
    }
  },

  created() {
    this.getRoom(this.id);
    this.joinRoom();
  },
  computed: {
    ...mapGetters(["user", "rooms"])
  },

  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "reload"
  },

  methods: {
    ...mapActions(["addMessage", "getRoom"]),

    async fetchMessages() {
      const items = await axios.get(`room/${this.id}`);
      this.chatMessages = items.data.messages;
    },
    send() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("message", {
        id: this.id,
        userId: this.$store.state.Auth.user,
        message: this.message
      });
      this.message = "";
    },
    joinRoom() {
      // Send the "pingServer" event to the server.
      this.$socket.emit("joinRoom", this.id);
      this.fetchMessages();
    },
    reload() {
      this.getRoom(this.id);
      this.joinRoom();
    }
  }
};
</script>
<style>
.type {
  position: absolute;
  bottom: 0;
  display: flex;
}
.chat-container {
  overflow-y: auto;
  height: 80vh;
}
</style>
