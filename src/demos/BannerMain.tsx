import React, { FC, Fragment, useRef } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";

import Banner from "../components/Banner";
import Wrapper from "../components/Wrapper";

interface IBanner {
  openBanner: Function;
  closeBanner: Function;
}

const BannerContent: FC<{ handleAction: Function }> = ({ handleAction }) => {
  return (
    <View
      style={{
        width: 350,
        height: 200,
        borderRadius: 15,
        alignItems: "center",
        backgroundColor: "#FFF",
        justifyContent: "center",
      }}
    >
      <Text>Hello, this is a banner!</Text>
      <TouchableOpacity
        style={styles.cmptButton}
        onPress={() => handleAction()}
      >
        <Text style={styles.text}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const BannerMain: FC = () => {
  const bannerRef = useRef<IBanner>();

  function openBanner() {
    bannerRef.current?.openBanner();
  }

  function closeBanner() {
    bannerRef.current?.closeBanner();
  }

  return (
    <Fragment>
      <Wrapper>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={openBanner}>
            <Text style={styles.text}>Open banner</Text>
          </TouchableOpacity>
        </View>
      </Wrapper>
      <Banner
        ref={bannerRef}
        content={<BannerContent handleAction={closeBanner} />}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: 250,
    height: 56,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#FED052",
  },

  cmptButton: {
    width: 100,
    height: 40,
    marginTop: 40,
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: "#fe5f55",
  },

  text: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
});

export default BannerMain;
