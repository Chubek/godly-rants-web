<template>
     <v-row align="top" justify="center">
         <v-flex>
             <v-sheet color="white lighten-1" class="pa-10 elevation-3">
         
               <v-img :aspect-ratio="1" :src="rant.image"
        max-width="350"
      max-height="200"
      class="img ma-5">
     </v-img>   
          <v-divider></v-divider>
      
          <h3 class="font-weight-black">{{ rant.title }}</h3>
          <v-divider></v-divider>
        <h5 class="font-weight-medium">{{ rant.submitter_name }}</h5>
        <v-divider></v-divider>
        <h5 class="font-weight-thin">{{ time }}</h5>
        <v-divider></v-divider>
        <div class="font-weight-light">{{ rant.content }}</div></v-sheet>
         </v-flex>
    
  
  </v-row>
    
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    created: function () {
        this.loadId()
    },
    methods: {
        loadId() {
             this.$store.dispatch('loadRant', this.$route.params.id)
        }        
    },
    computed: {
        ...mapGetters({
            rant: 'getSingleRant',
            
        }), 
        
        time: function() {
            return new Date(this.rant.time.seconds * 1000)
        }
        
        
    }
}
</script>

<style scoped>
.img {
    border-radius: 10rem
}
</style>