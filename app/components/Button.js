import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Button = ({title, titleStyle, btnStyle, ...props}) => (
  <TouchableOpacity
    {...props}
    activeOpacity={0.6}
    style={[styles.btnContainer, btnStyle]}>
    <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = EStyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightblue',
    backgroundColor: '#fff',

    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'lightblue',
  },
});

export default Button;
