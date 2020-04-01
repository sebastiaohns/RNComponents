import {Dimensions, StyleSheet} from 'react-native';

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  Container: {
    marginLeft: 37,
    marginRight: 37,
    justifyContent: 'center',
    height: Dimensions.get('window').height,
  },

  Button: {
    width: '100%',
    height: 54,
    backgroundColor: '#3c8dbc',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.04,
  },

  TextLight: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default styles;
