import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { getWeatherInterpretation } from "../../services/Meteoservice/Meteoservice";
import { dateTOHHMM, DAYS} from "../../services/Heure/Heureservice";
import { ForecastListItem } from "../ForecastListItem/ForecastListItem";

export function ForecastList({}) {
    const { params } = useRoute();

    return (
        <View style={s.forecastList}>
            {params.time.map((time, index) => {
                const code = params.weathercode[index];
                const image = getWeatherInterpretation(code).image;
                const date = new Date(time);
                const day = DAYS[date.getDay()];
                const temperature = params.temperature_2m_max[index];
                return (
                    <ForecastListItem
                        image={image}
                        day={day}
                        key={time}
                        date={dateTOHHMM.toFixed(0)}
                    />
                );

            })}
        </View>
    );
}