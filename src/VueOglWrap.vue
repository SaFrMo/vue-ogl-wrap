<template>
    <div class="vue-ogl-wrap">
        <!-- the shader will go here -->
        <slot />
        <!-- and the result will be drawn here -->
        <full-canvas class="vue-ogl-wrap" @canvas-ready="initCanvas" />
    </div>
</template>

<script>
import FullCanvas from '@fuzzco/full-canvas'
import get from 'lodash/get'
// prettier-ignore
import { Renderer, Camera, Orbit, Transform, Geometry, Vec3, Color, Polyline } from 'ogl'

export default {
    props: {
        fragment: { type: String, default: '' },
        vertex: { type: String, default: '' },
        renderer: { type: Object, default: () => {} }
    },
    components: {
        'full-canvas': FullCanvas
    },
    data() {
        return {
            running: true
        }
    },
    methods: {
        initCanvas(canvas) {
            // fetch user-defined fragment shader
            const fragmentVNode = get(this.$slots, 'default', []).find(
                h => get(h, 'data.attrs.type', '') === 'x-shader/x-fragment'
            )
            const fragment = get(fragmentVNode, 'elm.innerHTML', this.fragment)

            // fetch user-defined vertex shader
            const vertexVNode = get(this.$slots, 'default', []).find(
                h => get(h, 'data.attrs.type', '') === 'x-shader/x-vertex'
            )
            const vertex = get(vertexVNode, 'elm.innerHTML', this.vertex)

            // initialize ogl
            const renderer = new Renderer({ canvas, ...this.renderer })

            // ogl ready!
            this.$emit('ogl-ready', {
                canvas,
                renderer,
                fragment,
                vertex,
                gl: renderer.gl
            })

            this.update()
        },
        update(t = 0) {
            if (this && this.running) {
                requestAnimationFrame(this.update)
            }
            this.$emit('update', t)
        }
    },
    beforeDestroy() {
        this.running = false
    }
}
</script>

<style lang="scss">
.vue-ogl-wrap,
.vue-ogl-wrap .full-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>
