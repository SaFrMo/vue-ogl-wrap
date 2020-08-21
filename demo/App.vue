<template>
    <main class="vue-ogl-wrap-demo">
        <div class="wrapper">
            <!-- Shapes example -->
            <vue-ogl-wrap
                @ogl-ready="initExample2"
                @update="updateExample2"
                :renderer="{ width: 400, height: 400 }"
            >
                <script type="x-shader/x-fragment">
                    precision highp float;
                    varying vec2 vUv;

                    void main() {
                        gl_FragColor = vec4(vec3(1., 0., 0.), 1.);
                    }
                </script>
            </vue-ogl-wrap>
        </div>

        <div class="wrapper">
            <!-- Basic example -->
            <vue-ogl-wrap
                @ogl-ready="initExample1"
                @update="updateExample1"
                :renderer="{ width: 400, height: 400 }"
            />
        </div>
    </main>
</template>

<script>
import VueOglWrap from '../src/VueOglWrap'
import { Triangle, Camera, Mesh } from 'ogl'

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
        initExample1({ canvas, renderer, fragment, vertex, gl, program }) {
            // add triangle
            const geometry = new Triangle(gl)
            ogl.mesh1 = new Mesh(gl, { geometry, program })
        },
        updateExample1({ time, delta, renderer }) {
            renderer.render({ scene: ogl.mesh1 })
        },

        // example 2
        initExample2({ gl, program, renderer }) {
            const geometry = new Triangle(gl)
            ogl.mesh2 = new Mesh(gl, { geometry, program })

            const camera = new Camera(gl, { fov: 35 })
            camera.position.set(0, 1, 7)
            camera.lookAt([0, 0, 0])

            renderer.render({ scene: ogl.mesh2, camera })
        },
        updateExample2() {}
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
