import type { CSSProperties } from "react";

export const getCellPercent = (num: number, sum: number): number => {
    const result = num / sum * 100;
    return Number(result.toFixed(2));
}

export const getCellPercentBg = (p: number): CSSProperties => {
    let red: number = 255;
    let green: number = 255;

    if((p <= 50)) {
        green = Math.round(p / 50 * 255);
    } else if (p >= 50) {
        red = Math.round(255 - ((p - 50) / 50 * 255));
    }

    return {background: `rgb(${red}, ${green}, 0)`};
}