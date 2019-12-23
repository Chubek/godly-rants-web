<template>
      
          <v-container grid-list-xs>
            <v-alert type="error" :value="warningVisible">
      {{ warning }}
    </v-alert>

    
    <v-alert type="info" :value="infoVisible">
      {{ info }}
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
        infoVisible: false,
        info: ''   
    }),

    methods: {
        onLogin() {
            if (this.loggedIn == false) {
                this.$store.dispatch("userLogin", {
                email: this.email,
                password: this.password
            })
                .catch(e => this.warning = e.message)
            } else {
                this.infoVisible = true
                this.info = "User already logged in."
                console.log("User already logged in.")
            }

        }
    },

    computed: {
        ...mapGetters({
            warning: 'getLoginWarning',
            warningVisible: 'getLoginWarningVisible',
            loggedIn: 'getUserLoggedIn'
        })

    },

    watch: {

        loggedIn(newVal) {
            console.log(newVal)

            this.$router.push({path: "/"})

        }



          
    }

}
</script>