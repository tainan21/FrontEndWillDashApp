import { StyleSheet, Text, View, SafeAreaView, Image, Pressable, ScrollView } from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FitnessItems } from "../Context";
import { AntDesign } from "@expo/vector-icons";

const WorkoutScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { completed, setCompleted } = useContext(FitnessItems);
  const { image, excersises } = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />

      <Ionicons
        onPress={() => navigation.goBack()}
        style={styles.backIcon}
        name="arrow-back-outline"
        size={28}
        color="white"
      />

      {excersises.map((item, index) => (
        <Pressable
          style={styles.exerciseContainer}
          key={index}
        >
          <Image style={styles.exerciseImage} source={{ uri: item.image }} />

          <View style={styles.exerciseInfoContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseSets}>x{item.sets}</Text>
          </View>

          {completed.includes(item.name) && (
            <AntDesign name="checkcircle" size={24} color="green" />
          )}
        </Pressable>
      ))}

      <Pressable
        onPress={() => {
          navigation.navigate("Fit", {
            excersises: excersises,
          });
          setCompleted([]);
        }}
        style={styles.startButton}
      >
        <Text style={styles.startButtonText}>START</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: 50,
  },
  image: {
    width: "100%",
    height: 170,
  },
  backIcon: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  exerciseContainer: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseImage: {
    width: 90,
    height: 90,
  },
  exerciseInfoContainer: {
    marginLeft: 10,
  },
  exerciseName: {
    fontSize: 17,
    fontWeight: "bold",
    width: 170,
  },
  exerciseSets: {
    marginTop: 4,
    fontSize: 18,
    color: "gray",
  },
  startButton: {
    backgroundColor: "blue",
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginVertical: 20,
    width: 120,
    borderRadius: 6,
  },
  startButtonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default WorkoutScreen;
