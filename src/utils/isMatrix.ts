import type { MatrixTableCellTypes } from "types";

export const isMatrix = (matrix: MatrixTableCellTypes[][]) => {
    return matrix && matrix.length > 0 && matrix.some(row => row.length > 0);
}