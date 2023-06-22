import Routes from "./routes/Routes";
import { Provider } from "react-redux";
import { store } from "./states/store";
import { useFonts } from "expo-font";
import React, { useCallback } from "react";
export default function App() {
  console.reportErrorsAsExceptions = false;
  const [fontsLoaded] = useFonts({
    Montserrat: require("./assets/fonts/montserrati/Montserrat-Regular.ttf"),
    "Montserrat-semiBold": require("./assets/fonts/montserrati/Montserrat-SemiBold.ttf"),
    Inter: require("./assets/fonts/montserrati/Inter-Regular.ttf"),
    "Inter-semiBold": require("./assets/fonts/montserrati/Inter-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await alert("terminou");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
