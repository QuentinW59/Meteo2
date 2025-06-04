import { Home } from "./pages/Home/home";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import backgroundImage from "./assets/background.png";
import {AlataRegular} from "./assets/font/Alata-Regular.ttf";
import { useFonts } from "expo-font";
import { s } from "./App.style"

export default function App(){

  const [isFontLoaded] = useFonts({
  "Alata-Regular": AlataRegular,
});


  return (
    <ImageBackground
      source={backgroundImage}
      style={s.img_background}
      imageStyle={s.img}
    >
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            {isFontLoaded ? <Home /> : null}
          </SafeAreaView>
        </SafeAreaProvider>
    </ImageBackground>
  );
}