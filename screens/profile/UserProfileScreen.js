import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  setTimeout,
  TouchableOpacity,
  Modal, ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from "react";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import { Ionicons } from "@expo/vector-icons";
import OptionList from "../../components/OptionList/OptionList";
import { colors } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import imageLogin from "../../assets/icons/Carlos.jpg"
import ProgressCircle from "react-native-progress/Circle";



const UserProfileScreen = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState({});
  const { user } = route.params;
  const [isLoading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("");

 
  const handlePress = () => {
    setLoading(true);
    setLoadingLabel("Essa opção está em desenvolvimento...");

    setTimeout(() => {
      setLoading(false);
      setLoadingLabel("");
    }, 5000);
  };


  const convertToJSON = (obj) => {
    try {
      setUserInfo(JSON.parse(obj));
    } catch (e) { 
      setUserInfo(obj);
    }
  };

  // covert  the user to Json object on initial render
  useEffect(() => {
    convertToJSON(user);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto"></StatusBar>
      <View style={styles.TopBarContainer}>
        <TouchableOpacity>
          <Ionicons name="menu-sharp" size={30} color={colors.primary} />
        </TouchableOpacity>
      </View>
    
      <View style={styles.UserProfileCardContianer}>
        <UserProfileCard
          image={imageLogin}
          name={userInfo?.name}
          email={userInfo?.email}
        />
      </View>
      <View style={styles.OptionsContainer}>
        <OptionList
          text={"Minha Conta"}
          Icon={Ionicons}
          iconName={"person"}
          onPress={() => navigation.navigate("myaccount", { user: userInfo })}
        />
        <OptionList
          text={"Lista de Desejos"}
          Icon={Ionicons}
          iconName={"heart"}
          onPress={() => navigation.navigate("mywishlist", { user: userInfo })}
        />
        {/* !For future use --- 
       <OptionList
          text={"Settings"}
          Icon={Ionicons}
          iconName={"settings-sharp"}
          onPress={handlePress}
        />
        <OptionList
          text={"Help Center"}
          Icon={Ionicons}
          iconName={"help-circle"}
          onPress={handlePress}
        /> 
        <Modal visible={isLoading} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ActivityIndicator animating={true} color="black" />
            <Text style={{ marginLeft: 10 }}>{loadingLabel}</Text>
          </View>
        </View>
      </Modal>
     
     
        !For future use ---- End */}
        <OptionList
          text={"Sair"}
          Icon={Ionicons}
          iconName={"log-out"}
          onPress={async () => {
            await AsyncStorage.removeItem("authUser");
            navigation.replace("login");
          }}
        />
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirecion: "row",
    backgroundColor: colors.primary_shadow,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    flex: 1,
    paddingTop: 55,
  },
  buttonIcon: {
    height: 80,
    width: 80,
    resizeMode: "cover",
    padding: 20,
  },
  TopBarContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  UserProfileCardContianer: {
    width: "100%",
    height: "25%",
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 10,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  OptionsContainer: {
    width: "100%",
  },
});
