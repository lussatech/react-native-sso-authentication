'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  ToastAndroid
} from 'react-native';

import ToolbarAndroid from 'ToolbarAndroid';

import Facebook from './Facebook';
import Google from './Google';
import Navbar from './Navbar';
import Server, {key as Key, facebook as OAuthFacebook, google as OAuthGoogle} from './Server';
import Style from './Style';

export {Facebook, Google, Server, Key, OAuthFacebook, OAuthGoogle, Style};

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scene: undefined
    };
  }

  render() {
    return (
      <View style={{flex:1,flexDirection:'column'}}>
        <View>
          <Navbar title={`Single Sign On`} onRefresh={() => this.setState({scene: undefined})} />
        </View>
        <View style={{flex:1}}>
          {this.state.scene === 'facebook' ? this.renderFacebook() : this.state.scene === 'google' ? this.renderGoogle() : this.renderScene()}
        </View>
      </View>
    );
  }

  renderScene() {
    return (
      <View>
        <TouchableHighlight
          style={[styles.button, styles.buttonFacebook]}
          underlayColor={'#4163a8'}
          onPress={() => this.setState({scene: 'facebook'})}>
          <Text style={styles.buttonText}>{`Sign In with Facebook`}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[styles.button, styles.buttonGoogle]}
          underlayColor={'#fc473a'}
          onPress={() => this.setState({scene: 'google'})}>
          <Text style={styles.buttonText}>{`Sign In with Google`}</Text>
        </TouchableHighlight>
      </View>
    );
  }

  renderFacebook() {
    return <Facebook />;
  }

  renderGoogle() {
    return <Google />;
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 50,
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 20,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  buttonFacebook: {
    backgroundColor: '#3A5795',
  },
  buttonGoogle: {
    backgroundColor: '#EA4335',
  },
  toolbarContainer: {
    flex: 1,
    alignItems: 'stretch',
  },
  toolbar: {
    height: 100,
    backgroundColor: '#00796B',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginRight: 34
  },
  title: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#ffffff'
  }
});
