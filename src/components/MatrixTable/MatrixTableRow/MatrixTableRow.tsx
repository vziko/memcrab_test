import styles from './MatrixTableRow.module.scss'
import { TableCell } from "components/ui/tableCell/TableCell.tsx";
import { TableCellType } from "enums";
import type { MatrixTableCellTypes } from "types";
import { useCallback, useMemo, useState } from "react";
import { useMatrixTable, useMatrixMethod } from "context/MatrixContext.tsx";
import IconRemove from 'assets/icons/remove.svg?react';
import { RowItem } from "components/MatrixTable/MatrixTableRow/RowItem/RowItem.tsx";

interface MatrixTableRowProps {
    matrixRow: MatrixTableCellTypes[];
    rowIndex: number;
    rowTitle?: string;
}

export const MatrixTableRow = (props: MatrixTableRowProps) => {
    const { matrixRow, rowIndex} = props;
    const [isPercent, setIsPercent] = useState<boolean>(false);

    const { amountList, createAmountList } = useMatrixTable()
    const { removeRow, incrementCellAmount } = useMatrixMethod()

    const sum = useMemo(() => {
        return matrixRow.reduce((acc, cur) => acc + cur.amount, 0);
    }, [matrixRow]);

    const handleSumMouseEnter = useCallback(() => {
        setIsPercent(true);
    }, []);

    const handleSumMouseLeave = useCallback(() => {
        setIsPercent(false);
    }, []);

    const handleRemoveRow = useCallback(() => {
        removeRow(rowIndex);
    }, [removeRow, rowIndex]);

    const BeforeRow = useMemo(() => (
        <TableCell type={TableCellType.TH}>
            Cell Value M = {rowIndex + 1}
        </TableCell>
    ), []);

    const AfterRow = useMemo(() => (
        <>
            <TableCell
                type={TableCellType.TD}
                onMouseEnter={handleSumMouseEnter}
                onMouseLeave={handleSumMouseLeave}
            >
                {sum}
            </TableCell>
            <TableCell type={TableCellType.TD}>
                <button
                    className={styles.removeRow}
                    onClick={handleRemoveRow}
                >
                    <IconRemove/>
                </button>
            </TableCell>
        </>
    ), [handleRemoveRow, handleSumMouseEnter, handleSumMouseLeave, sum]);

    return (
        <tr className={styles.tableRow}>
            {BeforeRow}
            {matrixRow.map((cell, index) =>
                <RowItem
                    key={cell.id}
                    cell={cell}
                    index={index}
                    isPercent={isPercent}
                    sum={sum}
                    rowIndex={rowIndex}
                    amountList={amountList}
                    incrementCellAmount={incrementCellAmount}
                    createAmountList={createAmountList}
                />
            )}
            {AfterRow}
        </tr>
    )
}