import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { colors, network } from "../../constants";
import { Ionicons } from "@expo/vector-icons";

const ProductCard = ({
  name,
  price,
  image,
  quantity,
  onPress,
  onPressSecondary,
  cardSize,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { width: cardSize === "large" ? "100%" : 150 }]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.productImage} />
        <TouchableOpacity style={styles.tagAbsolute} onPress={onPressSecondary}>
          <Ionicons name="share" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View>
         <Text style={styles.secondaryTextSm}>{`${name.substring(0, 10)}..`}</Text> 
        {/* <Text style={styles.secondaryTextSm}>Melhor Preço</Text> 
          <Text style={styles.primaryTextPrice}>{price}$</Text> */}
        </View>
        <View style={styles.infoButtons}>
            <TouchableOpacity style={styles.iconContainerDisable} disabled>
             <Text style={styles.buttonText}>Ração Medicamentos</Text> 
            </TouchableOpacity>
        </View> 
      {/*  <View style={styles.infoButtons}>
           {quantity > 0 ? (
           <TouchableOpacity
              style={styles.iconContainer}
              onPress={onPressSecondary}
            >
              <Ionicons name="cart" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconContainerDisable} disabled>
              <Ionicons name="cart" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View> 
        <View style={styles.infoButtons}>
           {quantity > 0 ? (
           <TouchableOpacity
              style={styles.iconContainer}
              onPress={onPressSecondary}
            >
              <Ionicons name="cart" size={20} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconContainerDisable} disabled>
              <Ionicons name="cart" size={20} color="white" />
            </TouchableOpacity>
          )}
        </View> 
        */}
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: 250,
    height: 240,
    borderRadius: 20,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5,
    elevation: 5,
  },
  tagAbsolute: {
    position: "absolute",
    top: 8,
    backgroundColor: "#f25f49",
    right: 8,
  },
  imageContainer: {
    backgroundColor: colors.light,
    width: "100%",
    height: 140,
    borderRadius: 10,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 5,
    paddingBottom: 0,
  },
  productImage: {
    height: 120,
    width: 120,
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  secondaryTextSm: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryTextSm: {
    fontSize: 15,
    fontWeight: 500,
    color: "#333",
    //fontFamily: "Montserrat,sans-serif",
  },
  buttonText:{
    fontSize: 12,
    color: "#fff",
    //fontFamily: "Montserrat,sans-serif",
  },
  primaryTextPrice:{
    fontSize: 15,
    fontWeight: 500,
    color: "#333",
    //fontFamily: "Montserrat,sans-serif",
  },
  infoButtons:{
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  iconContainer: {
    backgroundColor: colors.primary,
    width: "50%",
    height: 30,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerDisable: {
    backgroundColor: "#f25f49",
    width: "90%",
    height: 30,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
});
