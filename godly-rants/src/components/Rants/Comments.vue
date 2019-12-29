<template>
<div><p v-for="comment in comments" v-bind:key="comment.uid"> {{ comment.content }} <ChildComments :comment_id="comment.uid"></ChildComments> </p></div>
    
</template>

<script>
import { mapGetters } from 'vuex'
import ChildComments from './ChildComments'
export default {
    name: "Comments",
    components: {
        ChildComments
    },
    created: function() {
        this.loadComments
    },
    methods: {
        loadComments() {
            this.$store.dispatch("loadRantParentComments")
        }
    },
    computed: {
        ...mapGetters({
            comments: 'getRantParentComments'
        }),        
    }
}
</script>