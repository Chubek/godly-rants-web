<template>
      <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Display Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"      
      :rules="[v => !!v || 'Password is required']"
      label="Password"
      required
    ></v-text-field>

    <v-text-field
      v-model="confirmPassword"      
      :rules="[v => v != password || 'Passwords do not match']"
      label="Confirm Password"
      required
    ></v-text-field>

    
    <v-btn
      :disabled="!valid"
      color="accent"
      class="mr-4"
      @click="onCreateUser"
    >
      Validate
    </v-btn>

   </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: "Register",
    data: () => ({
      valid: true,
      displayName: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: ''   
    }),
    methods: {
        validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },

      onCreateUser(user) {
          user.displayName = this.displayName
          user.email = this.email
          user.password = this.password
      },

    ...mapActions({
       onCreateUser: 'addUser'
    })

    }
    
    
}
</script>