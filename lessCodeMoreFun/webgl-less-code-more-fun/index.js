"use strict"

const vertex = `
uniform mat4 u_worldViewProjection;
uniform vec3 u_lightWorldPos;
uniform mat4 u_world;
uniform mat4 u_viewInverse;
uniform mat4 u_worldInverseTranspose;

attribute vec4 a_position;
attribute vec3 a_normal;
attribute vec2 a_texcoord;

varying vec4 v_position;
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

void main() {
  v_texCoord = a_texcoord;
  v_position = (u_worldViewProjection * a_position);
  v_normal = (u_worldInverseTranspose * vec4(a_normal, 0)).xyz;
  v_surfaceToLight = u_lightWorldPos - (u_world * a_position).xyz;
  v_surfaceToView = (u_viewInverse[3] - (u_world * a_position)).xyz;
  gl_Position = v_position;
}
`

const fragment = `
precision mediump float;

varying vec4 v_position;
varying vec2 v_texCoord;
varying vec3 v_normal;
varying vec3 v_surfaceToLight;
varying vec3 v_surfaceToView;

uniform vec4 u_lightColor;
uniform vec4 u_colorMult;
uniform sampler2D u_diffuse;
uniform vec4 u_specular;
uniform float u_shininess;
uniform float u_specularFactor;

vec4 lit(float l ,float h, float m) {
  return vec4(1.0,
              abs(l),
              (l > 0.0) ? pow(max(0.0, h), m) : 0.0,
              1.0);
}

void main() {
  vec4 diffuseColor = texture2D(u_diffuse, v_texCoord);
  vec3 a_normal = normalize(v_normal);
  vec3 surfaceToLight = normalize(v_surfaceToLight);
  vec3 surfaceToView = normalize(v_surfaceToView);
  vec3 halfVector = normalize(surfaceToLight + surfaceToView);
  vec4 litR = lit(dot(a_normal, surfaceToLight),
                    dot(a_normal, halfVector), u_shininess);
  vec4 outColor = vec4((
  u_lightColor * (diffuseColor * litR.y * u_colorMult +
                u_specular * litR.z * u_specularFactor)).rgb,
      diffuseColor.a);
  gl_FragColor = outColor;
//  gl_FragColor = vec4(litR.yyy, 1);
}
`

function main() {
    // Get A WebGL context
    /** @type {HTMLCanvasElement} */
    var canvas = document.querySelector("#c");
    var gl = canvas.getContext("webgl");
    if (!gl) {
      return;
    }
  
    var buffers = window.primitives.createSphereBuffers(gl, 10, 48, 24);
  
    // setup GLSL program
    // var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-3d", "fragment-shader-3d"]);
    var program = webglUtils.createProgramFromSources(gl, [vertex, fragment]);
    var uniformSetters = webglUtils.createUniformSetters(gl, program);
    var attribSetters  = webglUtils.createAttributeSetters(gl, program);
  
    var attribs = {
      a_position: { buffer: buffers.position, numComponents: 3, },
      a_normal:   { buffer: buffers.normal,   numComponents: 3, },
      a_texcoord: { buffer: buffers.texcoord, numComponents: 2, },
    };
  
    function degToRad(d) {
      return d * Math.PI / 180;
    }
  
    var cameraAngleRadians = degToRad(0);
    var fieldOfViewRadians = degToRad(60);
    var cameraHeight = 50;
  
    var uniformsThatAreTheSameForAllObjects = {
      u_lightWorldPos:         [-50, 30, 100],
      u_viewInverse:           m4.identity(),
      u_lightColor:            [1, 1, 1, 1],
    };
  
    var uniformsThatAreComputedForEachObject = {
      u_worldViewProjection:   m4.identity(),
      u_world:                 m4.identity(),
      u_worldInverseTranspose: m4.identity(),
    };
  
    var rand = function(min, max) {
      if (max === undefined) {
        max = min;
        min = 0;
      }
      return min + Math.random() * (max - min);
    };
  
    var randInt = function(range) {
      return Math.floor(Math.random() * range);
    };
  
    var textures = [
      textureUtils.makeStripeTexture(gl, { color1: "#FFF", color2: "#CCC", }),
      textureUtils.makeCheckerTexture(gl, { color1: "#FFF", color2: "#CCC", }),
      textureUtils.makeCircleTexture(gl, { color1: "#FFF", color2: "#CCC", }),
    ];
  
    var objects = [];
    var numObjects = 300;
    var baseColor = rand(240);
    for (var ii = 0; ii < numObjects; ++ii) {
      objects.push({
        radius: rand(150),
        xRotation: rand(Math.PI * 2),
        yRotation: rand(Math.PI),
        materialUniforms: {
          u_colorMult:             chroma.hsv(rand(baseColor, baseColor + 120), 0.5, 1).gl(),
          u_diffuse:               textures[randInt(textures.length)],
          u_specular:              [1, 1, 1, 1],
          u_shininess:             rand(500),
          u_specularFactor:        rand(1),
        },
      });
    }
  
    requestAnimationFrame(drawScene);
  
    // Draw the scene.
    function drawScene(time) {
      time = time * 0.0001 + 5;
  
      webglUtils.resizeCanvasToDisplaySize(gl.canvas);
  
      // Tell WebGL how to convert from clip space to pixels
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  
      // Clear the canvas AND the depth buffer.
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
      gl.enable(gl.CULL_FACE);
      gl.enable(gl.DEPTH_TEST);
  
      // Compute the projection matrix
      var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      var projectionMatrix =
          m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
  
      // Compute the camera's matrix using look at.
      var cameraPosition = [0, 0, 100];
      var target = [0, 0, 0];
      var up = [0, 1, 0];
      var cameraMatrix = m4.lookAt(cameraPosition, target, up, uniformsThatAreTheSameForAllObjects.u_viewInverse);
  
      // Make a view matrix from the camera matrix.
      var viewMatrix = m4.inverse(cameraMatrix);
  
      var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
  
      gl.useProgram(program);
  
      // Setup all the needed attributes.
      webglUtils.setAttributes(attribSetters, attribs);
  
      // Bind the indices.
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  
      // Set the uniforms that are the same for all objects.
      webglUtils.setUniforms(uniformSetters, uniformsThatAreTheSameForAllObjects);
  
      // Draw objects
      objects.forEach(function(object) {
  
        // Compute a position for this object based on the time.
        var worldMatrix = m4.xRotation(object.xRotation * time);
        worldMatrix = m4.yRotate(worldMatrix, object.yRotation * time);
        worldMatrix = m4.translate(worldMatrix, 0, 0, object.radius);
        uniformsThatAreComputedForEachObject.u_world = worldMatrix;
  
        // Multiply the matrices.
        m4.multiply(viewProjectionMatrix, worldMatrix, uniformsThatAreComputedForEachObject.u_worldViewProjection);
        m4.transpose(m4.inverse(worldMatrix), uniformsThatAreComputedForEachObject.u_worldInverseTranspose);
  
        // Set the uniforms we just computed
        webglUtils.setUniforms(uniformSetters, uniformsThatAreComputedForEachObject);
  
        // Set the uniforms that are specific to the this object.
        webglUtils.setUniforms(uniformSetters, object.materialUniforms);
  
        // Draw the geometry.
        gl.drawElements(gl.TRIANGLES, buffers.numElements, gl.UNSIGNED_SHORT, 0);
      });
  
      requestAnimationFrame(drawScene);
    }
  }

main();
