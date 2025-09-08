import { useEffect, useState } from "react";
import styles from './FormArguments.module.scss';
import { Input } from "components/ui/input/Input.tsx";
import { Button } from "components/ui/button/Button.tsx";
import { useMatrix } from "context/MatrixContext.tsx";
import type { FrmValues } from "types";

export const FormArguments = () => {
    const [isErrorRow, setIsErrorRow] = useState<boolean>(false);
    const [isErrorColl, setIsErrorColl] = useState<boolean>(false);

    const MIN_COUNT: number = 0;
    const MAX_COUNT: number = 100;

    const {
        data: {
            MIN_CEL_COUNT,
            MAX_CEL_COUNT,
            amount,
            rows,
            cols,
        },
        method: {
            generateMatrix,
            setAmount,
            setRows,
            setCols,
        }
    } = useMatrix();

    const handleChangeRowsCols = (value: string, setValue: (val: FrmValues) => void) => {
        setValue(value === '' ? null : +value)
    }

    const handleSubmit = (): void => {
        const checkRows = rows !== null && rows >= MIN_COUNT && rows <= MAX_COUNT;
        const checkCols = cols !== null && cols >= MIN_COUNT && cols <= MAX_COUNT;

        if(checkRows && checkCols) {
            /*if(amount !== null && amount > rows * cols) {
                setAmount(rows * cols)
            }*/
            generateMatrix();
        }

        setIsErrorRow(!checkRows);
        setIsErrorColl(!checkCols);
    }

    useEffect(() => {
        if (rows === null || cols === null) {
            return;
        }

        const maxAmount = rows * cols;
        if (amount !== null && amount > maxAmount) {
            setAmount(maxAmount);
        }
    }, [rows, cols, amount]);

    const handleAmountChange = (value: number | null): void => {
        setAmount(value);
    }

    return (
        <div className={styles.formArguments}>
            <div className={styles.container}>
                <div className={styles.form}>
                    <Input
                        name="rows"
                        type="number"
                        className={styles.formItem}
                        value={rows === null ? '' : rows}
                        isError={isErrorRow}
                        min={MIN_COUNT}
                        max={MAX_COUNT}
                        inputChange={(value) => handleChangeRowsCols(value, setRows)}
                        label="Number of rows (M)"
                        description="Enter the number of rows, from 0 to 100."
                        placeholder="e.g., 10"
                    />
                    <Input
                        name="cols"
                        type="number"
                        className={styles.formItem}
                        value={cols === null ? '' : cols}
                        isError={isErrorColl}
                        min={MIN_COUNT}
                        max={MAX_COUNT}
                        inputChange={(value) => handleChangeRowsCols(value, setCols)}
                        label="Number of columns (N)"
                        description="Enter the number of columns, from 0 to 100."
                        placeholder="e.g., 15"
                    />
                    <Button className={styles.submit} onClick={handleSubmit}>
                        Generate
                    </Button>
                </div>

                <div className={styles.amountContainer}>
                    <Input
                        name="amaunt"
                        type="number"
                        className={styles.amount}
                        value={amount === null ? '' : amount}
                        min={MIN_COUNT}
                        {...(rows !== null && cols !== null && {max: rows * cols})}
                        inputChange={(value) => handleAmountChange(value === '' ? null : +value)}
                        label="Highlight count (X)"
                        description="The number of nearest cells by value to highlight on hover."
                        placeholder="e.g., 5"
                    />
                    <p className={styles.description}>
                        Click "Create Table" to generate a matrix based on your
                        parameters. Each cell in the table will contain a random
                        number between <b>{MIN_CEL_COUNT}</b> and <b>{MAX_CEL_COUNT}</b>.
                    </p>
                </div>
            </div>
        </div>
    )
}