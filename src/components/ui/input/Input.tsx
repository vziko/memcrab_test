import type { ChangeEvent, ComponentProps } from "react";
import styles from "./Input.module.scss";

interface InputProps extends ComponentProps<'input'> {
    name: string;
    label?: string;
    isError?: boolean;
    description?: string;
    inputChange: (value: string) => void;
}

export const Input = (props: InputProps) => {
    const {
        name,
        label,
        inputChange,
        description,
        isError,
        className = '',
        ...rest
    } = props;

    const inputId = `input-id-${name}`;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        inputChange(e.target.value);
    }

    const classElement = `${styles.inputItem} ${className} ${isError ? styles.error : ''}`;

    return (
        <div className={classElement}>
            {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
            <input
                id={inputId}
                className={styles.input}
                name={name}
                onChange={handleChange}
                {...rest}
            />
            {description && <div className={styles.description}>{description}</div>}
        </div>
    )
}