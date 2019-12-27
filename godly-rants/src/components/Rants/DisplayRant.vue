<template>
    <div>{{nig }}</div>
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
            rant: 'getSingleRant'
        }),
        nig: function () {
            return this.$route.params.id
        }
             
    }
}
</script>