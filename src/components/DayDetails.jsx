import styles from '../app.module.scss'

function DayDetails({title, value, photo, styleName}){
    return (
        <div className={styles.flex}>
                <h4>{title}</h4>
                <span className={styles.gradus}>{value}</span>
                <img src={photo} className={styles[styleName]}  alt="Img" />
        </div>
    )
}

export default DayDetails