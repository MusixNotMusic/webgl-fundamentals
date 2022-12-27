"use strict"

const vertex = `
attribute vec2 a_position;
attribute vec2 a_texcoord;

uniform vec2 u_resolution;

varying vec2 v_texcoord;

void main() {

  vec2 zeroToOne = a_position / u_resolution;

  vec2 zeroToTwo = zeroToOne * 2.0;

  vec2 clipSpace = zeroToTwo - 1.0;
  
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  
  v_texcoord = a_texcoord;
}
`

const fragment = `
precision mediump float;

// Passed in from the vertex shader.
varying vec2 v_texcoord;

// The texture.
uniform sampler2D u_image0;
uniform sampler2D u_image1;

uniform float u_time;

void main() {
    vec4 color0 = texture2D(u_image0, v_texcoord);
    vec4 color1 = texture2D(u_image1, v_texcoord);
    // gl_FragColor = color0 + color1;
    // gl_FragColor = color0 * color1;
    gl_FragColor = mix(color0, color1, u_time);
}
`

function loadImage(url, callback) {
    var image = new Image();
    image.src = url;
    image.crossOrigin = 'Anonymous'
    image.onload = callback;
    return image;
  }
  
  function loadImages(urls, callback) {
    var images = [];
    var imagesToLoad = urls.length;
  
    // Called each time an image finished
    // loading.
    var onImageLoad = function() {
      --imagesToLoad;
      // If all the images are loaded call the callback.
      if (imagesToLoad === 0) {
        callback(images);
      }
    };
  
    for (var ii = 0; ii < imagesToLoad; ++ii) {
      var image = loadImage(urls[ii], onImageLoad);
      images.push(image);
    }
  }

function main () {
    loadImages([
        "https://webglfundamentals.org/webgl/resources/leaves.jpg",
        "https://webglfundamentals.org/webgl/resources/star.jpg",
      ], render);
}

function render(images) {
    var canvas = document.getElementById('canvas')
    var gl = canvas.getContext('webgl');

    if (!gl) return ;
    
    var program = webglUtils.createProgramFromSources(gl, [vertex, fragment]);

    var positionLocation = gl.getAttribLocation(program, 'a_position');
    var texcoordLocation = gl.getAttribLocation(program, 'a_texcoord');
    var timeLocation = gl.getUniformLocation(program, "u_time"); 

    var positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    setRectangle(gl, 0, 0, images[0].width, images[0].height);

    var texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0,
    ]), gl.STATIC_DRAW)

    var textures = [];

    for (var ii = 0; ii < 2; ++ii) {
        var texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[ii]);

        textures.push(texture)
    }
    

    var resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

    var u_image0Location = gl.getUniformLocation(program, 'u_image0');
    var u_image1Location = gl.getUniformLocation(program, 'u_image1');
    
    webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    gl.enableVertexAttribArray(positionLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2;          // 2 components per iteration
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

    // set the resolution
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);

    // set which texture units to render with.
    gl.uniform1i(u_image0Location, 0);
    gl.uniform1i(u_image1Location, 1);

    // gl.uniform1f(timeLocation, 0.3);

    // Set each texture unit to use a particular texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, textures[1]);

    // Draw the rectangle.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 6;
    // gl.drawArrays(primitiveType, offset, count);

    let counter = 0
    function renderLoop(timeStamp) { 
        counter++
        // set time uniform
        gl.uniform1f(timeLocation, Math.abs(Math.sin(counter * Math.PI / 1000)));
        gl.drawArrays(primitiveType, offset, count);
        // recursive invocation
        window.requestAnimationFrame(renderLoop);
    }
      
    //   // start the loop
    window.requestAnimationFrame(renderLoop);
}

function setRectangle(gl, x, y, width, height) {
    var x1 = x;
    var x2 = x + width;
    var y1 = y;
    var y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
       x1, y1,
       x2, y1,
       x1, y2,
       x1, y2,
       x2, y1,
       x2, y2,
    ]), gl.STATIC_DRAW);
}


main();
