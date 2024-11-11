export async function DataApi(latitude, longitude, place){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,precipitation,cloud_cover,wind_speed_10m&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Europe%2FMoscow`

    const responce = await fetch (url)
    const data = await responce.json()
    console.log(data)

        const returnObj = {
            time: data.current.time, // Время сейчас форма: '2024-10-16T01:30'
            cloud: data.current.cloud_cover, // Облачность сейчас в %
            wind: data.current.wind_speed_10m, // Скорость ветра сейчас км в час
            humadity: data.current.precipitation, // Осадки сейчас
            tempNow: data.current.temperature_2m, // Температура сейчас
            maxTemp: Math.max(...data.daily.temperature_2m_max), // Макс темпа за день
            minTemp: Math.min(...data.daily.temperature_2m_min),// Мин темпа за день
            place: place,
            allTime: data.hourly.time,
            allWeather: data.hourly.temperature_2m,
            code: data.hourly.weather_code 
        }
        return(returnObj)
}

// export default DataApi