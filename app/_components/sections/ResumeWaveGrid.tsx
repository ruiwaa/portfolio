"use client";

import { useEffect, useRef } from "react";
import { createWaveGridRenderer } from "@/app/_lib/wave-grid";

// 실제 경과 시간에 곱하는 속도 계수
const TIME_SPEED = 0.9;
const MAX_DEVICE_PIXEL_RATIO = 2;
const THEME_CHANGE_EVENT = "theme-change";
// 마우스가 캔버스 밖에 있을 때 셰이더에 넘기는 좌표 - 굴곡이 미치는 범위(p 공간) 밖의
// 값이라 dentAmount가 항상 0이 되어 파임 효과가 사라짐
const MOUSE_OFFSCREEN: readonly [number, number] = [-10, -10];

export default function ResumeWaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const gl = canvasEl.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;

    const waveRenderer = createWaveGridRenderer(gl);
    if (!waveRenderer) return;

    // 이하 콜백에서 nullable 없이 안전하게 참조하기 위한 non-null 지역 바인딩
    const canvas: HTMLCanvasElement = canvasEl;
    const renderer = waveRenderer;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let isDark = document.documentElement.classList.contains("dark");
    let animationFrameId = 0;
    const startTime = performance.now();
    const mouse: [number, number] = [...MOUSE_OFFSCREEN];

    function handleThemeChange() {
      isDark = document.documentElement.classList.contains("dark");
    }

    // canvas가 pointer-events-none이라 자체적으로 이벤트를 받지 못하므로 window에서
    // 추적하다가, 캔버스(=Resume 섹션) 영역 안에 있을 때만 좌표를 셰이더 p 공간으로 변환
    function handlePointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const withinBounds =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!withinBounds || rect.width === 0 || rect.height === 0) {
        mouse[0] = MOUSE_OFFSCREEN[0];
        mouse[1] = MOUSE_OFFSCREEN[1];
        return;
      }

      const u = (event.clientX - rect.left) / rect.width;
      // gl_FragCoord.y는 아래에서 위로 증가(WebGL 규약)하므로 화면 좌표를 뒤집어야 함
      const v = 1 - (event.clientY - rect.top) / rect.height;
      mouse[0] = u * (canvas.width / canvas.height);
      mouse[1] = v;
    }

    function handlePointerLeave() {
      mouse[0] = MOUSE_OFFSCREEN[0];
      mouse[1] = MOUSE_OFFSCREEN[1];
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
      const width = Math.round(canvas.clientWidth * dpr);
      const height = Math.round(canvas.clientHeight * dpr);
      // 캔버스 백킹 버퍼 크기 재할당은 변경 시에만, viewport/u_resolution 갱신은
      // (Strict Mode의 마운트→언마운트→재마운트로 renderer가 새로 만들어졌을 때도)
      // 매번 호출해야 함 - 그렇지 않으면 새 renderer의 u_resolution이 0으로 남아
      // 프래그먼트 셰이더에서 0 나누기가 발생해 화면이 검게 나옴
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      renderer.resize(width, height);
    }

    function draw(now: number) {
      const elapsedSeconds = ((now - startTime) / 1000) * TIME_SPEED;
      renderer.render(elapsedSeconds, mouse[0], mouse[1], isDark);
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeChange);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeChange);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // fixed로 두면 뷰포트 전체에 고정되어 스크롤 시 Footer 뒤로도 그리드가 비쳐 보임
      // - absolute로 바꿔 부모(Resume section, position:relative + overflow-hidden)
      // 박스 안에만 그려지도록 가둠. canvas는 대체 요소(replaced element)라 inset-0만으로는
      // 부모 크기로 늘어나지 않아 h-full/w-full을 명시해야 함
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
    />
  );
}
