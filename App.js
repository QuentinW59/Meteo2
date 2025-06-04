import { Home } from "./pages/Home/Home";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ImageBackground } from "react-native";
import backgroundImg from "./assets/background.png";
import AlataRegular from "./assets/font/Alata-Regular.ttf";
import {useFonts} from "expo-font";
import {createNativeStackNavigator}  from "@react-navigation/native-stack";



const Stack = createNativeStackNavigator();

import { s } from "./App.style";
import {NavigationContainer} from "@react-navigation/native";
import {Forecast} from "./pages/Forecast/Forecast";

const navTheme = {
      colors: {
        background: "transparant",
      },
    };

export default function App() {
    const [isFontLoaded] = useFonts({
        "AlataRegular": AlataRegular,
    });



  return (
    <NavigationContainer theme={navTheme}>
      <ImageBackground
          source={backgroundImg}
          style={s.img_background}
          imageStyle={s.img}
      >
          <SafeAreaProvider>
              <SafeAreaView style={s.container}>
                  {isFontLoaded ? (
                    <Stack.Navigator
                      screenOptions={{ headerShown: false}}
                      initialRouteName="Home"
                    >
                      <Stack.Screen name="Home" component={Home} />
                      <Stack.Screen name="Forecast" component={Forecast} />
                    </Stack.Navigator>
                  ) : null }
              </SafeAreaView>
          </SafeAreaProvider>
      </ImageBackground>
    </NavigationContainer>


  );
}