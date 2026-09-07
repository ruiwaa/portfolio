// 카드 테두리를 따라 점을 균등 배치하기 위해 둥근 사각형 둘레의 좌표를 계산 (JourneyDetailCard의 점선 테두리 애니메이션에서 사용)
export function getRoundedRectPerimeterPoints(
  width: number,
  height: number,
  radius: number,
  spacing: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  const straightTop = width - 2 * r;
  const straightSide = height - 2 * r;
  const cornerArc = (Math.PI * r) / 2;
  const perimeter = 2 * straightTop + 2 * straightSide + 4 * cornerArc;
  if (perimeter <= 0) return [];

  const count = Math.max(8, Math.round(perimeter / spacing));

  const segments = [
    { end: straightTop, type: "top" as const },
    { end: straightTop + cornerArc, type: "corner-tr" as const },
    { end: straightTop + cornerArc + straightSide, type: "right" as const },
    {
      end: straightTop + 2 * cornerArc + straightSide,
      type: "corner-br" as const,
    },
    {
      end: 2 * straightTop + 2 * cornerArc + straightSide,
      type: "bottom" as const,
    },
    {
      end: 2 * straightTop + 3 * cornerArc + straightSide,
      type: "corner-bl" as const,
    },
    {
      end: 2 * straightTop + 3 * cornerArc + 2 * straightSide,
      type: "left" as const,
    },
    { end: perimeter, type: "corner-tl" as const },
  ];

  const points: { x: number; y: number }[] = [];

  for (let i = 0; i < count; i++) {
    const d = (perimeter * i) / count;
    let segStart = 0;
    const seg =
      segments.find((s) => {
        if (d < s.end) return true;
        segStart = s.end;
        return false;
      }) ?? segments[segments.length - 1];
    const local = d - segStart;

    let x = 0;
    let y = 0;
    switch (seg.type) {
      case "top":
        x = r + local;
        y = 0;
        break;
      case "corner-tr": {
        const angle = -Math.PI / 2 + (local / cornerArc) * (Math.PI / 2);
        x = width - r + r * Math.cos(angle);
        y = r + r * Math.sin(angle);
        break;
      }
      case "right":
        x = width;
        y = r + local;
        break;
      case "corner-br": {
        const angle = (local / cornerArc) * (Math.PI / 2);
        x = width - r + r * Math.cos(angle);
        y = height - r + r * Math.sin(angle);
        break;
      }
      case "bottom":
        x = width - r - local;
        y = height;
        break;
      case "corner-bl": {
        const angle = Math.PI / 2 + (local / cornerArc) * (Math.PI / 2);
        x = r + r * Math.cos(angle);
        y = height - r + r * Math.sin(angle);
        break;
      }
      case "left":
        x = 0;
        y = height - r - local;
        break;
      case "corner-tl": {
        const angle = Math.PI + (local / cornerArc) * (Math.PI / 2);
        x = r + r * Math.cos(angle);
        y = r + r * Math.sin(angle);
        break;
      }
    }
    points.push({ x, y });
  }

  return points;
}
