<template>
      
          <v-container grid-list-xs>
            <v-alert type="error" :value="warningVisible">
      {{ warning }}
    </v-alert>
              <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    
    <v-text-field
      v-model="email"      
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

    
    
    <v-btn
      :disabled="!valid"
      color="accent"
      class="mr-4"
      @click="onLogin"
    >
      Login
    </v-btn>

   </v-form>
              
          </v-container>
      
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "Login",
    data: () => ({
        valid: true,
        email: '',
        password: '',        
    }),

    methods: {
        onLogin() {
            this.$store.dispatch("userLogin", {
                email: this.email,
                password: this.password
            })
                .catch(e => this.warning = e.message)
        }
    },

    computed: {
        ...mapGetters({
            warning: 'getLoginWarning',
            warningVisible: 'getLoginWarningVisible'
        })

    }

}
</script>