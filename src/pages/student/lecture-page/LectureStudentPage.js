import styles from './LectureStudentPage.module.scss'
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import logo from "../../../assets/png/logo.png";
import LectureApi from "../../../services/lectureApi";
import {LectureEntity} from "../../teacher/lecture-page/lecture-entity/LectureEntity";
import {DefinitionEntity} from "../../teacher/lecture-page/lecture-entities/definition-entity/DefinitionEntity";
import {ImageEntity} from "../../teacher/lecture-page/lecture-entities/image-entity/ImageEntity";
import {QuestionEntity} from "../../teacher/lecture-page/lecture-entities/question-entity/QuestionEntity";
import {TaskEntity} from "../../teacher/lecture-page/lecture-entities/task-entity/TaskEntity";
import {TaskEntityStudent} from "./task-entity/TaskEntityStudent";
import {QuestionEntityStudent} from "./question-entity/QuestionEntityStudent";

export const LectureStudentPage = () => {

    //methods for location
    const location = useLocation();
    const params = new URLSearchParams(location.search)

    const [lectureDescription, setLectureDescription] = useState("")
    const [active, setActive] = useState(false)
    const [lectureEntities, setLectureEntities] = useState([])
    const [currentEntity, setCurrentEntity] = useState({})

    const [fetched, setFetched] = useState(false)

    let listItems = lectureEntities.filter(item => item).map(item => {
        return <LectureEntity key={item.id} id={item.id} current={currentEntity.id} onClick={() => setCurrentEntity(item)} type={item.lectureType}/>
    })


    useEffect(()=> {
        LectureApi.getLectureById(params.get("id")).then(res => {
            setLectureEntities(res.data.lectureEntities)
            setLectureDescription(res.data.description)
            console.log(res.data)
            LectureApi.isActive(params.get("id")).then(res => {
                setActive(res.data)
                setFetched(true)
            })
        })
    },[])

    useEffect(() => {
        if (fetched === false) {
            return
        }
        setCurrentEntity(lectureEntities[0])
    },[fetched])

    useEffect(() => {
        if (active === true && fetched === true){
            const interval = setInterval(() => {
                LectureApi.getActiveItem(params.get("id")).then((res) => {
                    if (res.data !== ""){
                        setCurrentEntity({id: res.data.id, lectureType:res.data.type.toLowerCase()})
                    }
                })
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [active, fetched]);

    return (
        <div className={styles.main}>
            <Link to={'/dashboard'}><img className={styles.logo} src={logo} alt={'logo'}/> </Link>
            <div className={styles.sidebar}>
                {fetched === true && active === false && <span className={styles.span}>Plán lekce</span>}
                <div className={styles.allItems}>
                    {fetched === true && active === false && listItems}
                </div>
            </div>
            <div className={styles.lecture}>
                <div className={styles.lectureDescription}>
                    {lectureDescription}
                </div>
                <div className={styles.lectureItem}>
                    {fetched === true && currentEntity.lectureType === "definition" && <DefinitionEntity key={currentEntity.id} id={currentEntity.id}/>}
                    {fetched === true && currentEntity.lectureType === "image" && <ImageEntity key={currentEntity.id} id={currentEntity.id}/>}
                    {fetched === true && active === false && currentEntity.lectureType === "question" && <QuestionEntity key={currentEntity.id} id={currentEntity.id}/>}
                    {fetched === true && active === false && currentEntity.lectureType === "task" && <TaskEntity key={currentEntity.id} id={currentEntity.id}/>}

                    {fetched === true && active === true && currentEntity.lectureType === "question" && <QuestionEntityStudent key={currentEntity.id} id={currentEntity.id}/>}
                    {fetched === true && active === true && currentEntity.lectureType === "task" && <TaskEntityStudent key={currentEntity.id} id={currentEntity.id}/>}
                </div>
            </div>
        </div>
    )
}