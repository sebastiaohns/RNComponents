import React, { FC, useState } from "react";
import { Text, View } from "react-native";

import Numpad from "../components/Numpad";
import Wrapper from "../components/Wrapper";

const MainNumpad: FC = () => {
  const [value, setValue] = useState("");

  function handleChange(newValue: string) {
    setValue(newValue);
  }

  return (
    <Wrapper>
      <Text style={{ fontSize: 30, color: "#FF00FF", textAlign: "center" }}>
        {value}
      </Text>
      <Numpad value={value} onChange={handleChange} />
    </Wrapper>
  );
};

export default MainNumpad;
