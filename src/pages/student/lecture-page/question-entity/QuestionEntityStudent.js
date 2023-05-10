import styles from "./QuestionEntityStudent.module.scss"
import {useEffect, useState} from "react";
import MaterialsListApi from "../../../../services/materialsListApi";
import QuestionAnswer from "../../../../services/questionAnswer";

export const QuestionEntityStudent = (props) => {

    const [entity, setEntity] = useState({})
    const [input, setInput] = useState("")

    useEffect(() => {
        MaterialsListApi.getQuestionById(props.id).then(res => {
            console.log(res.data)
            setEntity(res.data)
        })
    },[])

    let confirm = () => {
        if (input.trim() === ""){
            return
        }
        QuestionAnswer.createAnswer(props.id, input).then((res) => {
            console.log(res.data)
        })
        setInput("")
    }

    return(
        <div className={styles.main}>
            <div className={styles.description}>
                {entity.questionText}
            </div>
            <div className={styles.input}>
                <input onChange={(e) => setInput(e.target.value)}
                       value={input} className={styles.add} placeholder={"Vlož svoji odpověď"}/>
                <button onClick={confirm} className={styles.button}>Odpovědět</button>
            </div>
        </div>
    )
}