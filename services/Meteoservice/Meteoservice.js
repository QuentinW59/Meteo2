export const WEATHER_INTERPRETATIONS = [
    {
        code: [0],
        label: "Ensoleillé",
        image: require("../../assets/sunicon.png") 
    },
    {
        code: [1,2,3,45,48],
        label: "Nuageux",
        image: require("../../assets/cloudsicon.png") 
    },
    {
        code: [51,53,55,56,57,61,63,65,66,67,80,81,82,85,86],
        label: "Pluvieux",
        image: require("../../assets/rainicon.png") 
    },
    {
        code: [71,73,75,77],
        label: "Neigeux",
        image: require("../../assets/snowicon.png") 
    },
    {
        code: [96,99],
        label: "Orageux",
        image: require("../../assets/thundericon.png") 
    },
];

export function getWeatherInterpretation(code){
    return WEATHER_INTERPRETATIONS.find((interpretation) => 
    interpretation.code.includes(code)
    );
}