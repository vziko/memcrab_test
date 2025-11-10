import { createContext, type ReactNode, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { FrmValues, MatrixTableCellTypes } from "types";
import { getRandom } from "utils";

interface MatrixContextDataTableType {
    matrix: MatrixTableCellTypes[][];
    amountList: MatrixTableCellTypes[];
    createAmountList: (cell:  MatrixTableCellTypes | null) => void;
}

interface MatrixContextDataFormType {
    MIN_CEL_COUNT: number;
    MAX_CEL_COUNT: number;
    amount: FrmValues;
    rows: FrmValues;
    cols: FrmValues;
    generateMatrix: () => void;
}

interface MatrixContextMethodType {
    addRow: () => void;
    removeRow: (rowIndex: number) => void;
    incrementCellAmount: (rowIndex: number, collIndex: number) => void;
    setAmount: (amount: FrmValues) => void;
    setRows: (rows: FrmValues) => void;
    setCols: (cols: FrmValues) => void;
}

const MatrixContextDataTable = createContext<MatrixContextDataTableType | undefined>(undefined);
const MatrixContextDataForm = createContext<MatrixContextDataFormType | undefined>(undefined);
const MatrixContextMethod = createContext<MatrixContextMethodType | undefined>(undefined);

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

    const generateMatrix = useCallback(() => {
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
    }, [rows, cols, MIN_CEL_COUNT, MAX_CEL_COUNT]);

    const addRow = useCallback(() => {
        const newRowMatrix: MatrixTableCellTypes[] = [];
        matrix[0].forEach(() => {
            newRowMatrix.push({
                id: nextCellId.current++,
                amount: getRandom(MIN_CEL_COUNT, MAX_CEL_COUNT),
            });
        })
        setMatrix((prevMatrix) => [...prevMatrix, newRowMatrix]);
    }, []);

    const removeRow = useCallback((rowIndex: number) => {
        setMatrix((prevMatrix) => prevMatrix.filter((_, index) => index !== rowIndex));
    }, []);

    const incrementCellAmount = useCallback((rowIndex: number, colIndex: number) => {
        setMatrix((prevMatrix) => {
            return prevMatrix.map((row, rIndex) => {
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
        });
    }, []);

    const allCells = useMemo(() => matrix.flat(), [matrix]);

    const createAmountList = useCallback((cellMatrix: MatrixTableCellTypes | null) => {
        if(!cellMatrix || !amount) {
            setAmountList((prevAmounts) => prevAmounts.length > 0 ? [] : prevAmounts);
        } else {
            const newMatrix: (MatrixTableCellTypes & {diff: number})[] = [];
            allCells.forEach((cell) => {
                if(cell.id !== cellMatrix.id) {
                    newMatrix.push({
                        ...cell,
                        diff:  Math.abs(cellMatrix.amount - cell.amount)
                    })
                }
            })

            newMatrix.sort((a, b) => a.diff - b.diff);
            setAmountList(newMatrix.slice(0, amount));
        }
    }, [allCells, amount])

    const dataTable = useMemo(() => ({
        matrix,
        amountList,
        createAmountList
    }), [
        matrix,
        amountList,
        createAmountList
        ]
    );

    const dataForm = useMemo(() => ({
            MIN_CEL_COUNT,
            MAX_CEL_COUNT,
            amount,
            rows,
            cols,
            generateMatrix,
        }), [
            MIN_CEL_COUNT,
            MAX_CEL_COUNT,
            amount,
            rows,
            cols,
            generateMatrix,
        ]
    );

    const method = useMemo(
        () => ({
            addRow,
            removeRow,
            incrementCellAmount,
            setAmount,
            setRows,
            setCols,
    }), [
        addRow,
        removeRow,
        incrementCellAmount,
        setAmount,
        setRows,
        setCols,
    ]);

    return (
        <MatrixContextDataTable.Provider value={dataTable}>
            <MatrixContextDataForm.Provider value={dataForm}>
                <MatrixContextMethod.Provider value={method}>
                    {children}
                </MatrixContextMethod.Provider>
            </MatrixContextDataForm.Provider>
        </MatrixContextDataTable.Provider>
    );
};

export const useMatrixTable = () => {
    const context = useContext(MatrixContextDataTable);
    if (context === undefined) {
        throw new Error('useMatrix must be used within a MatrixProvider');
    }
    return context;
};

export const useMatrixForm = () => {
    const context = useContext(MatrixContextDataForm);
    if (context === undefined) {
        throw new Error('useMatrix must be used within a MatrixProvider');
    }
    return context;
};

export const useMatrixMethod = () => {
    const context = useContext(MatrixContextMethod);
    if (context === undefined) {
        throw new Error('useMatrix must be used within a MatrixProvider');
    }
    return context;
};