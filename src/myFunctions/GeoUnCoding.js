import {DataApi} from './DataApi.js'

async function GeoUnCoding(place){
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${place}&count=1&language=ru&format=json`

    try{
        const response = await fetch (url)
        const jsonData = await response.json()
        const res = jsonData.results[0]
        const latitude = res.latitude
        const longitude = res.longitude
        const place = res.name
        return (DataApi(latitude, longitude, place))
    }
    catch{
        return (false)
    }
}

export default GeoUnCoding
