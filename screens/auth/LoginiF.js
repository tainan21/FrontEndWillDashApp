import {
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from "react-native";

import React, { useState } from "react";
import { colors, network } from "../../constants";
import CustomInput from "../../components/CustomInput";
import header_logo from "../../assets/logo/logo.png";

import CustomButton from "../../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import ProgressDialog from "react-native-progress-dialog";
import InternetConnectionAlert from "react-native-internet-connection-alert";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setIsloading] = useState(false);

  //method to store the authUser to aync storage
  _storeData = async (user) => {
    try {
      AsyncStorage.setItem("authUser", JSON.stringify(user));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    email: email,
    password: password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  //method to validate the user credentials and navigate to Home Screen / Dashboard
  const loginHandle = () => {
    setIsloading(true);
    //[check validation] -- Start
    // if email does not contain @ sign
    if (email == "") {
      setIsloading(false);
      return setError("Please enter your email");
    }
    if (password == "") {
      setIsloading(false);
      return setError("Please enter your password");
    }
    if (!email.includes("@")) {
      setIsloading(false);
      return setError("Email is not valid");
    }
    // length of email must be greater than 5 characters
    if (email.length < 6) {
      setIsloading(false);
      return setError("Email is too short");
    }
    // length of password must be greater than 5 characters
    if (password.length < 6) {
      setIsloading(false);
      return setError("Password must be 6 characters long");
    }
    //[check validation] -- End

    fetch(network.serverip + "/login", requestOptions) // API call
      .then((response) => response.json())
      .then((result) => {
        if (
          result.status == 200 ||
          (result.status == 1 && result.success != false)
        ) {
          if (result?.data?.userType == "ADMIN") {
            //check the user type if the type is ADMIN then navigate to Dashboard else navigate to User Home
            _storeData(result.data);
            setIsloading(false);
            navigation.replace("dashboard", { authUser: result.data }); // naviagte to Admin Dashboard
          } else {
            _storeData(result.data);
            setIsloading(false);
            navigation.replace("tab", { user: result.data }); // naviagte to User Dashboard
          }
        } else {
          setIsloading(false);
          return setError(result.message);
        }
      })
      .catch((error) => {
        setIsloading(false);
        console.log("error", setError(error.message));
      });
  };

  return (
    <InternetConnectionAlert onChange={(connectionState) => {}}>
      <KeyboardAvoidingView
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        
          <ImageBackground
          source={require('../../assets/background.png')}
          style={styles.backgroundImage} >
                    <View style={styles.TopBarContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color={colors.muted}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.containerLogin}>
          <ProgressDialog visible={isloading} label={"Logando..."} />
          <StatusBar></StatusBar>
            <Text style={styles.screenNameText}>Que bom que voltou!</Text>
            <CustomAlert message={error} type={"error"} />
            <CustomInput
              value={email}
              setValue={setEmail}
              placeholder={"Email"}
              width={"80%"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <CustomInput
              value={password}
              setValue={setPassword}
              secureTextEntry={true}
              width={"80%"}
              placeholder={"Senha"}
              placeholderTextColor={colors.muted}
              radius={5}
            />
            <View style={styles.forgetPasswordContainer}>
              <Text onPress={() => navigation.navigate("forgetpassword")} style={styles.ForgetText}>Esqueceu a sua senha??</Text>
            </View>
            <View style={styles.buttomContainer}>
          <CustomButton text={"Login"} onPress={loginHandle} />
        </View>
        <View style={styles.bottomContainerNewAcc}>
          <Text style={styles.bottomTextNewAcc}>Não tem uma conta?</Text>
          <Text onPress={() => navigation.navigate("signup")} style={styles.signupText}>Criar Conta!</Text>
        </View>
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </InternetConnectionAlert>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    
  },
  containerLogin:{
    width: "100%",
    height: "100%",
    alignItems: 'center',
    justifyContent: "center",
    flex: 1,
    flexDirection: "column",
    padding: 40,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  forgetPasswordContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  ForgetText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.white,
  },
  buttomContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  
  bottomTextNewAcc: {
    textAlign: 'right',
    color: colors.white,
  },
  bottomContainerNewAcc: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  signupText: {
    marginLeft: 4,
    color: colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    bottom: 25,
    textAlign: 'auto',
    color: colors.white,
  },
});
