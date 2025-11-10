import { memo, type ReactNode } from "react";
import styles from "components/MatrixTable/MatrixTableRow/MatrixTableRow.module.scss";
import type { MatrixTableCellTypes } from "types";
import { getCellPercent, getCellPercentBg } from "utils";
import { TableCell } from "components/ui/tableCell/TableCell.tsx";
import { TableCellType } from "enums";

interface RowItemProps {
    cell: MatrixTableCellTypes;
    index: number;
    rowIndex: number;
    isPercent: boolean;
    sum: number;
    amountList: MatrixTableCellTypes[];
    incrementCellAmount: (rowIndex: number, collIndex: number) => void;
    createAmountList: (cell:  MatrixTableCellTypes | null) => void;
}

export const RowItem = memo<RowItemProps>((props): ReactNode => {
    const {
        cell,
        index,
        rowIndex,
        isPercent,
        sum,
        amountList,
        incrementCellAmount,
        createAmountList
    } = props;

    const value = isPercent ?
        getCellPercent(cell.amount, sum) :
        cell.amount;

    const style = {
        cursor: "pointer",
        ...(isPercent && {...getCellPercentBg(value)}),
        ...(amountList.some(amountCell => amountCell.id === cell.id) && {background: '#3b79eb'}),
    }

    return (
        <TableCell
            key={index}
            className={styles.tableRowItem}
            type={TableCellType.TD}
            style={style}
            onClick={() => incrementCellAmount(rowIndex, index)}
            onMouseEnter={() => createAmountList(cell)}
            onMouseLeave={() => createAmountList(null)  }
        >
            {value}{isPercent && '%'}
        </TableCell>
    )
});