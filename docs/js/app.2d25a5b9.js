(function(e){function t(t){for(var r,i,l=t[0],s=t[1],p=t[2],c=0,v=[];c<l.length;c++)i=l[c],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&v.push(a[i][0]),a[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);u&&u(t);while(v.length)v.shift()();return o.push.apply(o,p||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,l=1;l<n.length;l++){var s=n[l];0!==a[s]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/vue-ogl-wrap/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var p=0;p<l.length;p++)t(l[p]);var u=s;o.push(["a1ec","chunk-vendors"]),n()})({"00a7":function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,".vue-ogl-wrap-demo .wrapper{width:400px;height:400px;margin:60px auto;position:relative}",""])},"3ef1":function(e,t,n){var r=n("00a7");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var a=n("499e").default;a("05a75289",r,!0,{sourceMap:!1,shadowMode:!1})},"434b":function(e,t,n){var r=n("d382");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var a=n("499e").default;a("2b6d20f8",r,!0,{sourceMap:!1,shadowMode:!1})},"6de7":function(e,t,n){"use strict";var r=n("434b"),a=n.n(r);a.a},a1ec:function(e,t,n){"use strict";n.r(t);var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",{staticClass:"vue-ogl-wrap-demo"},[n("div",{staticClass:"wrapper"},[n("vue-ogl-wrap",{attrs:{renderer:{width:400,height:400}},on:{"ogl-ready":e.initExample2,update:e.updateExample2}},[n("script",{attrs:{type:"x-shader/x-fragment"}},[e._v("\n                precision highp float;\n                varying vec2 vUv;\n\n                void main() {\n                    gl_FragColor = vec4(vec3(1., 0., 0.), 1.);\n                }\n            ")])])],1),n("div",{staticClass:"wrapper"},[n("vue-ogl-wrap",{attrs:{renderer:{width:400,height:400}},on:{"ogl-ready":e.initExample1}})],1)])},o=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vue-ogl-wrap"},[e._t("default"),n("full-canvas",{staticClass:"vue-ogl-wrap",on:{"canvas-ready":e.initCanvas}})],2)},l=[],s=n("1b9b"),p=n.n(s),u=n("9b02"),c=n.n(u);const v="\n    precision highp float;\n    precision highp int;\n\n    attribute vec3 position;\n    attribute vec3 normal;\n\n    uniform mat4 modelViewMatrix;\n    uniform mat4 projectionMatrix;\n    uniform mat3 normalMatrix;\n    varying vec3 vNormal;\n\n    void main() {\n        vNormal = normalize(normalMatrix * normal);\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n",d="\n    attribute vec2 uv;\n    attribute vec2 position;\n    varying vec2 vUv;\n    void main() {\n        vUv = uv;\n        gl_Position = vec4(position, 0, 1);\n    }",f="\n    precision highp float;\n\n    varying vec2 vUv;\n    void main() {\n        gl_FragColor.rgb = vec3(vUv.x, vUv.y, 0.);\n        gl_FragColor.a = 1.0;\n    }\n";var g=n("d50d"),m=n("be6c"),h={props:{fragment:{type:String,default:""},vertex:{type:String,default:""},renderer:{type:Object,default:()=>{}},uniforms:{type:Object,default:()=>{}},camera:{type:Boolean,default:!1}},components:{"full-canvas":p.a},data(){return{running:!0,lastTime:0}},methods:{initCanvas(e){const t=c()(this.$slots,"default",[]).find(e=>"x-shader/x-fragment"===c()(e,"data.attrs.type","")),n=c()(t,"elm.innerHTML",this.fragment)||f,r=c()(this.$slots,"default",[]).find(e=>"x-shader/x-vertex"===c()(e,"data.attrs.type","")),a=c()(r,"elm.innerHTML",this.vertex)||this.camera?v:d,o=new g["a"]({canvas:e,dpr:window.devicePixelRatio,...this.renderer}),i=new m["a"](o.gl,{vertex:a,fragment:n,uniforms:this.uniforms});this.$emit("ogl-ready",{canvas:e,renderer:o,fragment:n,vertex:a,program:i,gl:o.gl});const l=t=>{this&&this.running&&requestAnimationFrame(l);const r=t-this.lastTime;this.lastTime=t,this.$emit("update",{time:t,delta:r,canvas:e,renderer:o,fragment:n,vertex:a,program:i,gl:o.gl})};l()}},beforeDestroy(){this.running=!1}},w=h,x=(n("6de7"),n("2877")),y=Object(x["a"])(w,i,l,!1,null,null,null),b=y.exports,_=n("455e"),M=n("52fd"),j=n("4ada");const O={};var C={components:{"vue-ogl-wrap":b},data(){return{program:null}},methods:{initExample1({canvas:e,renderer:t,fragment:n,vertex:r,gl:a,program:o}){const i=new _["a"](a),l=new M["a"](a,{geometry:i,program:o});t.render({scene:l})},initExample2({gl:e,program:t,renderer:n}){const r=new _["a"](e);O.mesh2=new M["a"](e,{geometry:r,program:t});const a=new j["a"](e,{fov:35});a.position.set(0,1,7),a.lookAt([0,0,0]),n.render({scene:O.mesh2,camera:a})},updateExample2(){}}},P=C,E=(n("dfa1"),Object(x["a"])(P,a,o,!1,null,null,null)),T=E.exports;r["a"].config.productionTip=!1,new r["a"]({render:e=>e(T)}).$mount("#app")},d382:function(e,t,n){t=e.exports=n("2350")(!1),t.push([e.i,".vue-ogl-wrap,.vue-ogl-wrap .full-canvas{position:absolute;top:0;left:0;width:100%;height:100%}",""])},dfa1:function(e,t,n){"use strict";var r=n("3ef1"),a=n.n(r);a.a}});
//# sourceMappingURL=app.2d25a5b9.js.map