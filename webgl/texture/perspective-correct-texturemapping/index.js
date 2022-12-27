"use strict"

const vertex = `
attribute vec4 a_position;

void main() {
  gl_Position = a_position;
}
`

const fragment = `
precision mediump float;

void main() {
    gl_FragColor = vec4(1, 0, 0.5, 1);;
}
`

function main () {
   var canvas = document.querySelector('#canvas');
   var gl = canvas.getContext('webgl');
   if (!gl) {
     return
   }

   var program = webglUtils.createProgramFromSources(gl, [vertex, fragment]);

   var positionLocation = gl.getAttribLocation(program, 'a_position');

   var positionBuffer = gl.createBuffer();

   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

   var positions = [
    -.8,  .8, 0, 1,  // 1st rect 1st triangle
     .8,  .8, 0, 1,
    -.8,  .2, 0, 1,
    -.8,  .2, 0, 1,  // 1st rect 2nd triangle
     .8,  .8, 0, 1,
     .8,  .2, 0, 1,

    -.8, -.2, 0, 1,  // 2nd rect 1st triangle
     .8, -.2, 0, 1,
    -.8, -.8, 0, 1,
    -.8, -.8, 0, 1,  // 2nd rect 2nd triangle
     .8, -.2, 0, 1,
     .8, -.8, 0, 1,
    ];

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    var size = 4;
    var type = gl.FLOAT;
    var normalize = false;
    var stride = 0;
    var offset = 0;
    // gl.vertexAttribPointer(
    //     positionLocation, size, type, normalize. stride, offset);
    gl.vertexAttribPointer(
        positionLocation, size, type, normalize, stride, offset);

    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 4 * 3;
    gl.drawArrays(primitiveType, offset, count);
}

main();
