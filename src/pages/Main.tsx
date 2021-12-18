import React from "react";
import { View } from "react-native";

import SwipeButton from "../components/SwipeButton";

const Main: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SwipeButton />
    </View>
  );
};

export default Main;
