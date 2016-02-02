'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ScrollView,
  ToastAndroid,
  BackAndroid
} from 'react-native';

import Facebook from '../Facebook';
import Google from '../Google';

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
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
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    backgroundColor: '#EC7E48',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginTop: 10
  },
  toolbar: {
    height: 60,
    backgroundColor: '#D6D2D2'
  }
});

let _navigator;

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
    return false;
  }
  _navigator.pop();
  return true;
});

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <TouchableHighlight style={style.button} onPress={() => this.gotoRoute('facebook')}>
            <Text style={style.buttonText}>{'Sign In with Facebook'}</Text>
          </TouchableHighlight>
          <TouchableHighlight style={style.button} onPress={() => this.gotoRoute('google')}>
            <Text style={style.buttonText}>{'Sign In with Google'}</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }

  gotoRoute(name) {
    return this.props.navigator.push({name: name});
  }
}

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:'home'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          return route.sceneConfig ? route.sceneConfig : Navigator.SceneConfigs.HorizontalSwipeJump;
        }}
      />
    );
  }

  renderScene(route, navigator) {
    _navigator = navigator;
    switch (route.name) {
      case 'facebook':
        return <Facebook navigator={navigator} />
        break;
      case 'google':
        return <Google navigator={navigator} />
        break;
      default:
        return <Home navigator={navigator} />
    }
  }
}
