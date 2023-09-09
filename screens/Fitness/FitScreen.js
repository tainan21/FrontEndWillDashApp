import { StyleSheet, Text, View, SafeAreaView, Image, Pressable } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FitnessItems } from "../Context";

const FitScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const excersise = route.params.excersises;
  const current = excersise[index];

  const {
    completed,
    setCompleted,
    minutes,
    setMinutes,
    calories,
    setCalories,
    setWorkout,
    workout,
  } = useContext(FitnessItems);

  useEffect(() => {
    if (index < excersise.length - 1) {
      const timer = setTimeout(() => {
        setIndex(index + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      navigation.navigate("Home");
    }
  }, [index]);

  const handleDonePress = () => {
    setCompleted([...completed, current.name]);
    setWorkout(workout + 1);
    setMinutes(minutes + 2.5);
    setCalories(calories + 6.3);
    if (index < excersise.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <SafeAreaView>
      <Image style={{ width: "100%", height: 370 }} source={{ uri: current.image }} />

      <Text style={styles.title}>{current.name}</Text>

      <Text style={styles.sets}>x{current.sets}</Text>

      <Pressable
        onPress={handleDonePress}
        style={[styles.doneButton, index === excersise.length - 1 && styles.doneButtonLast]}
      >
        <Text style={styles.doneButtonText}>DONE</Text>
      </Pressable>

      <Pressable style={styles.navButtonsContainer}>
        <Pressable
          disabled={index === 0}
          onPress={() => {
            setIndex(index - 1);
          }}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>PREV</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            if (index < excersise.length - 1) {
              setIndex(index + 1);
            } else {
              navigation.navigate("Home");
            }
          }}
          style={styles.navButton}
        >
          <Text style={styles.navButtonText}>{index === excersise.length - 1 ? "SKIP" : "NEXT"}</Text>
        </Pressable>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
  sets: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    fontSize: 38,
    fontWeight: "bold",
  },
  doneButton: {
    backgroundColor: "blue",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    borderRadius: 20,
    padding: 10,
    width: 150,
  },
  doneButtonLast: {
    backgroundColor: "blue",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 30,
    borderRadius: 20,
    padding: 10,
    width: 150,
  },
  doneButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  navButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  navButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 20,
    width: 100,
  },
  navButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FitScreen;
