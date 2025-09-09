import type { ComponentProps } from "react";
import style from './TableCell.module.scss';
import { TableCellType } from "enums";

interface TableCellProps extends ComponentProps<'td'> {
    type: TableCellType;
}

export const TableCell = (props: TableCellProps) => {
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