<template>
    <div>
        <p v-for="comment in comments.child_comments" :key="comment.comment_id">{{ comment.content }}</p>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name: "ChildComments",
    props: ['comment_id'],
    created: function() {
        this.$store.dispatch("loadChildComments", this.comment_id)
    },
    computed: {
        ...mapGetters({
            child_comments: 'getChildComments'
        }),
        comments: function() {
            let ret = null
            this.child_comments.forEach(comment => {
                if (comment.uid == this.comment_id) {
                    ret = comment
                }
            })
            return ret
        }
    }
}
</script>