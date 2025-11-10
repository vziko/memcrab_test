import { useCallback, useEffect, useState } from "react";
import styles from './FormArguments.module.scss';
import { Input } from "components/ui/input/Input.tsx";
import { Button } from "components/ui/button/Button.tsx";
import { useMatrixForm, useMatrixMethod } from "context/MatrixContext.tsx";

export const FormArguments = () => {
    const [isErrorRow, setIsErrorRow] = useState<boolean>(false);
    const [isErrorColl, setIsErrorColl] = useState<boolean>(false);

    const MIN_COUNT: number = 0;
    const MAX_COUNT: number = 100;

    const {
        MIN_CEL_COUNT,
        MAX_CEL_COUNT,
        amount,
        rows,
        cols,
        generateMatrix
    } = useMatrixForm();
    const {
        setAmount,
        setRows,
        setCols,
    } = useMatrixMethod();

    const handleChangeRows = useCallback((value: string) => {
        setRows(value === '' ? null : +value)
    }, [setRows])

    const handleChangeCols = useCallback((value: string) => {
        setCols(value === '' ? null : +value)
    }, [setCols])

    const handleAmountChange = useCallback((value: string): void => {
        setAmount(value === '' ? null : +value);
    }, [setAmount])

    const handleSubmit = useCallback((): void => {
        const checkRows = rows !== null && rows >= MIN_COUNT && rows <= MAX_COUNT;
        const checkCols = cols !== null && cols >= MIN_COUNT && cols <= MAX_COUNT;

        if(checkRows && checkCols) {
            generateMatrix();
        }

        setIsErrorRow(!checkRows);
        setIsErrorColl(!checkCols);
    }, [rows, cols, MIN_COUNT, MAX_COUNT])

    useEffect(() => {
        if (rows === null || cols === null) {
            return;
        }

        const maxAmount = rows * cols;
        if (amount !== null && amount > maxAmount) {
            setAmount(maxAmount);
        }
    }, [rows, cols, amount]);

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
                        inputChange={handleChangeRows}
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
                        inputChange={handleChangeCols}
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
                        inputChange={handleAmountChange}
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