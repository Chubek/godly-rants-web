<template>
      
          <v-container grid-list-xs>
              <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="displayName"
      :counter="10"
      :rules="nameRules"
      label="Display Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      type="email"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="password"      
      :rules="[v => !!v || 'Password is required']"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <v-text-field
      v-model="confirmPassword"      
      :rules="[v => v == this.password || 'Passwords do not match']"
      type="password"
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
              
          </v-container>
      
</template>

<script>


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

      onCreateUser() {
          this.$store.dispatch('addUser', {
              displayName: this.displayName,
              email: this.email,
              password: this.password
          })
            .catch(e => console.log(e))
      },

    

    }
    
    
}
</script>