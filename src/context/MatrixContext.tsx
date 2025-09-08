import { createContext, type ReactNode, useContext, useRef, useState } from "react";
import type { FrmValues, MatrixTableCellTypes } from "types";
import { getRandom } from "utils";

interface MatrixContextType {
    data: {
        MIN_CEL_COUNT: number;
        MAX_CEL_COUNT: number;
        matrix: MatrixTableCellTypes[][];
        amount: FrmValues;
        amountList: MatrixTableCellTypes[];
        rows: FrmValues;
        cols: FrmValues;
    }
    method: {
        generateMatrix: () => void;
        addRow: () => void;
        removeRow: (rowIndex: number) => void;
        incrementCellAmount: (rowIndex: number, collIndex: number) => void;
        createAmountList: (cell:  MatrixTableCellTypes | null) => void;
        setAmount: (amount: FrmValues) => void;
        setRows: (rows: FrmValues) => void;
        setCols: (cols: FrmValues) => void;
    }
}

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

interface MatrixProviderProps {
    children: ReactNode;
}

const [MIN_CEL_COUNT, MAX_CEL_COUNT] = [10, 999];

export const MatrixProvider = ({ children }: MatrixProviderProps) => {
    const [matrix, setMatrix] = useState<MatrixTableCellTypes[][]>([]);
    const [rows, setRows] = useState<FrmValues>(null);
    const [cols, setCols] = useState<FrmValues>(null);
    const [amount, setAmount] = useState<FrmValues>(null);
    const [amountList, setAmountList] = useState<MatrixTableCellTypes[]>([]);
    const nextCellId = useRef<number>(0);

    const generateMatrix = () => {
        const newMatrix: MatrixTableCellTypes[][] = [];

        for (let i = 0; i < (rows ? rows : 0); i++) {
            newMatrix.push([]);
            for (let j = 0; j < (cols ? cols : 0); j++) {
                newMatrix[i].push({
                    id: nextCellId.current++,
                    amount: getRandom(MIN_CEL_COUNT, MAX_CEL_COUNT),
                });
            }
        }

        setMatrix(newMatrix);
    };

    const addRow = () => {
        const newRowMatrix: MatrixTableCellTypes[] = [];
        matrix[0].forEach(() => {
            newRowMatrix.push({
                id: nextCellId.current++,
                amount: getRandom(MIN_CEL_COUNT, MAX_CEL_COUNT),
            });
        })
        setMatrix([...matrix, newRowMatrix]);
    };

    const removeRow = (rowIndex: number) => {
        setMatrix(matrix.filter((_, index) => index !== rowIndex));
    };

    const incrementCellAmount = (rowIndex: number, colIndex: number) => {
        const newMatrix = matrix.map((row, rIndex) => {
            if (rIndex !== rowIndex) {
                return row;
            }
            return row.map((cell, cIndex) => {
                if (cIndex !== colIndex) {
                    return cell;
                }
                return {
                    ...cell,
                    amount: cell.amount + 1
                };
            });
        });
        setMatrix(newMatrix);
    };

    const createAmountList = (cellMatrix: MatrixTableCellTypes | null) => {
        if(!cellMatrix || !amount) {
            setAmountList([])
        } else {
            const allCells = matrix.flat();
            const otherCells = allCells.filter(c => c.id !== cellMatrix.id);
            otherCells.sort((a, b) => {
                const aNew = Math.abs(cellMatrix.amount - a.amount);
                const bNew = Math.abs(cellMatrix.amount - b.amount);
                return aNew - bNew;
            });
            setAmountList(otherCells.slice(0, amount));
        }
    }

    const value = {
        data: {
            MIN_CEL_COUNT,
            MAX_CEL_COUNT,
            matrix,
            amount,
            amountList,
            rows,
            cols,
        },
        method: {
            generateMatrix,
            addRow,
            removeRow,
            incrementCellAmount,
            createAmountList,
            setAmount,
            setRows,
            setCols,
        }
    };

    return (
        <MatrixContext.Provider value={value}>
            {children}
        </MatrixContext.Provider>
    );
};

export const useMatrix = () => {
    const context = useContext(MatrixContext);
    if (context === undefined) {
        throw new Error('useMatrix must be used within a MatrixProvider');
    }
    return context;
};