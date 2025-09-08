import type { ComponentProps } from "react";
import style from './MatrixTableCell.module.scss';
import { TableCellType } from "enums";

interface MatrixTableCellProps extends ComponentProps<'td'> {
    type: TableCellType;
}

export const MatrixTableCell = (props: MatrixTableCellProps) => {
    const {
        type,
        children,
        className = '',
        ...res
    } = props;

    const cellAttributes = {
        className: `${style.tableCell} ${className}`,
        ...res
    }

    if (type === TableCellType.TH) {
        return (
            <th {...cellAttributes}>
                {children}
            </th>
        )
    }

    return (
        <td {...cellAttributes}>
            {children}
        </td>
    )
}