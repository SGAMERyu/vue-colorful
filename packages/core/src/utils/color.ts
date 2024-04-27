import { HSVColor } from "../types";

/**
 * convertHexToHsv 转换HEX颜色为HSV颜色
 * @param hexColor HEX颜色代码
 * @return HSVColor的对象
 */
export function convertHexToHsv(hex: string): HSVColor {
  const newHex = hex.startsWith("#") ? hex.substring(1) : hex;
  const rgb =
    newHex.length === 3
      ? Array.from(newHex, (c) => parseInt(c + c, 16) / 255)
      : Array.from(newHex.match(/../g) || [], (c) => parseInt(c, 16) / 255);

  // Extract RGB values
  const [r, g, b] = rgb;

  // Compute HSV values
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const h = diff
    ? max === r
      ? ((g - b) / diff) % 6
      : max === g
        ? (b - r) / diff + 2
        : (r - g) / diff + 4
    : 0;
  const s = max ? diff / max : 0;

  return {
    h: Math.round(h * 60),
    s: Math.round(s * 100),
    v: Math.round(max * 100),
  };
}

export function convertHsvToRgba(hsv: HSVColor, a: number = 1): string {
  const hsvToRgb = ({ h, s, v }: HSVColor): [number, number, number] => {
    s = s / 100;
    v = v / 100;

    let r = 0,
      g = 0,
      b = 0;

    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - s * f);
    const t = v * (1 - s * (1 - f));

    switch (i % 6) {
      case 0:
        [r, g, b] = [v, t, p];
        break;
      case 1:
        [r, g, b] = [q, v, p];
        break;
      case 2:
        [r, g, b] = [p, v, t];
        break;
      case 3:
        [r, g, b] = [p, q, v];
        break;
      case 4:
        [r, g, b] = [t, p, v];
        break;
      case 5:
        [r, g, b] = [v, p, q];
        break;
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  };
  const [r, g, b] = hsvToRgb(hsv);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}