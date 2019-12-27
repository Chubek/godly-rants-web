<template>
    <v-container grid-list-xs>
        <v-flex>
            <v-card>
                <v-card-title>Chubak</v-card-title>
                <v-card-subtitle>Administrator</v-card-subtitle>
                <v-card-text>{{ bio }}</v-card-text>
                <v-card-action> <v-dialog
      v-model="dialog"
      width="500"
      overlay-opacity="0"
      light
    >
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">Edit Bio</v-btn>
      </template>

         
             
         <v-card>
             <v-card-text>
                   <v-textarea
          name="input-7-1"
          label="Bio"
          v-model="newBio"
          hint="Tell us a little about yourself."
        ></v-textarea>
             </v-card-text>
             <v-card-actions>
                 <v-btn color="success" class=".float-left" @click="onBioChanged">Done</v-btn>
             </v-card-actions>
         </v-card>
         
         
        
        
    </v-dialog>
  </v-card-action>
            </v-card>
        </v-flex>
        
   
        
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        dialog: false,
        newBio: null
        
      }
    },

    methods: {
        onBioChanged() {
            this.$store.dispatch("editBio", this.newBio)
            this.dialog = false
        }
    },
    computed: {
        ...mapGetters({
            bio: 'getUserBio'
        })
    }

  }
</script>