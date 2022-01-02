import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from "react-native";

import { Feather } from "@expo/vector-icons";

const Numpad = (props: { value: string; onChange: Function }) => {
  const [value, setValue] = useState("");

  const handleChange = (text: String) => {
    setValue(value + text);
  };

  const handleDelete = () => {
    setValue(value.slice(0, -1));
  };

  useEffect(() => {
    props.onChange(value);
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableHighlight
          onPress={() => handleChange("7")}
          underlayColor="rgba(254, 208, 82, 0.2)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>7</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("8")}
          underlayColor="rgba(254, 208, 82, 0.2)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>8</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("9")}
          underlayColor="rgba(254, 208, 82, 0.2)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>9</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.row}>
        <TouchableHighlight
          onPress={() => handleChange("4")}
          underlayColor="rgba(254, 208, 82, 0.2)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>4</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("5")}
          underlayColor="rgba(254, 208, 82, 0.2)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>5</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("6")}
          underlayColor="rgba(254, 208, 82, 0.2)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>6</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.row}>
        <TouchableHighlight
          onPress={() => handleChange("1")}
          underlayColor="rgba(254, 208, 82, 0.2)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>1</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("2")}
          underlayColor="rgba(254, 208, 82, 0.2)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>2</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("3")}
          underlayColor="rgba(254, 208, 82, 0.2)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>3</Text>
        </TouchableHighlight>
      </View>

      <View style={[styles.row]}>
        <TouchableHighlight style={styles.key}>
          {/* Dummy key to make Numpad first line position consistent */}
          <Text></Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleChange("0")}
          underlayColor="rgba(254, 208, 82, 0.2)"
          delayPressOut={100}
          style={styles.key}
        >
          <Text style={styles.number}>0</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => handleDelete()}
          underlayColor="rgba(254, 95, 85, 0.2)"
          delayPressOut={100}
          style={styles.key}
        >
          <Feather
            name="delete"
            size={24}
            color="#1C1939"
            style={styles.number}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const { width } = Dimensions.get("window");
const keyWidth = width * 0.22;
const keyHeight = keyWidth;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  key: {
    width: keyWidth,
    height: keyHeight,
    borderRadius: keyWidth / 2,
    justifyContent: "center",
  },

  number: {
    fontSize: 24,
    lineHeight: 26,
    color: "#1C1939",
    textAlign: "center",
  },
});

export default Numpad;
