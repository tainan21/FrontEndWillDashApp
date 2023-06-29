import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../../constants";

const UserProfileCard = ({ Icon, name, email, image }) => {
  return (
    <View style={styles.Container}>
      <View style={styles.avatarContainer}>
        <Image source={image} style={styles.buttonIcon} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.usernameText}>{name}</Text>
        <Text style={styles.secondaryText}>{email}</Text>
      </View>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  Container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonIcon: {
    height: 80,
    width: 80,
    resizeMode: "cover",
    padding: 20,
    borderRadius: 20,
  },
  avatarContainer: {
    display: "flex",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
  },
  infoContainer: {
    display: "flex",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 25,
    color: colors.light,
  },
  secondaryText: {
    fontWeight: "bold",
    fontSize: 12,
    color: colors.light,
  },
});
