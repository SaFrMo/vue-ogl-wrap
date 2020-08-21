<template>
    <main class="vue-ogl-wrap-demo">
        <div class="wrapper">
            <vue-ogl-wrap @ogl-ready="init">
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

export default {
    components: {
        'vue-ogl-wrap': VueOglWrap
    },
    methods: {
        init({ canvas, renderer, fragment, vertex }) {
            const gl = renderer.gl

            const geometry = new Triangle(gl)

            const program = new Program(gl, {
                vertex,
                fragment,
                uniforms: {
                    uTime: { value: 0 },
                    uColor: { value: new Color(0.3, 0.2, 0.5) }
                }
            })
            const mesh = new Mesh(gl, { geometry, program })

            requestAnimationFrame(update)
            function update(t) {
                requestAnimationFrame(update)

                program.uniforms.uTime.value = t * 0.001

                // Don't need a camera if camera uniforms aren't required
                renderer.render({ scene: mesh })
            }
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
