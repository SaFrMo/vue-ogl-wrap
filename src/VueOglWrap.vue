<template>
    <full-canvas class="vue-ogl-wrap" />
</template>

<script>
import FullCanvas from '@fuzzco/full-canvas'
export default {
    components: {
        'full-canvas': FullCanvas
    }
}
</script>

<style lang="scss">
.vue-ogl-wrap {
    background: red;
}
</style>
