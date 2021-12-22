import React, { FC, useRef } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

import Modal from "../components/Modal";

interface IModal {
  openModal: Function;
  closeModal: Function;
}

const ModalContent: FC<{ handleAction: Function }> = ({ handleAction }) => {
  return (
    <View
      style={{
        height: 200,
        backgroundColor: "#FFF",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello Modal</Text>
      <Pressable onPress={() => handleAction()}>
        <Text>Fechar</Text>
      </Pressable>
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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable onPress={openModal}>
        <Text>Abrir</Text>
      </Pressable>
      <Modal
        ref={bannerRef}
        content={<ModalContent handleAction={closeModal} />}
      />
    </View>
  );
};

export default ModalMain;
