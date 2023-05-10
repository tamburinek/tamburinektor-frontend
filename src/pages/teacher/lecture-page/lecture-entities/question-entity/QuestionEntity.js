import styles from "./QuestionEntity.module.scss"
import {useEffect, useState} from "react";
import MaterialsListApi from "../../../../../services/materialsListApi";
import QuestionAnswer from "../../../../../services/questionAnswer";
import {LectureEntity} from "../../lecture-entity/LectureEntity";
import {AnswerEntity} from "./answer-entity/AnswerEntity";

export const QuestionEntity = (props) => {

    const [entity, setEntity] = useState({})
    const [answers, setAnswers] = useState([])
    const [fetched, setFetched] = useState(false)
    const [anonymous, setAnonymous] = useState(false)

    let listAnswers = answers.map(item => {
        return <AnswerEntity key={item.id} id={item.id} text={item.answer} user={item.user} anonymous={anonymous}/>
    })

    useEffect(() => {
        MaterialsListApi.getQuestionById(props.id).then(res => {
            setAnonymous(res.data.anonymous)
            setEntity(res.data)
        })
    },[])


    useEffect(() => {
        const interval = setInterval(() => {
            QuestionAnswer.getAllAnswers(props.id).then((res) => {
                setAnswers(res.data)
                if (fetched === true){
                    setFetched(false)
                }else {
                    setFetched(true)
                }
            })
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return(
        <div className={styles.main}>
            <div className={styles.description}>
                {entity.questionText}
            </div>
            <div className={styles.answers} autoFocus={fetched}>
                {listAnswers}
            </div>
        </div>
    )
}