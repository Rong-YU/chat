<template>
  <v-form class="mx-auto">
    <v-container>
      <v-row>
        <v-text-field
          v-model="title"
          :counter="12"
          label="Room Name"
          :rules="[rules.required, rules.minUsername]"
          required
        ></v-text-field>
      </v-row>
    </v-container>
    <v-btn class="mr-4" @click="submit" :disabled="!valide">Create</v-btn>
  </v-form>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
      title: "",
      rules: {
        required: value => !!value || "Required.",
        minUsername: v => v.length >= 4 || "Min 4 characters",
        min: v => v.length >= 6 || "Min 6 characters"
      }
    };
  },
  computed: {
    valide() {
      return this.title.length >= 4 && this.title.length <= 12;
    }
  },
  methods: {
    ...mapActions(["fetchRooms", "successMessage", "errorMessage"]),
    async submit() {
      try {
        await axios.post("room", { title: this.title });
        //await this.createRoom(this.title);
        await this.fetchRooms();
        this.successMessage(`You just created ${this.title}!`);
        this.$router.push("/");
      } catch {
        this.errorMessage("Create Failed");
      }
    }
  }
};
</script>
