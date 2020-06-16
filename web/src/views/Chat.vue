<template>
  <v-card flat class="d-flex flex-column fill-height flex-grow-0.7">
    <v-card-title class="text-uppercase">
      {{
      currentRoom.title
      }}
    </v-card-title>
    <v-card-text class="flex-grow-1 overflow-y-auto">
      <div
        v-for="message in currentRoom.messages"
        :key="message._id"
        class="d-flex"
        :class="{ 'flex-row-reverse': message.user === user.id }"
      >
        <v-card class="ma-2" outlined>
          <div class="title">
            <div class="nickname">{{ message.nickname }} :</div>
            <div class="date">{{ message.createAt | formatDate }}</div>
          </div>
          <div class="content">{{ message.content }}</div>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: mapGetters(["currentRoom", "user"])
};
</script>
<style>
.nickname {
  font-size: 15px;
}
.date {
  font-size: 15px;
  padding-left: 5px;
}
.content {
  padding: 5px;
  font-size: 15px;
}
.title {
  display: flex;
  padding-top: 0px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
