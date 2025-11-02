precision highp float;
varying highp vec2 uv0;
uniform sampler2D inputImageTexture;

uniform float BRIGHT_SPOT_TRESHOLD; //light
uniform float mysize;
uniform float blurSize;
uniform float ins;
uniform vec2 iResolution;
varying float lastR;
mat2 rotMatrix(float angle)
{
    return mat2(-0.73735, 0.67539,
                    -0.67539, -0.73735);
}


void main()
{
    vec3 res=vec3(0);
    float ratio = iResolution.x/iResolution.y;
    mat2 _GoldenRot = rotMatrix(2.39996323);
    mat2 rot = _GoldenRot;
    vec3 accumulator = vec3(0.0);
    vec3 divisor = vec3(0.0);
    float r = 1.0;
    float myRatio=max(iResolution.x,iResolution.y)/min(iResolution.x,iResolution.y);
    vec2 angle = vec2(0.0, 0.35*blurSize*myRatio)/ iResolution.xy;

    float amount = 40.0;
    amount += 0.9987*500.0;

    for (int i = 0; i < 120; i++)
    {
        float j = float(i);
        if(j>mysize)
        break;
        
        angle.x*=ratio;
        angle = rot * angle;
        angle.x/=ratio;
        vec3 col = texture2D(inputImageTexture,vec2(uv0 + (r - 1.0)*mix(1.5,1.0,r/lastR) * angle)).rgb;
        vec3 bokeh = pow(col,vec3(9.0)) * amount+.4;;
        float d=r/lastR;
        bokeh=bokeh*smoothstep(1.0,0.9,d)*
        (ins+(1.0-ins)*smoothstep(0.8,0.9,d));
        accumulator +=  col*bokeh;
        divisor += 1.0*bokeh;
        r += 1.0 / r;
    }
    res=(accumulator / divisor);
    gl_FragColor = vec4(res,texture2D(inputImageTexture,uv0).a);
}

