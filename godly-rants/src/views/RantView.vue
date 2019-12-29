<template>
    <div>
        <DisplayRant></DisplayRant>
    <Comments></Comments>
    </div>
</template>
<script>
import DisplayRant from '../components/Rants/DisplayRant'
import Comments from '../components/Rants/Comments'
export default {
    name: "RantsView",
    components: {
        DisplayRant,
        Comments
    }
}
</script>