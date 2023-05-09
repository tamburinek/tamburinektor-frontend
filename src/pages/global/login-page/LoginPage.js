import computer from "../../../assets/png/computer.png";
import {LoginSection} from "./login-section/LoginSection";
import styles from './LoginPage.module.scss'

export const LoginPage = () => {

    return (
        <div>
            <div className={styles.dot}/>
            <div className={styles.main}>
                <LoginSection/>
                <div className={styles.right}>
                    <img className={styles.computer} src={computer} alt={"computer"}/>
                </div>
            </div>
        </div>
    )
}