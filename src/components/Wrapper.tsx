import React, { FC, Fragment, ReactNode } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

interface IProps {
  children: ReactNode;
}

const Wrapper: FC<IProps> = ({ children }) => {
  return (
    <Fragment>
      <SafeAreaView style={styles.topSafeArea} />

      <SafeAreaView style={styles.bottomSafeArea}>
        <View style={styles.statusBar}>
          <StatusBar
            translucent
            barStyle="dark-content"
            backgroundColor="#F7EFFA"
          />
        </View>

        <View style={styles.screen}>{children}</View>
      </SafeAreaView>
    </Fragment>
  );
};

const BAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
  topSafeArea: {
    flex: 0,
    backgroundColor: "#F7EFFA",
  },

  bottomSafeArea: {
    flex: 1,
    backgroundColor: "#FCF8ED",
  },

  statusBar: {
    height: BAR_HEIGHT,
  },

  screen: {
    flex: 1,
  },
});

export default Wrapper;
