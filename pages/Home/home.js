import { Text, View } from "react-native";
import { s } from "./home.style";
import {requestForegroundPermissionsAsync, getCurrentPositionAsync,} from "expo-location";
import { useEffect, useState } from "react";
import { MeteoAPI } from "../../API/meteoapi";

export function Home({}) {

    const [coords, setCoords] = useState();
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

    const [weather, setWeather] = useState();

    async function fetchWeather(coordinates) {
        const weatherResponse = await MeteoAPI.fetchWeatherFromCoords(coordinates);
        setWeather(weatherResponse);

    }

    useEffect( () => {
        if (coords) {
            fetchWeather(coords);

        }
    }, [coords]);

    return (
        <>
            <View style={s.meteo_basic}>
                <Text style={{fontSize:60, color: "white"}}>La météo basique</Text>
            </View>
            <View style={s.searchbar_container}>
                <Text style={{fontSize:60, color: "white"}}>Barre de recherche</Text>
            </View>
            <View style={s.meteo_advanced}>
                <Text style={{fontSize:60, color: "white"}}>La météo avancée</Text>
            </View>
        </>
    );
}