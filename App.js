import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Pokedex from "./src/screens/Pokedex";
import Pokemon from "./src/screens/Pokemon";
export default function App() {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    // InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    // InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });
  if (!loaded) return null;
  const Stack = createStackNavigator();
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "transparent",
    },
  };
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={Pokedex} />
        <Stack.Screen name="Pokemon" component={Pokemon} />
        {/* <Stack.Screen name="Details" component={Details} /> */}
        {/* <Stack.Screen/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
