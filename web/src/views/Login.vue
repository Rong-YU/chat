<template>
  <v-form class="mx-auto">
    <v-container>
      <v-row>
        <v-text-field
          v-model="username"
          :counter="12"
          label="Username"
          hint="Username for login"
          :rules="[rules.required, rules.minUsername]"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 6 characters"
          counter
          @click:append="show = !show"
          required
        ></v-text-field>
      </v-row>
    </v-container>
    <v-btn class="mr-4" @click="submit" :disabled="!valide">Log in</v-btn>
    <v-btn class="mr-4" @click="clear">clear</v-btn>
    <v-btn class="mr-4" @click="$router.push('signup')">Sign Up</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      show: false,
      username: "",
      password: "",
      rules: {
        required: value => !!value || "Required.",
        minUsername: v => v.length >= 4 || "Min 4 characters",
        min: v => v.length >= 6 || "Min 6 characters"
      }
    };
  },
  computed: {
    valide() {
      return (
        this.username.length >= 4 &&
        this.username.length <= 12 &&
        this.password.length >= 6
      );
    }
  },
  methods: {
    ...mapActions(["login", "fetchRooms", "errorMessage", "successMessage"]),
    async submit() {
      try {
        await this.login({
          username: this.username,
          password: this.password
        });
        await this.fetchRooms();
        this.successMessage("Welcome Back!");
        this.$router.push("/");
      } catch {
        this.errorMessage("Username or password is incorrect");
      }
    },

    clear() {
      this.username = "";
      this.password = "";
    }
  }
};
</script>