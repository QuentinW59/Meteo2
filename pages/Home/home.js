import {Text, View} from 'react-native';
import { s } from "./home.style";
import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { MeteoAPI } from "../../API/meteoapi";
import { Txt } from "../../composant/Txt/Txt";
import { MeteoBasic } from '../../layouts/Meteobasic';
import { getWeatherInterpretation } from '../../services/Meteoservice/Meteoservice';
import { Meteoadvanced } from '../../composant/Meteoadvanced/Meteoadvanced';

export function Home() {
    const [coords, setCoords] = useState();
    useEffect(() => {
        getUserCoords();
    }, []);

    async function getUserCoords() {
        let { status } = await requestForegroundPermissionsAsync();
        if (status === "granted") {
            const location = await getCurrentPositionAsync();
            setCoords({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
        } else {
            setCoords({ lat: "50.92", lng: "3.78" });
        }
    }

    const [weather, setWeather] = useState();
    const currentWeather = weather?.current_weather;
    const [city, setCity] = useState();

    async function fetchCity(coordinates) {
        const cityResponse = await MeteoAPI.fetchCityFromCoords(
            coordinates
        );
        console.log(cityResponse);
        setCity(cityResponse);
        console.log(city);
    }
    
    useEffect( () => {
        if (coords) {
            fetchWeather(coords);
            fetchCity(coords);
        }
    }, [coords]);

    


    async function fetchWeather(coordinates) {
        const weatherResponse = await MeteoAPI.fetchWeatherFromCoords(
            coordinates
        );
        setWeather(weatherResponse);
    }

    useEffect(() => {
        if (coords) {
            fetchWeather(coords);
        }
    },[coords]);

    console.log("Coords:", coords);
    console.log("Weather:", weather ?? "Loading or undefined");
    return currentWeather? (
        <>
            <View style={s.meteo_basic}>
                <MeteoBasic
                    interpretation={getWeatherInterpretation(currentWeather.weathercode)}
                    city={city}
                    temperature={Math.round(currentWeather?.temperature)}
                    
                />
            </View>
            <View style={s.searchbar_container}>
                <Txt style={{fontSize: 60}}>
                    Barre de recherche
                </Txt>
            </View>
            <View style={s.meteo_advanced}>
                <Meteoadvanced
                    wind={currentWeather.windspeed}
                    dusk={weather.daily.sunrise[0].split("T")[1]}
                    dawn={weather.daily.sunset[0].split("T")[1]}
                />
            </View>
        </>
    ): null;
}