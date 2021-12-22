import React, { FC, useState } from "react";
import { Text, View } from "react-native";

import Numpad from "../components/Numpad";

const MainNumpad: FC = () => {
  const [value, setValue] = useState("");

  function handleChange(newValue: string) {
    setValue(newValue);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 30, color: "#FF00FF", textAlign: "center" }}>
        {value}
      </Text>
      <Numpad value={value} onChange={handleChange} />
    </View>
  );
};

export default MainNumpad;
