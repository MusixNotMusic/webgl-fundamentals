"use strict"

const vertex = `
attribute vec4 a_position;
attribute vec2 a_texcoord;

uniform mat4 u_matrix;

varying vec2 v_texcoord;

void main() {
  // Multiply the position by the matrix.
  gl_Position = u_matrix * a_position;
  
  // Pass the normal to the fragment shader
  v_texcoord = a_texcoord;
}
`

const fragment = `
precision mediump float;

// Passed in from the vertex shader.
varying vec2 v_texcoord;

// The texture.
uniform sampler2D u_texture;


void main() {
  gl_FragColor = texture2D(u_texture, v_texcoord);
}
`

function main () {
    var canvas = document.querySelector('#c');
    var gl = canvas.getContext('webgl');
    if (!gl) {
        return;
    }

    var program = webglUtils.createProgramFromSources(gl, [vertex, fragment]);

    var positionLocation = gl.getAttribLocation(program, 'a_position');
    var texcoordLocation = gl.getAttribLocation(program, 'a_texcoord');

    // lookup uniforms
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");
    var textureLocation = gl.getUniformLocation(program, "u_texture");

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    setGeometry(gl);

    var texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    setTexcoords(gl);

    var allocateFBTexture = true;
    var framebufferWidth;
    var framebufferHeight;
    var framebuffer = gl.createFramebuffer();
    var fbTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, fbTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fbTexture, 0);

    // create a texture
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 255, 255]));

    var image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = "https://webglfundamentals.org/webgl/resources/mip-low-res-example.png";

    image.addEventListener('load', function() {
        // Now that the image has loaded make copy it to the texture.
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);

        if(isPowerOf2(image.width) && isPowerOf2(image.height)) {
            gl.generateMipmap(gl.TEXTURE_2D);
        } else {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        }
    });

    function isPowerOf2(value) {
        return (value & (value - 1)) === 0;
    }

    function radToDeg(r) {
        return r * 180 / Math.PI;
    }

    function degToRad(d) {
        return d * Math.PI / 180;
    }

    var fieldOfViewRadians = degToRad(60);
    var modelXRotationRadians = degToRad(0);
    var modelYRotationRadians = degToRad(0);


    requestAnimationFrame(drawScene);

    function drawScene(time) {
        time *= 0.001;
    
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);

        if (webglUtils.resizeCanvasToDisplaySize(gl.canvas, window.devicePixelRatio) || allocateFBTexture) {
            allocateFBTexture = false;
            framebufferWidth = gl.canvas.width / 4;
            framebufferHeight = gl.canvas.height /4;
            gl.bindTexture(gl.TEXTURE_2D, fbTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, framebufferWidth, framebufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        }
    
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, framebufferWidth, framebufferHeight);
    
        gl.clearColor(0, 0, 0, 1);
        // Clear the canvas AND the depth buffer.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);
    
        // Turn on the position attribute
        gl.enableVertexAttribArray(positionLocation);
    
        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
        // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 3;          // 3 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            positionLocation, size, type, normalize, stride, offset);
    
        // Turn on the texcoord attribute
        gl.enableVertexAttribArray(texcoordLocation);
    
        // bind the texcoord buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    
        // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            texcoordLocation, size, type, normalize, stride, offset);
    
        // Compute the projection matrix
        var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        var projectionMatrix =
            m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
    
        var cameraPosition = [0, 0, 200];
        var up = [0, 1, 0];
        var target = [0, 0, 0];
    
        // Compute the camera's matrix using look at.
        var cameraMatrix = m4.lookAt(cameraPosition, target, up);
    
        // Make a view matrix from the camera matrix.
        var viewMatrix = m4.inverse(cameraMatrix);

        var settings = [
            { x: -1, y: -3, z: -30, filter: gl.NEAREST },
            { x:  0, y: -3, z: -30, filter: gl.LINEAR },
            { x:  1, y: -3, z: -30, filter: gl.NEAREST_MIPMAP_LINEAR },
            { x: -1, y: -1, z: -10, filter: gl.NEAREST },
            { x:  0, y: -1, z: -10, filter: gl.LINEAR },
            { x:  1, y: -1, z: -10, filter: gl.NEAREST_MIPMAP_LINEAR },
            { x: -1, y:  1, z:   0, filter: gl.NEAREST },
            { x:  0, y:  1, z:   0, filter: gl.LINEAR },
            { x:  1, y:  1, z:   0, filter: gl.NEAREST_MIPMAP_LINEAR }
        ];

        var xSpacing = 1.2;
        var ySpacing = 0.7;
        var zDistance = 30;
        settings.forEach((s) => {
            var z = -5 + s.z;
            var r = Math.abs(z) * Math.sin(fieldOfViewRadians * 0.5);
            var x = Math.sin(time * 0.2) * r;
            var y = Math.cos(time * 0.2) * r * 0.5;
            var r2 = 1 + r * 0.2;

            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, s.filter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            var matrix = m4.translate(projectionMatrix, 
                x + s.x * xSpacing * r2,
                y + s.y * ySpacing * r2,
                z);

            gl.uniformMatrix4fv(matrixLocation, false, matrix);

            gl.uniform1i(textureLocation, 0);

            gl.drawArrays(gl.TRIANGLES, 0, 1 * 6);
        });
    
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.bindTexture(gl.TEXTURE_2D, fbTexture);
        gl.uniformMatrix4fv(matrixLocation, false,
            [ 2, 0, 0, 0,
              0, 2, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1]);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 16 * 6);
    
        requestAnimationFrame(drawScene);
    }
}

function setGeometry(gl) {
    var positions = new Float32Array(
      [
      -0.5, -0.5,   0.5,
       0.5, -0.5,   0.5,
      -0.5,  0.5,   0.5,
      -0.5,  0.5,   0.5,
       0.5, -0.5,   0.5,
       0.5,  0.5,   0.5,
  
      ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
}
  
// Fill the buffer with texture coordinates for a plane.
function setTexcoords(gl) {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(
          [
          0, 0,
          1, 0,
          0, 1,
          0, 1,
          1, 0,
          1, 1,
  
        ]),
        gl.STATIC_DRAW);
}

main();
