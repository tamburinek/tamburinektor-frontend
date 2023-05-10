import styles from "./AnswerEntity.module.scss"
import {useEffect} from "react";

export const AnswerEntity = (props) => {

    useEffect(() => {
        console.log(props.anonymous)
    },[])

    return(
        <div className={styles.main}>
            {props.anonymous === false && <span>{props.user}</span>}
            <span>{props.text}</span>
        </div>
    )
}