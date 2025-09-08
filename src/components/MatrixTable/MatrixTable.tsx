import styles from './MatrixTable.module.scss';
import { MatrixTableRow } from "./MatrixTableRow/MatrixTableRow.tsx";
import { MatrixTableCell } from "./MatrixTableCell/MatrixTableCell.tsx";
import { useMatrix } from "context/MatrixContext.tsx";
import { TableCellType } from "enums";
import { useTablePercentile } from "hooks";
import { isMatrix } from "utils/isMatrix.ts";
import IconPlus from 'assets/icons/plus.svg?react';

export const MatrixTable = () => {
    const {
        data: {
            matrix
        },
        method: {
            addRow
        }
    } = useMatrix();

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
                        <MatrixTableCell type={TableCellType.TH} />
                        {matrix[0].map((cell, index) => (
                            <MatrixTableCell key={cell.id} type={TableCellType.TH}>
                                Cell values N = {index + 1}
                            </MatrixTableCell>
                        ))}
                        <MatrixTableCell type={TableCellType.TH}>
                            Sum Values
                        </MatrixTableCell>
                        <MatrixTableCell type={TableCellType.TH}>
                            Actions
                        </MatrixTableCell>
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
                        <MatrixTableCell type={TableCellType.TH}>
                            60th percentile
                        </MatrixTableCell>
                        {percentalList.map((value, index) => (
                            <MatrixTableCell key={index} type={TableCellType.TD}>
                                {value}
                            </MatrixTableCell>
                        ))}
                        <MatrixTableCell type={TableCellType.TD}>
                            {totalPercental}
                        </MatrixTableCell>
                        <MatrixTableCell type={TableCellType.TD}>
                            <button
                                title="Add new row"
                                className={styles.addRow}
                                onClick={addRow}
                            >
                                <IconPlus />
                            </button>
                        </MatrixTableCell>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}