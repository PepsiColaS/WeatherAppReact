import styles from '../app.module.scss'

export function Details({time = 'T', temperature1 = 0, pict}){
    const [datePart, timePart] = time.split("T") 
    return (
        <span className={styles.detailsComponent}>
            <h4 className={styles.time}>{timePart}</h4>
            <img className={styles.white} src={pict} alt="cold" />
            <h4>{temperature1}°</h4>
        </span>
    )
}

export default Details