import { Text } from "react-native";
import {s} from "./Text.style";

export function Txt ({children, style}) {
    return <Text style={[s.text, style]}>{children}</Text>;
}