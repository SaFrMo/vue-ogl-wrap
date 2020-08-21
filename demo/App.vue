<template>
    <main class="vue-ogl-wrap-demo">
        <div class="wrapper">
            <!-- Shapes example -->
            <vue-ogl-wrap
                @ogl-ready="initExample2"
                @update="updateExample2"
                :renderer="{ width: 400, height: 400 }"
                :program-options="{ cullFace: null }"
                use-camera
            >
                <script type="x-shader/x-fragment">
                    precision highp float;
                    varying vec3 vNormal;

                    void main() {
                        vec3 normal = normalize(vNormal);
                        float lighting = dot(normal, normalize(vec3(-0.3, 0.8, 0.6)));
                        gl_FragColor.rgb = vec3(0.2, 0.8, 1.0) + lighting * 0.1;
                        gl_FragColor.a = 1.0;
                    }
                </script>
            </vue-ogl-wrap>
        </div>

        <div class="wrapper">
            <!-- Basic example -->
            <vue-ogl-wrap
                @ogl-ready="initExample1"
                :renderer="{ width: 400, height: 400 }"
            />
        </div>
    </main>
</template>

<script>
import VueOglWrap from '../src/VueOglWrap'
import {
    Triangle,
    Camera,
    Mesh,
    Transform,
    Plane,
    Sphere,
    Box,
    Cylinder
} from 'ogl'

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
            const scene = new Mesh(gl, { geometry, program })
            renderer.render({ scene })
        },

        // example 2
        initExample2({ gl, program, renderer, scene }) {
            // add camera
            ogl.camera = new Camera(gl, { fov: 35 })
            ogl.camera.position.set(0, 1, 7)
            ogl.camera.lookAt([0, 0, 0])

            // add primitives
            const plane = new Mesh(gl, { geometry: new Plane(gl), program })
            plane.position.set(0, 1.3, 0)
            plane.setParent(scene)

            const sphere = new Mesh(gl, { geometry: new Sphere(gl), program })
            sphere.position.set(1.3, 0, 0)
            sphere.setParent(scene)

            const cube = new Mesh(gl, { geometry: new Box(gl), program })
            cube.position.set(0, -1.3, 0)
            cube.setParent(scene)

            const cylinder = new Mesh(gl, {
                geometry: new Cylinder(gl),
                program
            })
            cylinder.position.set(-1.3, 0, 0)
            cylinder.setParent(scene)

            renderer.render({ scene, camera: ogl.camera })
        },
        updateExample2({ renderer, scene }) {
            scene.children.forEach((child, i) => {
                child.rotation.y -= 0.01 * (i + 1)
            })

            renderer.render({ scene, camera: ogl.camera })
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
