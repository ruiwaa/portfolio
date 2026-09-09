// WebGL 셰이더 기반 Resume 배경 그리드 - 화이트 배경 + 은은한 연회색 사각 격자선에,
// 다중 주파수 사인파를 합성한 높이값으로 격자 UV를 미세하게 뒤틀어 파도처럼 매우 느리고
// 잔잔하게 일렁이는 3D 굴곡 느낌을 준다. 라이트/다크 색상은 u_dark 유니폼으로 셰이더
// 안에서 보간해 테마 전환 시 자바스크립트 쪽에서 색상값을 새로 계산할 필요가 없다.

const VERTEX_SHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// fwidth 기반 안티앨리어싱은 OES_standard_derivatives 확장이 있을 때만 사용하고,
// 없으면 고정 폭으로 대체한다 (확장 미지원 환경에서도 렌더링 자체는 계속되도록).
function buildFragmentShaderSource(hasDerivatives: boolean): string {
  const header = hasDerivatives
    ? "#extension GL_OES_standard_derivatives : enable\nprecision mediump float;\n"
    : "precision mediump float;\n";
  const lineAaWidth = hasDerivatives ? "fwidth(grid)" : "vec2(0.035)";

  return `${header}
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_dark;
uniform vec2 u_mouse;

// 화이트(라이트) / 다크 배경과 은은한 연회색 격자선 - 기존 디자인 토큰(light/dark-border)과 통일
const vec3 LIGHT_BG = vec3(1.0, 1.0, 1.0);
const vec3 LIGHT_LINE = vec3(0.8784, 0.8784, 0.8784);

const vec3 DARK_BG = vec3(0.0784, 0.0745, 0.0745);
const vec3 DARK_LINE = vec3(0.2275, 0.2235, 0.2235);

const float GRID_SIZE = 34.0;
const float DENT_RADIUS = 0.16;
const float DENT_DEPTH = 0.6;

// 마우스 위치를 중심으로 부드럽게 감쇠하는 오목한 깊이값(0~1) - 커서에서 멀어질수록 0
float dentAmount(vec2 p) {
  float dm = length(p - u_mouse);
  return 1.0 - smoothstep(0.0, DENT_RADIUS, dm);
}

// 다중 주파수 사인파를 합성한 지형 높이값 - 파도처럼 잔잔하게 일렁이는 굴곡의 근원.
// 마우스 근처는 dentAmount만큼 높이를 깎아 움푹 파인 것처럼 보이게 함
float terrain(vec2 p, float t) {
  float h = 0.0;
  h += sin(p.x * 3.0 + t) * 0.35;
  h += sin(p.y * 2.3 - t * 0.8) * 0.25;
  h += sin((p.x + p.y) * 4.1 + t * 1.2) * 0.15;
  h -= dentAmount(p) * DENT_DEPTH;
  return h;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv;
  p.x *= u_resolution.x / u_resolution.y;

  float h = terrain(p, u_time);

  // 높이값만큼 격자 좌표를 살짝 뒤틀어 평면이 굴곡진 파도처럼 보이게 함
  vec2 warped = uv + h * 0.012;
  vec2 grid = warped * GRID_SIZE;
  // gridDist: 셀 중심에서 0, 셀 경계에서 0.5 - 경계 근처(0.5 부근)일 때만 선으로 그림
  vec2 gridDist = abs(fract(grid) - 0.5);
  vec2 lineAa = ${lineAaWidth};
  vec2 lineEdge = vec2(0.5) - lineAa * 1.5;
  float lineX = smoothstep(lineEdge.x, 0.5, gridDist.x);
  float lineY = smoothstep(lineEdge.y, 0.5, gridDist.y);
  float line = clamp(lineX + lineY, 0.0, 1.0);

  vec3 bg = mix(LIGHT_BG, DARK_BG, u_dark);
  vec3 lineColor = mix(LIGHT_LINE, DARK_LINE, u_dark);
  vec3 color = mix(bg, lineColor, line * 0.9);

  // 파인 곳 안쪽은 그림자가 지는 느낌으로 은은하게 어둡게
  color = mix(color, color * 0.82, dentAmount(p) * 0.6);

  gl_FragColor = vec4(color, 1.0);
}
`;
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("wave-grid shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function linkProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader,
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("wave-grid program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export interface WaveGridRenderer {
  resize: (widthPx: number, heightPx: number) => void;
  render: (
    timeSeconds: number,
    mouseX: number,
    mouseY: number,
    isDark: boolean,
  ) => void;
  dispose: () => void;
}

export function createWaveGridRenderer(
  gl: WebGLRenderingContext,
): WaveGridRenderer | null {
  const hasDerivatives = Boolean(gl.getExtension("OES_standard_derivatives"));

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SOURCE);
  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    buildFragmentShaderSource(hasDerivatives),
  );
  if (!vertexShader || !fragmentShader) return null;

  const program = linkProgram(gl, vertexShader, fragmentShader);
  if (!program) return null;

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // 클립 공간 전체를 덮는 큰 삼각형 하나 - 쿼드+인덱스 없이 풀스크린을 그리는 표준 기법
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const darkLocation = gl.getUniformLocation(program, "u_dark");
  const mouseLocation = gl.getUniformLocation(program, "u_mouse");

  gl.useProgram(program);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  return {
    resize(widthPx, heightPx) {
      gl.viewport(0, 0, widthPx, heightPx);
      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, widthPx, heightPx);
    },
    render(timeSeconds, mouseX, mouseY, isDark) {
      gl.useProgram(program);
      gl.uniform1f(timeLocation, timeSeconds);
      gl.uniform2f(mouseLocation, mouseX, mouseY);
      gl.uniform1f(darkLocation, isDark ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    },
  };
}
