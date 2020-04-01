/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';

import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import AnimatedEllipsis from 'react-native-animated-ellipsis';
import styles from './Styles';

export default class ButtonCmpt extends Component {
  render() {
    let TouchablePlatformSpecific =
      Platform.OS === 'ios' ? TouchableOpacity : TouchableNativeFeedback;

    return (
      <View>
        <TouchablePlatformSpecific
          disabled={this.props.disabled}
          onPress={this.props.handleFunction}>
          <View
            style={[
              styles.Button,
              this.props.disabled
                ? {backgroundColor: '#6cabd0'}
                : {backgroundColor: this.props.color},
            ]}>
            {this.props.disabled ? (
              <AnimatedEllipsis
                numberOfDots={3}
                minOpacity={0.4}
                animationDelay={250}
                style={{
                  color: '#FFF',
                  fontSize: 100,
                  letterSpacing: -15,
                  marginBottom: 65,
                }}
              />
            ) : (
              <View>{this.props.content}</View>
            )}
          </View>
        </TouchablePlatformSpecific>
      </View>
    );
  }
}
