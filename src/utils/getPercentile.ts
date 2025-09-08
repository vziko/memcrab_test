export const getPercentile = (arr: number[], percent: number): number => {
    if (arr.length === 0) return 0;

    const sortedArr = [...arr].sort((a, b) => a - b);
    const index = (percent / 100) * (sortedArr.length - 1);

    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const fraction = index - lower;

    if (upper >= sortedArr.length) return sortedArr[lower];

    const result = sortedArr[lower] + (sortedArr[upper] - sortedArr[lower]) * fraction
    return Number(result.toFixed(2));
}