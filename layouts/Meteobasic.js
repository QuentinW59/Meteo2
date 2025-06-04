import { Image, TouchableOpacity, View } from "react-native";
import { Txt } from "../composant/Txt/Txt.js";
import { s } from "./Meteobasic.style.js";

export function MeteoBasic({onPress, temperature, city, interpretation}){
    return (
        <>
            <View style={s.clock}>
                <Txt>Clock</Txt>
            </View>

            <Txt style={{fontSize: 30}}>{city}</Txt>

            <Txt style={s.weather_label}>{interpretation.label}</Txt>


            <View style={s.temperature_box}>
                <TouchableOpacity onPress={onPress}>
                    <Txt style={s.temperature}>{temperature}°</Txt>
                </TouchableOpacity>
                <Image style={s.image} source={interpretation.image} />
            </View>
        
        </>
    );

}

