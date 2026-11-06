import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Portada → Enfoque transition — ports orpheus-mocks' pinned "O gira 45°" sequence:
 * a scroll-scrubbed timeline rotates/scales the isotype "O" until the viewer passes
 * through its hole, then reveals the next section's title over a chrome/iridescent
 * WebGL gradient.
 *
 * Two independent pieces, exactly as in the mock:
 * 1. A GSAP ScrollTrigger timeline (pinned, `scrub`) driving the O/background/text.
 * 2. A raw WebGL fragment shader (domain-warped fbm, brand-color palette) painted on
 *    `.t-gl`, only animating while the section is on screen (IntersectionObserver).
 *
 * Both no-op gracefully: the timeline bails under `prefers-reduced-motion` (CSS alone
 * then shows the post content statically — see IsotypeTransition.vue), and the shader
 * removes its canvas if WebGL is unavailable, leaving the CSS gradient fallback.
 */
export function useIsotypeTransition(stageRef: Ref<HTMLElement | null>) {
  onMounted(() => {
    if (!import.meta.client) return
    const stage = stageRef.value
    if (!stage) return

    const o = stage.querySelector<HTMLElement>('.t-o')
    const fondo = stage.querySelector<HTMLElement>('.t-fondo')
    const pre = stage.querySelector<HTMLElement>('.t-pre')
    const post = stage.querySelector<HTMLElement>('.t-post')
    const postHeadline = stage.querySelector<HTMLElement>('.t-post .headline')
    if (!o || !fondo || !pre || !post || !postHeadline) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!reduceMotion) {
      gsap.registerPlugin(ScrollTrigger)
      gsap.set(o, { force3D: false })
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          end: '+=160%',
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      tl.to(pre, { autoAlpha: 0, duration: 0.15 }, 0)
        .to(o, { rotation: 45, scale: 1.25, duration: 0.3, ease: 'power2.inOut' }, 0)
        .to(o, { scale: 48, duration: 0.5, ease: 'power3.in' }, 0.3)
        .to(o, { autoAlpha: 0, duration: 0.05 }, 0.78)
        .to(fondo, { scale: 1.35, duration: 0.5, ease: 'power2.in' }, 0.3)
        .to(fondo, { opacity: 0.18, duration: 0.15 }, 0.74)
        .to(post, { autoAlpha: 1, duration: 0.15 }, 0.82)
        .fromTo(
          postHeadline,
          { yPercent: 30 },
          { yPercent: 0, duration: 0.18, ease: 'power2.out' },
          0.82
        )

      onUnmounted(() => {
        tl.scrollTrigger?.kill()
        tl.kill()
      })
    }

    setupShader(stage)
  })
}

const FRAGMENT_SHADER = `precision highp float;
uniform vec2 r; uniform float t;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);
  for(int i=0;i<4;i++){v+=a*n(p);p=m*p;a*=.5;}return v;}
float campo(vec2 p,float T,out vec2 w){
  vec2 q=vec2(fbm(p+vec2(0.,T)),fbm(p+vec2(5.2,1.3)-T*.8));
  w=vec2(fbm(p+2.6*q+vec2(1.7,9.2)+T*1.2),fbm(p+2.6*q+vec2(8.3,2.8)-T));
  return fbm(p+3.*w);
}
vec3 paleta(float k){
  vec3 rojo=vec3(.902,.2,.137), naranja=vec3(.949,.443,.11), lima=vec3(.847,.922,.278),
       esmeralda=vec3(.12,.64,.4), aqua=vec3(.41,.8,.95), azul=vec3(.2,.26,.62), rosa=vec3(.957,.6,.62);
  k=fract(k);
  if(k<.12) return mix(rojo,naranja,k/.12);
  if(k<.26) return naranja;
  if(k<.36) return mix(naranja,lima,(k-.26)/.1);
  if(k<.46) return lima;
  if(k<.56) return mix(lima,esmeralda,(k-.46)/.1);
  if(k<.64) return esmeralda;
  if(k<.72) return mix(esmeralda,aqua,(k-.64)/.08);
  if(k<.82) return mix(aqua,azul,(k-.72)/.1);
  if(k<.92) return mix(azul,rosa,(k-.82)/.1);
  return mix(rosa,rojo,(k-.92)/.08);
}
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*r)/r.y;
  vec2 p=mat2(.82,-.57,.57,.82)*uv*vec2(.75,2.1)*1.15;
  float T=t*.06;
  vec2 w,w2,w3; float e=.012;
  float f=campo(p,T,w);
  float fx=campo(p+vec2(e,0.),T,w2), fy=campo(p+vec2(0.,e),T,w3);
  vec3 nr=normalize(vec3((f-fx)/e,(f-fy)/e,1.6));
  vec3 l=normalize(vec3(-.4,.6,.7));
  float dif=max(dot(nr,l),0.);
  float spec=pow(max(dot(reflect(-l,nr),vec3(0.,0.,1.)),0.),12.);
  float cuerpo=smoothstep(.52,.7,f);
  vec3 pal=paleta(f*1.6+w.x*.9+w.y*.4);
  vec3 iris=paleta(f*4.+.35+w.y);
  float borde=smoothstep(.52,.57,f)*(1.-smoothstep(.57,.64,f));
  vec3 col=vec3(.067);
  col+=pal*smoothstep(.38,.8,f)*.22;
  col+=pal*cuerpo*(.3+1.35*dif*dif);
  col+=vec3(1.)*spec*cuerpo*1.15;
  col+=iris*borde*.6;
  col*=smoothstep(1.75,.15,length(uv*vec2(.8,1.)));
  col+=(h(gl_FragCoord.xy+fract(t))-.5)*.03;
  gl_FragColor=vec4(col,1.);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null
}

function setupShader(stage: HTMLElement) {
  const canvas = stage.querySelector<HTMLCanvasElement>('.t-gl')
  if (!canvas) return
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
  if (!gl) {
    canvas.remove()
    return
  }

  const vs = compileShader(
    gl,
    gl.VERTEX_SHADER,
    'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'
  )
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
  if (!vs || !fs) {
    canvas.remove()
    return
  }
  const program = gl.createProgram()
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    canvas.remove()
    return
  }
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(program, 'a')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

  const uR = gl.getUniformLocation(program, 'r')
  const uT = gl.getUniformLocation(program, 't')
  const escala = window.matchMedia('(max-width: 760px)').matches ? 0.5 : 0.6
  let activo = false
  let raf = 0
  const t0 = performance.now()

  function medir() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas!.width = Math.max(2, Math.round(stage.clientWidth * dpr * escala))
    canvas!.height = Math.max(2, Math.round(stage.clientHeight * dpr * escala))
    gl!.viewport(0, 0, canvas!.width, canvas!.height)
  }
  function dibujar(s: number) {
    gl!.uniform2f(uR, canvas!.width, canvas!.height)
    gl!.uniform1f(uT, s)
    gl!.drawArrays(gl!.TRIANGLES, 0, 3)
  }
  function loop(now: number) {
    dibujar(((now - t0) / 1000) * 1.6 + 12)
    if (activo) raf = requestAnimationFrame(loop)
  }
  medir()
  dibujar(12)

  const onResize = () => {
    medir()
    dibujar(((performance.now() - t0) / 1000) * 1.6 + 12)
  }
  window.addEventListener('resize', onResize)

  const observer = new IntersectionObserver((entries) => {
    activo = entries[0]!.isIntersecting
    cancelAnimationFrame(raf)
    if (activo) raf = requestAnimationFrame(loop)
  })
  observer.observe(stage)

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    observer.disconnect()
    cancelAnimationFrame(raf)
  })
}
