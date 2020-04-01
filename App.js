/* eslint-disable no-const-assign */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Text} from 'react-native';

import ButtonCmpt from './src/ButtonCmpt';
import ModalCmpt from './src/ModalCmpt';
import Styles from './src/Styles';

export default class App extends Component {
  render() {
    return (
      <View>
        <View style={[Styles.Container, {zIndex: 1}]}>
          <ButtonCmpt
            disabled={null}
            handleFunction={() => {
              this.child.handleOpen();
            }}
            color={'#3c8dbc'}
            content={<Text style={Styles.TextLight}>Abrir modal!</Text>}
          />
        </View>

        <ModalCmpt
          ref={child => {
            this.child = child;
          }}
          {...this.props}
        />
      </View>
    );
  }
}
