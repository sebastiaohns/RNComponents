import React, { useRef } from "react";
import { Pressable, Text, View } from "react-native";

import Banner from "../components/Banner";

interface IBanner {
  openBanner: Function;
  closeBanner: Function;
}

const BannerContent: React.FC<{ handleAction: Function }> = ({
  handleAction,
}) => {
  return (
    <View
      style={{
        width: 200,
        height: 200,
        backgroundColor: "#FFF",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello</Text>
      <Pressable onPress={() => handleAction()}>
        <Text>Fechar</Text>
      </Pressable>
    </View>
  );
};

const BannerMain: React.FC = () => {
  const bannerRef = useRef<IBanner>();

  function openBanner() {
    bannerRef.current?.openBanner();
  }

  function closeBanner() {
    bannerRef.current?.closeBanner();
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Pressable onPress={openBanner}>
        <Text>Abrir</Text>
      </Pressable>
      <Banner
        ref={bannerRef}
        content={<BannerContent handleAction={closeBanner} />}
      />
    </View>
  );
};

export default BannerMain;
