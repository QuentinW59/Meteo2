import { s } from "./Container.style";
import { 
    SafeAreaView,
    SafeAreaProvider,
} from "react-native-safe-area-context";
import { ImageBackground} from "react-native";
import BackgroundImg from "../../assets/background.png";

export function Container({ children }) {
    return (
        <ImageBackground
            source={BackgroundImg}
            style={s.img_background}
            imageStyle={s.img}
        >
            <SafeAreaView style={s.container}>{children}</SafeAreaView>
        </ImageBackground>
    );
}