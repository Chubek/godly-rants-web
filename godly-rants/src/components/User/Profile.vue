<template>
    <v-container grid-list-xs>
        <v-flex>
            <v-card>
                <v-card-title>Chubak</v-card-title>
                <v-card-subtitle>Administrator</v-card-subtitle>
                <v-card-text>I'm a little teapot short and stouth .here's my handle here's my spot.</v-card-text>
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
          v-model="bio"
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
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>