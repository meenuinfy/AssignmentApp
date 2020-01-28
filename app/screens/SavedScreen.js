import React from 'react';
import {View, FlatList, ScrollView, Text, SafeAreaView} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {connect} from 'react-redux';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import {updateName, deletePin} from '../store/actions';

class SavedScreen extends React.Component {
  state = {
    pinList: [],
    updatedName: '',
    refreshed: false,
  };

  componentDidMount(): void {
    this.getList();
  }

  getList = () => {
    if (this.props.pins && this.props.pins.length !== 0) {
      this.setState({pinList: this.props.pins});
    }
  };

  deleteCurrentPin = item => {
    let {pinList, refreshed} = this.state;
    if (pinList && pinList.length !== 0) {
      this.props.deletePin({item});
      this.setState({refreshed: !refreshed});
    }
  };

  renderItemList = ({item}) => {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <InputBox
          value={item.name}
          onChangeText={name => {
            this.props.updateName({name, id: item.id});
            this.setState({refreshed: !this.state.refreshed});
          }}
        />
        <FlatList
          data={item.pins}
          keyExtractor={i => `${i}`}
          renderItem={pin => <InputBox value={pin.item} editable={false} />}
          horizontal={true}
        />
        <Button
          title="DELETE"
          btnStyle={styles.solidBtn}
          titleStyle={styles.btnText}
          onPress={() => this.deleteCurrentPin(item)}
        />
      </ScrollView>
    );
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.props.pins && this.props.pins.length === 0 ? (
          <View style={styles.nodataText}>
            <Text>No Data</Text>
          </View>
        ) : (
          <FlatList
            data={this.props.pins}
            renderItem={item => this.renderItemList(item)}
            keyExtractor={item => item.id}
            extraData={this.state.refreshed}
          />
        )}
      </SafeAreaView>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
    padding: 5,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 10,
    flexDirection: 'row',
  },
  solidBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 5,
  },
  btnText: {
    color: '#fff',
  },
  nodataText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = state => ({
  pins: state.appData.pinList,
});

export default connect(
  mapStateToProps,
  {updateName, deletePin},
)(SavedScreen);
