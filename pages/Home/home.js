import { View } from "react-native";
import { s } from "./home.style";
import {requestForegroundPermissionsAsync, getCurrentPositionAsync,} from "expo-location";
import { useEffect, useState } from "react";
import { MeteoAPI } from "../../API/meteoapi";
import { Txt } from "../../composant/Txt/Txt";
import { MeteoBasic } from "../../layouts/Meteobasic";
import { getWeatherInterpretation } from "../../services/Meteoservice/Meteoservice";

export function Home({}) {

    const [coords, setCoords] = useState();
    const [weather, setWeather] = useState();
    const currentWeather = weather?.currentWeather;
    


    useEffect( () => {
        getUsersCoords();
    }, []);

    async function getUsersCoords() {
        let {status} = await requestForegroundPermissionsAsync();
        if(status === "granted") {
            const location = await getCurrentPositionAsync();
            setCoords({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
        }else {
            setCoords( { lat : "50.58", lng: "3.06" });
        }        
    }
    console.log(coords);

   

    async function fetchWeather(coordinates) {
        const weatherResponse = await MeteoAPI.fetchWeatherFromCoords(coordinates);
        setWeather(weatherResponse);

    }

    useEffect( () => {
        if (coords) {
            fetchWeather(coords);

        }
    }, [coords]);


    return currentWeather?(
        <>
            <View style={s.meteo_basic}>
                <MeteoBasic
                    interpretation = {getWeatherInterpretation(currentWeather.weathercode)}
                    temperature={Math.round(currentWeather?.temperature)}
                    city="todo"
                />
            </View>
            <View style={s.searchbar_container}>
                <Txt style={{fontSize:50}}>Barre de recherche</Txt>
            </View>
            <View style={s.meteo_advanced}>
                <Txt style={{fontSize:50}}>La météo avancée</Txt>
            </View>
        </>
    ): null;
}