import React, { FC, Fragment, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Banner from "./components/Banner";
import Modal from "./components/Modal";
import Wrapper from "./components/Wrapper";

interface IBanner {
  openBanner: Function;
  closeBanner: Function;
}

interface IModal {
  openModal: Function;
  closeModal: Function;
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

const ModalContent: FC<{ handleAction: Function }> = ({ handleAction }) => {
  return (
    <View
      style={{
        height: 200,
        borderRadius: 15,
        alignItems: "center",
        backgroundColor: "#FFF",
        justifyContent: "center",
      }}
    >
      <Text>Hello, this is a modal!</Text>
      <TouchableOpacity
        style={styles.cmptButton}
        onPress={() => handleAction()}
      >
        <Text style={styles.text}>close</Text>
      </TouchableOpacity>
    </View>
  );
};

const Main: FC = () => {
  const bannerRef = useRef<IBanner>();
  const modalRef = useRef<IModal>();

  function openBanner() {
    bannerRef.current?.openBanner();
  }

  function openModal() {
    modalRef.current?.openModal();
  }

  function closeBanner() {
    bannerRef.current?.closeBanner();
  }

  function closeModal() {
    modalRef.current?.closeModal();
  }

  return (
    <Fragment>
      <Wrapper>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={openBanner}>
            <Text style={styles.text}>Open banner</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openModal}>
            <Text style={styles.text}>Open modal</Text>
          </TouchableOpacity>
        </View>
      </Wrapper>
      <Banner
        ref={bannerRef}
        content={<BannerContent handleAction={closeBanner} />}
      />

      <Modal
        ref={modalRef}
        content={<ModalContent handleAction={closeModal} />}
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

export default Main;
