import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Numpad from "../components/Numpad";
import Wrapper from "../components/Wrapper";

const MainNumpad: FC = () => {
  const [value, setValue] = useState("");

  function handleChange(newValue: string) {
    setValue(newValue);
  }

  return (
    <Wrapper>
      <View style={styles.container}>
        <View style={styles.numScreen}>
          <Text numberOfLines={1} ellipsizeMode="head" style={styles.text}>
            {value}
          </Text>
        </View>
        <Numpad value={value} onChange={handleChange} />
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  numScreen: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 34,
    color: "#FED052",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MainNumpad;
