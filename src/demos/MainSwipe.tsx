import React, { FC, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import SwipeButton from "../components/SwipeButton";
import Wrapper from "../components/Wrapper";

const Main: FC = () => {
  const swipeRef = useRef<{ handleStart: Function }>();
  const [content, setContent] = useState("waiting...");

  function handleStart() {
    setContent("waiting...");
    swipeRef.current?.handleStart();
  }

  function handleFinish() {
    setContent("done!");
  }

  return (
    <Wrapper>
      <View style={styles.container}>
        <SwipeButton handleFinish={handleFinish} />
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View style={styles.cmptButton}>
            <Text style={styles.text}> {content}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleStart}>
            <Text style={styles.text}>restart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 35,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    flex: 4,
    height: 40,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#fe5f55",
  },

  cmptButton: {
    flex: 6,
    height: 40,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#E4E4E4",
  },

  text: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
});

export default Main;
