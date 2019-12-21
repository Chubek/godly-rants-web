<template>

  <v-app>
      <div>
         
    <v-app-bar
      color="primary"
      dark
    >
      <v-app-bar-nav-icon 
      class="hidden-md-and-up"
      @click.stop="sideNav = !sideNav"></v-app-bar-nav-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

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
    
  </v-app>
</template>

<script>


export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    sideNav: false
  }),
  computed: {
    
  },
  methods: {
    
    
  }

};
</script>
