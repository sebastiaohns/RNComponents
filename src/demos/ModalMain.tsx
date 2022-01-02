import React, { FC, Fragment, useRef } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import Modal from "../components/Modal";
import Wrapper from "../components/Wrapper";

interface IModal {
  openModal: Function;
  closeModal: Function;
}

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

const ModalMain: FC = () => {
  const bannerRef = useRef<IModal>();

  function openModal() {
    bannerRef.current?.openModal();
  }

  function closeModal() {
    bannerRef.current?.closeModal();
  }

  return (
    <Fragment>
      <Wrapper>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={openModal}>
            <Text style={styles.text}>Open modal</Text>
          </TouchableOpacity>
        </View>
      </Wrapper>
      <Modal
        ref={bannerRef}
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
    marginTop: 30,
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

export default ModalMain;
