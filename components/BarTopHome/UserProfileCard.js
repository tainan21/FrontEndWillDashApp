import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../constants";
import easybuylogo from "../../assets/logo/logo-pet.png";

const UserProfileCard = ({ Icon, name, email }) => {
  return (
    <View style={styles.Container}>
      
      <View style={styles.avatarContainer}>
          <Image source={easybuylogo} style={styles.logo} />
        </View>
      <View style={styles.infoContainer}>
        <Text style={styles.usernameText}>Olá, {name}</Text>
      </View>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  avatarContainer: {
    display: "flex",
    width: "20%",

    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 20,
    padding: 10,
  },
  infoContainer: {
    display: "flex",
    width: "50%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 25,
    color: colors.light,
  },
  logoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
  secondaryText: {
    fontWeight: "bold",
    fontSize: 12,
    color: colors.light,
  },
});
