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

export function convertHsvToRgba({ h, s, v }: HSVColor, a: number = 1): string {
  const f = (n: number) => {
    const k = (n + h / 60) % 6;
    const p = v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return Math.round(255 * p);
  };
  return `rgba(${f(5)}, ${f(3)}, ${f(1)}, ${a})`;
}
