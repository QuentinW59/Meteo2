import { Home } from "./pages/Home/home";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import backgroundImage from "./assets/background.png"

import { s } from "./App.style"

export default function App(){
  return (
    <ImageBackground
      source={backgroundImage}
      style={s.img_background}
      imageStyle={s.img}
    >
        <SafeAreaProvider>
          <SafeAreaView style={s.container}>
            <Home />
          </SafeAreaView>
        </SafeAreaProvider>
    </ImageBackground>
  );
}