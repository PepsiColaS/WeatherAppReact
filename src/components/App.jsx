import styles from '../app.module.scss'
import LeftBar from './LeftBar'
import RightBar from './RightBar'
import { useState } from 'react';

function App() {

  const [place, setPlace] = useState(['', '']);
  const changePlace = (place, tempNow, time, month, day, dayOfWeekName) => {
    setPlace([place, tempNow, time, month, day, dayOfWeekName])
  } 

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.leftBar}>
          <LeftBar place={place}/>
        </div>

        <div className={styles.rightBar}>
          <RightBar onClick={changePlace}/>
        </div>
      </div>
    </>
  )
}

export default App
