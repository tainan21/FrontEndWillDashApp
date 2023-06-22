import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "../../constants";
import garmentsIcon from "../../assets/icons/garments.png";

const CustomIconButton = ({ text, image, onPress, active }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: active ? colors.primary_light : colors.white },
        { width: "100%" },
      ]}
      onPress={onPress}
    >
      <Image source={image} style={styles.buttonIcon} />
      <Text
        style={[
          styles.buttonText,
          { color: active ? colors.dark : colors.muted },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomIconButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    borderRadius:50,
    borderWidth: 3,
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderColor: '#2fcc66',
    marginHorizontal: 5,
    
  },
  buttonText: {
    position: "absolute",
    top: 80,
    backgroundColor: colors.white,
    height: 20,
    textAlign: "center",
  },
  buttonIcon: {
    height: 80,
    width: 80,
    resizeMode: "cover",
    padding: 20,
  },
  buttonImage: {
    width: 120,
  },
});
