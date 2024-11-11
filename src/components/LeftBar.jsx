import logo from '../assets/logo.png'
import cloud from '../assets/Cloudy.png'
import styles from '../app.module.scss'

function LeftBar( {place} ){
    return(
        <div className={styles.leftBlockContent}>
           <img src={logo} className={styles.logo} alt="logo"/>
            <div className={styles.leftBot}>
                <h2 className={styles.temp}>{place[1]}°</h2>
                <div className={styles.textBlock}>
                    <h2 className={styles.place}>{place[0]}</h2>
                    <h2 className={styles.date}>{place[5]}, {place[3]} `{place[4]}</h2>
                </div>
                {/* <img src={cloud} className={styles.cloud} alt="cloud" /> */}
            </div>
        </div>
    )  
}

export default LeftBar