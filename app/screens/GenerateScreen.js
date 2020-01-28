import React from 'react';
import {Text, View, TouchableWithoutFeedback, Keyboard} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';

import InputBox from '../components/InputBox';
import Button from '../components/Button';

import {addPin} from '../store/actions';

class GenerateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxOne: null,
      boxTwo: null,
      boxThree: null,
      boxFour: null,
      boxFive: null,
      showError: false,
      errorText: '',
    };
  }

  // componentDidMount(): void {
  //   this.subs = [
  //     this.props.navigation.addListener('didFocus', payload =>
  //       this.componentDidFocus(payload),
  //     ),
  //   ];
  // }

  // componentDidFocus(payload) {
  //   this.setState({
  //     boxOne: null,
  //     boxTwo: null,
  //     boxThree: null,
  //     boxFour: null,
  //     boxFive: null,
  //   });
  // }

  // componentWillUnmount() {
  //   this.subs.forEach(sub => sub.remove());
  // }
  /**
   * Function to validate and save pin to Redux
   */
  savePin = () => {
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
      alert('Pin Saved');
      this.setState({
        boxOne: null,
        boxTwo: null,
        boxThree: null,
        boxFour: null,
        boxFive: null,
      });
      // this.props.navigation.navigate('Saved');
    }
  };

  generatePin = () => {
    let pins = [];
    let position = 0;
    while (position < 5) {
      let newPin = (Math.floor(Math.random() * 10000) + 1).toString();
      // console.log(newPin);
      if (this.checkDigits(position, newPin, false)) {
        pins[position] = newPin;
        let pinMatched = false;
        for (let i = pins.length; i > -1; i--) {
          if (position !== i) {
            if (pins[position] === pins[i]) {
              pinMatched = true;
              break;
            }
          }
        }
        if (!pinMatched) {
          position += 1;
          // console.log(position);
        }
      }
    }
    this.setState({
      boxOne: pins[0],
      boxTwo: pins[1],
      boxThree: pins[2],
      boxFour: pins[3],
      boxFive: pins[4],
      showError: false,
    });
  };

  /**
   * Check the validations/Logic for pins
   * @param pins
   * @returns {boolean}
   */
  validateData = pins => {
    let dataValidated = true;
    for (let i = 0; i < pins.length; i++) {
      if (dataValidated && pins[i] !== null) {
        for (let j = 0; j < pins.length; j++) {
          if (i !== j) {
            console.log(pins[i]);
            if (pins[i] === null) {
              this.setState({
                errorText: `Field ${i + 1} can not be empty`,
                showError: true,
              });
              dataValidated = false;
              break;
            } else if (pins[i] === pins[j]) {
              this.setState({
                errorText: `Field ${i + 1} and Field ${j + 1} can not be same`,
                showError: true,
              });
              dataValidated = false;
              break;
            }
          }
        }
        if (dataValidated) {
          dataValidated = this.checkDigits(i, pins[i], true);
        }
      } else {
        if (dataValidated) {
          this.setState({
            errorText: `Field ${i + 1} can not be empty`,
            showError: true,
          });
          dataValidated = false;
        }
      }
    }
    return dataValidated;
  };

  /**
   * Function to check the digits validation
   * @param  i current position in the pins array.
   * @param pin current pin String to be validated.
   * @param shouldShowError whether to show error or not.
   **/
  checkDigits = (i, pin, shouldShowError) => {
    let dataValidated = true;
    let charArr = pin.split('');
    for (let k = 0; k < charArr.length; k++) {
      if (charArr.length < 4) {
        if (shouldShowError) {
          this.setState({
            errorText: `Field ${i + 1} must have 4 digits`,
            showError: true,
          });
        }
        dataValidated = false;
        break;
      } else if (k < 3) {
        if (charArr[k] === charArr[k + 1]) {
          dataValidated = false;
          if (shouldShowError) {
            this.setState({
              errorText: `Field ${i +
                1} can not have two same consecutive digits`,
              showError: true,
            });
          }
          break;
        } else if (
          k < 2 &&
          parseInt(charArr[k]) - parseInt(charArr[k + 1]) === 1 &&
          parseInt(charArr[k + 1]) - parseInt(charArr[k + 2]) === 1
        ) {
          dataValidated = false;
          if (shouldShowError) {
            this.setState({
              errorText: `Field ${i +
                1} can not have three consecutive descending digits`,
              showError: true,
            });
          }
          break;
        } else if (
          k < 2 &&
          parseInt(charArr[k]) - parseInt(charArr[k + 1]) === -1 &&
          parseInt(charArr[k + 1]) - parseInt(charArr[k + 2]) === -1
        ) {
          dataValidated = false;
          if (shouldShowError) {
            this.setState({
              errorText: `Field ${i +
                1} can not have three consecutive ascending digits`,
              showError: true,
            });
          }
          break;
        }
      }
    }
    return dataValidated;
  };

  removeSymbols = text => {
    return text.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
  };

  render() {
    const {
      boxOne,
      boxTwo,
      boxThree,
      boxFour,
      boxFive,
      errorText,
      showError,
    } = this.state;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <InputBox
              onChangeText={value =>
                this.setState({
                  boxOne: this.removeSymbols(value),
                  showError: false,
                })
              }
              value={boxOne}
              placeholder="xxxx"
              maxLength={4}
              keyboardType="numeric"
            />
            <InputBox
              onChangeText={value =>
                this.setState({
                  boxTwo: this.removeSymbols(value),
                  showError: false,
                })
              }
              value={boxTwo}
              placeholder="xxxx"
              maxLength={4}
              keyboardType={'number-pad'}
            />
            <InputBox
              onChangeText={value =>
                this.setState({
                  boxThree: this.removeSymbols(value),
                  showError: false,
                })
              }
              value={boxThree}
              maxLength={4}
              keyboardType="numeric"
              placeholder="xxxx"
            />
            <InputBox
              onChangeText={value =>
                this.setState({
                  boxFour: this.removeSymbols(value),
                  showError: false,
                })
              }
              value={boxFour}
              maxLength={4}
              keyboardType="numeric"
              placeholder="xxxx"
            />
            <InputBox
              onChangeText={value =>
                this.setState({
                  boxFive: this.removeSymbols(value),
                  showError: false,
                })
              }
              value={boxFive}
              placeholder="xxxx"
              maxLength={4}
              keyboardType="numeric"
            />
          </View>
          {showError && <Text style={styles.errorMessage}>{errorText}</Text>}
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
              onPress={
                this.savePin
                /*() => this.props.navigation.navigate('Saved')*/
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    backgroundColor: '#347cff',
    width: '40%',
  },
  btnText: {
    color: '#fff',
  },
  errorMessage: {
    color: '#ff254a',
    marginBottom: 16,
  },
});

export default connect(
  null,
  {
    addPin,
  },
)(GenerateScreen);
