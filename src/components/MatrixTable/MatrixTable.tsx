import styles from './MatrixTable.module.scss';
import { MatrixTableRow } from "./MatrixTableRow/MatrixTableRow.tsx";
import { TableCell } from "components/ui/tableCell/TableCell.tsx";
import { useMatrixTable, useMatrixMethod } from "context/MatrixContext.tsx";
import { TableCellType } from "enums";
import { useTablePercentile } from "hooks";
import { isMatrix } from "utils";
import IconPlus from 'assets/icons/plus.svg?react';

export const MatrixTable = () => {
    const { matrix } = useMatrixTable();
    const { addRow } = useMatrixMethod();

    if(!isMatrix(matrix)) {
        return <p className={styles.noData}>not data</p>;
    }

    const {
        percentalList,
        totalPercental
    } = useTablePercentile(matrix);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <TableCell type={TableCellType.TH} />
                        {matrix[0].map((cell, index) => (
                            <TableCell key={cell.id} type={TableCellType.TH}>
                                Cell values N = {index + 1}
                            </TableCell>
                        ))}
                        <TableCell type={TableCellType.TH}>
                            Sum Values
                        </TableCell>
                        <TableCell type={TableCellType.TH}>
                            Actions
                        </TableCell>
                    </tr>
                </thead>
                <tbody>
                    {matrix.map((row, index) => (
                        <MatrixTableRow
                            key={row[0].id}
                            matrixRow={row}
                            rowIndex={index}
                        />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <TableCell type={TableCellType.TH}>
                            60th percentile
                        </TableCell>
                        {percentalList.map((value, index) => (
                            <TableCell key={index} type={TableCellType.TD}>
                                {value}
                            </TableCell>
                        ))}
                        <TableCell type={TableCellType.TD}>
                            {totalPercental}
                        </TableCell>
                        <TableCell type={TableCellType.TD}>
                            <button
                                title="Add new row"
                                className={styles.addRow}
                                onClick={addRow}
                            >
                                <IconPlus />
                            </button>
                        </TableCell>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}