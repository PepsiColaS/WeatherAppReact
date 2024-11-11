import styles from '../app.module.scss'
import search from '../assets/search.png'
import Hot from '../assets/Hot.png'
import Cold from '../assets/Cold.png'
import Humadity from '../assets/Humadity.png'
import Wind from '../assets/Wind.png'
import cloud from '../assets/Cloudy.png'
import arrow from '../assets/arrow.png'
import TimeDetails from './TimeDetails.jsx'
import dataPlace from '../myFunctions/GeoUnCoding.js'
import DayDetails from './DayDetails.jsx'
import { useState, useEffect } from 'react';

import rain from '../assets/Rain.png'
import sleet from '../assets/Sleet.png'
import thunder from '../assets/Thunder.png'
import sun from '../assets/Sun.png'

function RightBar({ onClick }){
    const [texts, setTexts] = useState(['','','','','', '', ''])
    const [objTempTime, setobjTempTime] = useState(['','','','',''])
    const [step, setStep] = useState(15)

    useEffect(() => {
        async function fetchPosts() {
            changePlace()
            move()
        }
        fetchPosts();
    }, []);

    async function changePlace() {
        let place
        if (document.getElementById('findPlace').value == ''){
            place = 'Москва'
        }
        else{
            place = document.getElementById('findPlace').value.trim()
        }
        const data = await dataPlace(place)
        move()
        if (data){
            place = data.place
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const [datePart, timePart] = data.time.split("T")
            const date = new Date(datePart)
            const dayOfWeekIndex = date.getDay()
            const dayOfWeekName = daysOfWeek[dayOfWeekIndex]
            const [year, month, day] = datePart.split("-");
            const code = data.code
        
            const tempNow = data.tempNow
            setTexts([data.maxTemp, data.minTemp, data.tempNow, data.humadity, data.wind])
            onClick(place, tempNow, timePart, months[month], day, dayOfWeekName)
        }
        else{
            document.getElementById('findPlace').value = ''
            alert('Ошибка поиска')
        }
    };

    function moveLeft(){
        if (step != 0) { move(-5) }  
    }

    function moveRight(){
        if (step < 20) { move(5) }
    }

    async function move(value = 0) {
        let arrayObj = [];
        let place = document.getElementById('findPlace').value.trim();
        if (place === '') { place = 'Москва' }
        const data = await dataPlace(place)
        const code = data.code
        const newStep = step + value
        setStep(newStep);
            const sunCodes = [0]
            const cloudCodes = [1, 2, 3, 45, 48, 51, 53, 55, 56, 57];
            const rainCodes = [61, 63, 65, 66, 67, 80, 81, 82];
            const sleetCodes = [71, 73, 75, 77, 85, 86];
            const thunderCodes = [96, 99];
            let pict;

        for (let i = newStep; i < newStep + 5; i++) { 
            if (cloudCodes.includes(code[i])) {
                pict = cloud;
            } else if (rainCodes.includes(code[i])) {
                pict = rain;
            } else if (sleetCodes.includes(code[i])) {
                pict = sleet;
            } else if (thunderCodes.includes(code[i])) {
                pict = thunder;
            } else if(sunCodes.includes(code[i])) {
                pict = sun
            }    
            const obj = {
                time: data.allTime[i],
                temperature: data.allWeather[i],
                objPict: pict
            }
            arrayObj.push(obj)            
        }
        setobjTempTime(arrayObj);
    }

    return (
        <div className={styles.rightBarContent}>
            <div className={styles.search}>
                <textarea placeholder='Search Location' id='findPlace'></textarea>
                <img src={search} className={styles.searchImg} onClick={changePlace} alt="search" />
            </div>
            <h3 className={styles.weatherDetails}>Weather Details.....</h3>
                <DayDetails title = 'Temp max' value = {texts[0] + '°'} photo = {Hot} styleName = 'tempImg' />
                <DayDetails title = 'Temp min' value = {texts[1] + '°'} photo = {Cold} styleName = 'tempImg' />
                <DayDetails title = 'Humadity' value = {texts[3]} photo = {Humadity} styleName = 'humadityImg' />
                <DayDetails title = 'Cloudy' value = {texts[2] + '%'} photo = {cloud} styleName = 'cloudImg' />
                <DayDetails title = 'Wind' value = {texts[4] + 'km/h'} photo = {Wind} styleName = 'windImg' />        
            <div className={styles.timeBlock}>
                <img src={arrow} id='left' className={`${styles.arrow} ${styles.firstArrow}`} onClick={moveLeft} alt="img" />
                <TimeDetails time = {objTempTime[0].time} temperature1={objTempTime[0].temperature} pict = {objTempTime[0].objPict}/>
                <TimeDetails time = {objTempTime[1].time} temperature1={objTempTime[1].temperature} pict = {objTempTime[1].objPict}/>
                <TimeDetails time = {objTempTime[2].time} temperature1={objTempTime[2].temperature} pict = {objTempTime[2].objPict}/>
                <TimeDetails time = {objTempTime[3].time} temperature1={objTempTime[3].temperature} pict = {objTempTime[3].objPict}/>
                <TimeDetails time = {objTempTime[4].time} temperature1={objTempTime[4].temperature} pict = {objTempTime[4].objPict}/>              
                <img src={arrow} id='right' className={`${styles.arrow} ${styles.secondArrow}`} onClick={moveRight} alt="img" />
            </div>
        </div>
    )
}

export default RightBar