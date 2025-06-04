import {Text, View} from 'react-native';
import { s } from "./Home.style";
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
import { useNavigation } from "@react-navigation/native";
import { Container } from '../../composant/Container/Container';
import { SearchBar } from 'react-native-screens';


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

     async function fetchCoordsByCity(city) {
        try {
            const coords = await MeteoAPI.fetchCoordsFromCity(city);
            setCoords(coords);
        } catch (e) {
            Alert.alert("Une erreur s'est produite !", e.message);
        }
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

    const nav = useNavigation();
    function goToForcastPage() {
        nav.navigate("Forecast", {city, ...weather.daily});
    }

    console.log("Coords:", coords);
    console.log("Weather:", weather ?? "Loading or undefined");


    return (
        <Container>
            {currentWeather ? (
            <>
                <View style={s.meteo_basic}>
                    <MeteoBasic
                        interpretation={getWeatherInterpretation(currentWeather.weathercode)}
                        city={city}
                        temperature={Math.round(currentWeather?.temperature)}
                        onPress={goToForcastPage}
                        
                    />
                </View>
                <View style={s.searchbar_container}>
                    <SearchBar onSubmit={fetchCoordsByCity} />
                </View>
                <View style={s.meteo_advanced}>
                    <Meteoadvanced
                        wind={currentWeather.windspeed}
                        dusk={weather.daily.sunrise[0].split("T")[1]}
                        dawn={weather.daily.sunset[0].split("T")[1]}
                    />
                </View>
            </>
        ): null }
        </Container>
    );
    
}