import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import styles from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button = ({className, ...restProps}: DefaultButtonPropsType) => {

    const finalClassName = `${styles.button} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}