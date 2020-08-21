<template>
    <main class="vue-ogl-wrap-demo">
        <div class="wrapper">
            <vue-ogl-wrap />
        </div>
    </main>
</template>

<script>
import VueOglWrap from '../src/VueOglWrap'

export default {
    components: {
        'vue-ogl-wrap': VueOglWrap
    }
}
</script>

<style lang="scss">
.vue-ogl-wrap-demo {
    .wrapper {
        width: 400px;
        height: 400px;
        margin: 60px auto;
        position: relative;
    }
}
</style>
