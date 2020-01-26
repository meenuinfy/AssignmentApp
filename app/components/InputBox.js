import React from 'react';
import {View, TextInput, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const InputBox = ({...props}) => (
  <View style={styles.container}>
    <TextInput
      {...props}
      style={styles.input}
      autoCapitalize="none"
      autoCorrect={false}
    />
  </View>
);

const styles = EStyleSheet.create({
  input: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  container: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#fff',
    marginHorizontal: 5,
    paddingHorizontal: 7,
    fontWeight: 'bold',
  },
});

export default InputBox;
