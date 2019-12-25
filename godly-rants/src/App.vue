<template>

  <v-app>
    Welcome {{ displayName }}
      <div>
         
    <v-app-bar
      color="primary"
      dark
    >
      <v-app-bar-nav-icon 
      class="hidden-md-and-up"
      @click.stop="sideNav = !sideNav"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ siteTitle }}</v-toolbar-title>

      <v-spacer></v-spacer>

     
        <router-link to="/register" style="cursor: pointer" color="black">Register</router-link>
      

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu
        left
        bottom
      >
               
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer temporary v-model="sideNav">
          <v-list>
            <v-list-item>
              <v-list-content>
                Item 1
              </v-list-content>
            </v-list-item>
            <v-list-item>
              <v-list-content>
                Item 2
              </v-list-content>
            </v-list-item>
          </v-list>
           
    </v-navigation-drawer>
    
  </div>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    sideNav: false
  }),
  computed: {
    ...mapState({
      siteTitle: state => state.siteTitle,
    }),
    ...mapGetters({
      displayName: 'getUserName'
    })
  },
  methods: {
    
    
  }

};
</script>
