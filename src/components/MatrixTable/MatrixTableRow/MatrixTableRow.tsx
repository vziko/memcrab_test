import styles from './MatrixTableRow.module.scss'
import { TableCell } from "components/ui/tableCell/TableCell.tsx";
import { TableCellType } from "enums";
import type { MatrixTableCellTypes } from "types";
import { useMemo, useState } from "react";
import { useMatrix } from "context/MatrixContext.tsx";
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

    const {
        data: {
            amountList,
        },
        method: {
            removeRow,
            incrementCellAmount,
            createAmountList
        }
    } = useMatrix();

    const sum = useMemo(() => {
        return matrixRow.reduce((acc, cur) => acc + cur.amount, 0);
    }, [matrixRow]);


    return (
        <tr className={styles.tableRow}>
            <TableCell type={TableCellType.TH}>
                Cell Value M = {rowIndex + 1}
            </TableCell>
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
            <TableCell
                type={TableCellType.TD}
                onMouseEnter={() => setIsPercent(true)}
                onMouseLeave={() => setIsPercent(false)}
            >
                {sum}
            </TableCell>
            <TableCell type={TableCellType.TD}>
                <button
                    className={styles.removeRow}
                    onClick={() => removeRow(rowIndex)}
                >
                    <IconRemove/>
                </button>
            </TableCell>
        </tr>
    )
}