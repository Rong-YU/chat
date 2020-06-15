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
      <v-row>
        <v-text-field
          v-model="nickname"
          :counter="10"
          label="Nickname"
          hint="Displays to everybody"
          :rules="[rules.required, rules.minUsername]"
          required
        ></v-text-field>
      </v-row>
    </v-container>
    <v-btn class="mr-4" @click="submit" :disabled="!valide">Sign Up</v-btn>
    <v-btn @click="clear">clear</v-btn>
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
      nickname: "",
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
        this.nickname.length >= 4 &&
        this.nickname.length <= 10 &&
        this.password.length >= 6
      );
    }
  },
  methods: {
    ...mapActions(["signup"]),
    async submit() {
      await this.signup({
        nickname: this.nickname,
        username: this.username,
        password: this.password
      });
      this.$router.push("/");
    },

    clear() {
      this.username = "";
      this.password = "";
      this.nickname = "";
    }
  }
};
</script>