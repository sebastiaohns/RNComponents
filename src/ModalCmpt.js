/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import ButtonCmpt from './ButtonCmpt';
import Styles from './Styles';

var modalHeight = 500;
const height = Dimensions.get('window').height;

export default class ModalCmpt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      container: new Animated.Value(height),
      opacity: new Animated.Value(0),
      modal: new Animated.Value(modalHeight),
    };
  }

  outsideTouch = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      if (gestureState.y0 < height - modalHeight) {
        this.handleClose();
      }
    },
  });

  setHeight = event => {
    modalHeight = event.nativeEvent.layout.height;
  };

  handleOpen = () => {
    Animated.sequence([
      Animated.timing(this.state.container, {toValue: 0, duration: 100}),
      Animated.timing(this.state.opacity, {toValue: 1, duration: modalHeight}),
      Animated.spring(this.state.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  handleClose = () => {
    Animated.sequence([
      Animated.timing(this.state.modal, {
        toValue: modalHeight,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(this.state.opacity, {toValue: 0, duration: modalHeight}),
      Animated.timing(this.state.container, {toValue: height, duration: 100}),
    ]).start();
  };

  render() {
    const translate = {
      transform: [{translateY: this.state.modal}],
    };

    const shadow = {
      opacity: this.state.opacity,
      transform: [{translateY: this.state.container}],
    };

    return (
      <Animated.View
        style={[modal.Shadow, shadow]}
        {...this.outsideTouch.panHandlers}>
        <Animated.View style={[modal.Modal, translate]}>
          <View style={modal.Indicator} />
          <View
            style={modal.Container}
            onLayout={event => {
              this.setHeight(event);
            }}>
            <View
              style={{width: '100%', height: 200, justifyContent: 'center'}}>
              <ButtonCmpt
                disabled={null}
                handleFunction={this.handleClose}
                color={'#3c8dbc'}
                content={<Text style={Styles.TextLight}>Fechar modal!</Text>}
              />
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    );
  }
}

const modal = StyleSheet.create({
  Shadow: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    zIndex: 0,
  },

  Modal: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    zIndex: 1,
  },

  Container: {
    height: '100%',
    marginLeft: 37,
    marginRight: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },

  Indicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 10,
  },

  Text: {
    color: '#FFF',
    fontSize: 18,
  },
});
