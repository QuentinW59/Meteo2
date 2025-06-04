import { Container } from "../../composant/Container/Container.js";
import { ForecastHeader } from "../../composant/ForecastHeader/ForecastHeader";
import { ForecastList } from "../../composant/Forecastlist/Forecastlist";

export function Forecast({}) {
    return (
        <Container>
            <ForecastHeader />
            <ForecastList />
        </Container>
    );

}