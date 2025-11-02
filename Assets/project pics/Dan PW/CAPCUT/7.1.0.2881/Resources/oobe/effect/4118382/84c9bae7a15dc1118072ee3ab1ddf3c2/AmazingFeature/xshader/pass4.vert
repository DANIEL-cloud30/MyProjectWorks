precision highp float;

attribute vec3 attPosition;
attribute vec2 attUV;
uniform vec2 iResolution;
uniform float mysize;
varying vec2 uv0;
varying float lastR;

void main() {
    gl_Position = vec4(attPosition,1.0);
    uv0 = attUV;
    lastR=1.0;
    for (float j = 0.; j < 200.; j++)
    {
        if(j>mysize)
        break;
        lastR+= 1.0 / lastR;
    }
}
