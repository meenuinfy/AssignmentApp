import React from 'react';
import {TextInput, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';

import InputBox from '../components/InputBox';
import Button from '../components/Button';

import {addPin} from '../store/actions';

class GenerateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxOne: '',
      boxTwo: '',
      boxThree: '',
      boxFour: '',
      boxFive: '',
    };
  }

  componentDidMount(): void {
    this.subs = [
      this.props.navigation.addListener('didFocus', payload =>
        this.componentDidFocus(payload),
      ),
    ];
  }

  componentDidFocus(payload) {
    this.setState({
      boxOne: '',
      boxTwo: '',
      boxThree: '',
      boxFour: '',
      boxFive: '',
    });
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  generatePin = () => {
    const {boxOne, boxTwo, boxThree, boxFour, boxFive} = this.state;

    let pins = [];

    let pin = `${boxOne}${boxTwo}${boxThree}${boxFour}${boxFive}`;
    pins.push(boxOne);
    pins.push(boxTwo);
    pins.push(boxThree);
    pins.push(boxFour);
    pins.push(boxFive);
    if (this.validateData(pins)) {
      const pinDetail = {
        id: pin,
        pins: pins,
        name: 'Name',
      };

      this.props.addPin(pinDetail);
      this.props.navigation.navigate('Saved');
    }
  };

  validateData = pins => {
    let dataValidated = true;
    for (let i = 0; i < pins.length; i++) {
      if (dataValidated && pins[i] !== '') {
        for (let j = 0; j < pins.length; j++) {
          if (i !== j) {
            if (pins[i] === pins[j] && (pins[i] !== '' && pins[j] !== '')) {
              console.log('failed');
              dataValidated = false;
              break;
            }
          }
        }
        if (dataValidated) {
          let charArr = pins[i].split('');
          for (let k = 0; k < charArr.length; k++) {
            if (charArr.length < 4) {
              dataValidated = false;
              break;
            } else if (k < 3) {
              if (charArr[k] === charArr[k + 1]) {
                console.log('failed = ');
                dataValidated = false;
              } else if (
                k < 2 &&
                parseInt(charArr[k]) - parseInt(charArr[k + 1]) === 1 &&
                parseInt(charArr[k + 1]) - parseInt(charArr[k + 2]) === 1
              ) {
                console.log('failed sum');
                dataValidated = false;
              } else if (
                k < 2 &&
                parseInt(charArr[k]) - parseInt(charArr[k + 1]) === -1 &&
                parseInt(charArr[k + 1]) - parseInt(charArr[k + 2]) === -1
              ) {
                console.log('failed sum');
                dataValidated = false;
              }
            }
          }
        }
      } else {
        dataValidated = false;
      }
    }

    return dataValidated;
  };

  render() {
    const {boxOne, boxTwo, boxThree, boxFour, boxFive} = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <InputBox
            onChangeText={value => this.setState({boxOne: value})}
            value={boxOne}
            placeholder="xxxx"
            maxLength={4}
            keyboardType="numeric"
          />
          <InputBox
            onChangeText={value => this.setState({boxTwo: value})}
            value={boxTwo}
            placeholder="xxxx"
            maxLength={4}
            keyboardType="numeric"
          />
          <InputBox
            onChangeText={value => this.setState({boxThree: value})}
            value={boxThree}
            maxLength={4}
            keyboardType="numeric"
            placeholder="xxxx"
          />
          <InputBox
            onChangeText={value => this.setState({boxFour: value})}
            value={boxFour}
            maxLength={4}
            keyboardType="numeric"
            placeholder="xxxx"
          />
          <InputBox
            onChangeText={value => this.setState({boxFive: value})}
            value={boxFive}
            placeholder="xxxx"
            maxLength={4}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.rowContainer}>
          <Button
            title="GENERATE"
            btnStyle={{width: '40%'}}
            onPress={this.generatePin}
          />
          <Button
            title="SAVE"
            btnStyle={styles.solidBtn}
            titleStyle={styles.btnText}
          />
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  solidBtn: {
    backgroundColor: 'lightblue',
    width: '40%',
  },
  btnText: {
    color: '#fff',
  },
});

export default connect(
  null,
  {
    addPin,
  },
)(GenerateScreen);
