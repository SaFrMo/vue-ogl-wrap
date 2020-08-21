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
import {
    defaultVertexCamera,
    defaultVertexNoCamera,
    defaultFragment
} from './utils'
import { Renderer, Program, Transform } from 'ogl'

export default {
    props: {
        fragment: { type: String, default: '' },
        vertex: { type: String, default: '' },
        renderer: { type: Object, default: () => {} },
        uniforms: { type: Object, default: () => {} },
        useCamera: { type: Boolean, default: true },
        programOptions: { type: Object, default: () => {} }
    },
    components: {
        'full-canvas': FullCanvas
    },
    data() {
        return {
            running: true,
            lastTime: 0
        }
    },
    methods: {
        initCanvas(canvas) {
            // fetch user-defined fragment shader
            const fragmentVNode = get(this.$slots, 'default', []).find(
                h => get(h, 'data.attrs.type', '') === 'x-shader/x-fragment'
            )
            const fragment =
                get(fragmentVNode, 'elm.innerHTML', this.fragment) ||
                defaultFragment

            // fetch user-defined vertex shader
            const vertexVNode = get(this.$slots, 'default', []).find(
                h => get(h, 'data.attrs.type', '') === 'x-shader/x-vertex'
            )
            const vertex =
                get(vertexVNode, 'elm.innerHTML', this.vertex) || this.useCamera
                    ? defaultVertexCamera
                    : defaultVertexNoCamera

            // initialize ogl
            const renderer = new Renderer({
                canvas,
                dpr: window.devicePixelRatio,
                ...this.renderer
            })

            // create scene
            const scene = new Transform()

            // initialize program
            const program = new Program(renderer.gl, {
                vertex,
                fragment,
                uniforms: this.uniforms,
                ...this.programOptions
            })

            // ogl ready!
            this.$emit('ogl-ready', {
                canvas,
                renderer,
                fragment,
                vertex,
                program,
                scene,
                gl: renderer.gl
            })

            // prep update function
            const update = t => {
                if (this && this.running) {
                    requestAnimationFrame(update)
                }
                const delta = t - this.lastTime
                this.lastTime = t

                this.$emit('update', {
                    time: t,
                    delta: delta / 1000 || 0,
                    canvas,
                    renderer,
                    fragment,
                    vertex,
                    program,
                    scene,
                    gl: renderer.gl
                })
            }

            // kick update loop
            update()
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
