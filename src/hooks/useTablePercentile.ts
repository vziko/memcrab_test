import { getPercentile } from "utils";
import type { MatrixTableCellTypes } from "types/matrixTable.ts";

export const useTablePercentile = (matrix: MatrixTableCellTypes[][]) : {
    percentalList: number[]
    totalPercental: number;
} => {
    const percentalList = matrix[0].map((_, index) => {
        return getPercentile(
            matrix.map((row) => row[index].amount),
            60
        )
    });

    const totalPercental = Number(percentalList.reduce((acc, cur) => acc + cur, 0).toFixed(2));

    return {
        percentalList,
        totalPercental
    }
}