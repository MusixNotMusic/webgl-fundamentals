const fs = require('fs');
const path = require('path');
const process = require('process');

const argv1 = process.argv[1]
const argv2 = process.argv[2]
const argv3 = process.argv[3]

const resourcesPath = path.resolve(argv1, '../resources');
const relativePath = path.relative(path.resolve(process.cwd(), argv2), resourcesPath).replace(/\\/g, '/');

const indexHtml = `<html>
    <head>
        <link rel="stylesheet" href="${relativePath}/webgl-tutorials.css">
    </head>
    <body>
        <h1 class="description">3D in WebGL</h1>
        <p><canvas id="c"></canvas></p>
        <!-- vertex shader -->
        <script  id="vertex-shader-2d" type="x-shader/x-vertex">
        attribute vec4 a_position;
        uniform mat4 u_worldViewProjection;

        void main() {
            gl_Position = u_worldViewProjection * a_position;
        }
        </script>
        <!-- fragment shader -->
        <script  id="fragment-shader-2d" type="x-shader/x-fragment">
        void main() {
            gl_FragColor = vec4(0,0,0,1);
        }
        </script>
        <script src="${relativePath}/webgl-utils.js"></script>
        <script src="${relativePath}/m4.js"></script>
        <script src="./index.js"></script>
    </body>
</html>
`;

const indexJs = `"use strict"

function main () {
    var cubeVertices = [
        -1, -1, -1,
        1, -1, -1,
        1, 1, -1,
        -1, 1, -1,

        -1, -1, 1,
        1, -1, 1,
        1, 1, 1,
        -1, 1, 1,

        // -1, -1, -0.5,
        // 1, -1, -0.5,
        // 1, 1, -0.5,
        // -1, 1, -0.5,
    ];
    /**  0 _________ 1
     *    /|       /|
     *  3/_|______/2|
     *   | |______|_|
     *   | /4     | /5
     *   |/_______|/
     *   7         6
     */ 
    var indices = [
        0, 1,
        1, 2,
        2, 3,
        3, 0,
        4, 5,
        5, 6,
        6, 7,
        7, 4,
        0, 4,
        1, 5,
        2, 6,
        3, 7
    ];

    var canvas = document.querySelector('#c');
    var gl = canvas.getContext('webgl');
    if (!gl) {
        return;
    }

    var program = webglUtils.createProgramFromScripts(gl, ["vertex-shader-2d", "fragment-shader-2d"]);
    gl.useProgram(program);

    var positionLoc = gl.getAttribLocation(program, 'a_position');
    var worldViewProjectionLoc = gl.getUniformLocation(program, 'u_worldViewProjection');

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

    function render(clock) {
        clock *= 0.001;

        var scale = 4;

        webglUtils.resizeCanvasToDisplaySize(gl.canvas, window.devicePixelRation);

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clear(gl.COLOR_BUFFER_BIT);

        var fieldOfView = Math.PI * 0.25;
        var aspect = canvas.clientWidth / canvas.clientHeight;
        var projection = m4.perspective(fieldOfView, aspect, 0.00001, 500);
        var radius = 5;

        var eye = [ Math.sin(clock) * radius, 2, Math.cos(clock) * radius]
        var target = [0, 0, 0];
        var up = [0, 1, 0];
        var camera = m4.lookAt(eye, target, up);
        var view = m4.inverse(camera);

        var worldViewProjection = m4.multiply(projection, view);
        gl.uniformMatrix4fv(worldViewProjectionLoc, false, worldViewProjection);

        gl.drawElements(gl.LINES, indices.length, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}

main();
`;

if (argv2) {
    if (!fs.existsSync(path.resolve(process.cwd(), argv2))) {
        fs.mkdirSync(path.resolve(process.cwd(), argv2), { recursive: true })
        fs.writeFileSync(path.resolve(process.cwd(), argv2, 'index.js'), indexJs, { encoding: 'utf8'})
        fs.writeFileSync(path.resolve(process.cwd(), argv2, 'index.html'), indexHtml, { encoding: 'utf8'})
    } else {
        throw Error('Filename is exsits!')
    }
}



