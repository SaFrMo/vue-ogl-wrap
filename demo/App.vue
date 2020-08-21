<template>
    <main class="vue-ogl-wrap-demo">
        <div class="wrapper">
            <!--  -->
            <!-- <vue-ogl-wrap @ogl-ready="initExample1" @update="updateExample1"> -->

            <!-- Basic example -->
            <vue-ogl-wrap @ogl-ready="initExample1" @update="updateExample1">
                <script type="x-shader/x-fragment">
                    precision highp float;
                    uniform float uTime;
                    uniform vec3 uColor;
                    varying vec2 vUv;
                    void main() {
                        gl_FragColor.rgb = 0.5 + 0.3 * cos(vUv.xyx + uTime) + uColor;
                        gl_FragColor.a = 1.0;
                    }
                </script>

                <script type="x-shader/x-vertex">
                    attribute vec2 uv;
                    attribute vec2 position;
                    varying vec2 vUv;
                    void main() {
                        vUv = uv;
                        gl_Position = vec4(position, 0, 1);
                    }
                </script>
            </vue-ogl-wrap>
        </div>
    </main>
</template>

<script>
import VueOglWrap from '../src/VueOglWrap'
import { Triangle, Program, Mesh, Color } from 'ogl'

const ogl = {}

export default {
    components: {
        'vue-ogl-wrap': VueOglWrap
    },
    data() {
        return {
            program: null
        }
    },
    methods: {
        // example 1
        initExample1({ canvas, renderer, fragment, vertex, gl }) {
            ogl.renderer1 = renderer
            const geometry = new Triangle(gl)

            ogl.program1 = new Program(gl, {
                vertex,
                fragment,
                uniforms: {
                    uTime: { value: 0 },
                    uColor: { value: new Color(0.3, 0.2, 0.5) }
                }
            })
            ogl.mesh1 = new Mesh(gl, { geometry, program: ogl.program1 })
        },
        updateExample1({ time }) {
            ogl.program1.uniforms.uTime.value = time * 0.001
            ogl.renderer1.render({ scene: ogl.mesh1 })
        }
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
