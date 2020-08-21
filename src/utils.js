export const defaultVertexCamera = `
    precision highp float;
    precision highp int;
    
    attribute vec3 position;
    attribute vec3 normal;

    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform mat3 normalMatrix;
    varying vec3 vNormal;

    void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

export const defaultVertexNoCamera = `
    attribute vec2 uv;
    attribute vec2 position;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }`

export const defaultFragment = `
    precision highp float;

    varying vec2 vUv;
    void main() {
        gl_FragColor.rgb = vec3(vUv.x, vUv.y, 0.);
        gl_FragColor.a = 1.0;
    }
`
