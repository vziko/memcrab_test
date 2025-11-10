import { type ComponentProps, memo, type ReactNode } from "react";
import styles from './Button.module.scss'

interface ButtonProps extends ComponentProps<'button'> {
    children: ReactNode;
}

export const Button = memo<ButtonProps>((props) => {
    const {
        children,
        className = '',
        ...res
    } = props;

    const classComponent = `${styles.button} ${className}`;

    return (
        <button className={classComponent} {...res}>
            {children}
        </button>
    )
})