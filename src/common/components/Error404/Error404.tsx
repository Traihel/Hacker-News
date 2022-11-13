import React from "react";
import styles from "./Error404.module.scss"
import {SvgSelector} from '../SvgSelector/SvgSelector';
import {Button} from "../Button/Button";
import {useHistory} from 'react-router-dom';

export const Error404 = () => {

    const history = useHistory();

    const onClickHandler = () => history.push('/newStories')

    return <div className={styles.errorComponent}>
        <SvgSelector name={'error404'} className={styles.svg}/>
        <h2 className={styles.title}>Page not found</h2>
        <Button
            onClick={onClickHandler}
            className={styles.button}
        >
            Back home
        </Button>
    </div>
}